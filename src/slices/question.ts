import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Question } from "../models/question";
import { AppState } from "../store";
import { getQuestions } from "../utils/apis";

interface IQuestionState {
  questions: Question[];
  error: string | null;
  loading: boolean;
  page: number;
  isEnd: boolean;
  tag: string;
}

const initialState: IQuestionState = {
  questions: [],
  error: null,
  loading: true,
  page: 1,
  isEnd: false,
  tag: "",
};

export const fetchQuestions = createAsyncThunk(
  "question/FETCH_QUESTIONS",
  async (tag: string, { getState, rejectWithValue }) => {
    const state = getState() as AppState;

    try {
      const response = await getQuestions(tag, state.question.page);

      return {
        data: response.items.map((q: any) => ({
          id: q["question_id"],
          score: q["score"],
          title: q["title"],
          link: q["link"],
          isAnswered: q["is_answered"],
          viewCount: q["view_count"],
          answerCount: q["answer_count"],
          owner: {
            id: q["owner"]["account_id"],
            profileImage: q["owner"]["profile_image"],
            name: q["owner"]["display_name"],
          },
        })),
        hasMore: response["has_more"],
      };
    } catch (e: any) {
      console.log(e);
      return rejectWithValue(e.message);
    }
  }
);

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestions.pending, (state, action) => {
        if (state.tag !== action.meta.arg) {
          state.page = 1;
          state.tag = action.meta.arg;
          state.questions = [];
          state.isEnd = false;
        }
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions.push(...action.payload.data);
        state.loading = false;
        state.page++;
        if (!action.payload.hasMore) {
          state.isEnd = true;
        }
      })

      .addCase(fetchQuestions.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default questionSlice.reducer;
