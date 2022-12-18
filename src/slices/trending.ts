import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTrendings } from "../utils/apis";
import { Trending } from "../models/trending";
import { fetchQuestions } from "./question";
import { AppState } from "../store";
interface ITrendingState {
  trendings: Trending[];
  error?: string | null;
  loading: boolean;
  selectedIndex: number;
}

const initialState: ITrendingState = {
  trendings: [],
  error: null,
  loading: false,
  selectedIndex: 0,
};

let timer: ReturnType<typeof setTimeout>;
const TIMEOUT = 500;

export const fetchTrendings = createAsyncThunk(
  "trending/FETCH_TRENDINGS",
  async (keyword: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await getTrendings(keyword);

      dispatch(fetchQuestions(response.items[0].name));
      return response.items;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const selectTrending = createAsyncThunk(
  "trending/SELECTE_TRENDING",
  async (index: number, { getState, dispatch }) => {
    const state = getState() as AppState;
    if (state.trending.selectedIndex !== index) {
      clearTimeout(timer);

      timer = setTimeout(() => {
        dispatch(fetchQuestions(state.trending.trendings[index].name));
      }, TIMEOUT);
    }
  }
);

export const trendingSlice = createSlice({
  name: "trending",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTrendings.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTrendings.fulfilled,
        (state, action: PayloadAction<Trending[]>) => {
          state.selectedIndex = 0;
          state.trendings = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchTrendings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(selectTrending.pending, (state, action) => {
        state.selectedIndex = action.meta.arg;
      });
  },
});

export default trendingSlice.reducer;
