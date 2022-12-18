import { useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchTrendings, selectTrending } from "./slices/trending";
import { AppState, AppDispatch } from "./store";
import TrendingLabel from "./components/TrendingLabel";
import QuestionList from "./components/QuestionList";
import { fetchQuestions } from "./slices/question";
import SearchBar from "./components/SearchBar";
import Loading from "./components/Loading";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const trending = useSelector((state: AppState) => state.trending);
  const question = useSelector((state: AppState) => state.question);

  useEffect(() => {
    dispatch(fetchTrendings(""));
  }, [dispatch]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 50 >=
      document.documentElement.offsetHeight && !question.loading && !question.isEnd
    ) {
      dispatch(fetchQuestions(question.tag));
    }
  }, [dispatch, question.isEnd, question.loading, question.tag]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div>
      <main>
        <SCFixedHolder>
          <SearchBar
            onChange={(v) => {
              dispatch(fetchTrendings(v));
            }}
          />
        </SCFixedHolder>
        <SCSection>
          Trending
          {trending.loading ? (
            <Loading />
          ) : (
            <div>
              {trending.trendings.map((t, i) => (
                <TrendingLabel
                  trending={t}
                  key={t.name}
                  isActive={i === trending.selectedIndex}
                  onClick={() => {
                    dispatch(selectTrending(i));
                  }}
                />
              ))}
            </div>
          )}
        </SCSection>

        <SCSection>
          <ul>
            {question.questions.map((q) => (
              <QuestionList question={q} key={q.id} />
            ))}
          </ul>

          {question.loading && <Loading />}
        </SCSection>
      </main>
    </div>
  );
}

const SCSection = styled.section`
  display: flex;
  flex-direction: column;

  overflow: scroll;

  > div {
    display: flex;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  p {
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }
`;

const SCFixedHolder = styled.div`
  margin-bottom: 50px;

  > div {
    position: fixed;
    top: 0;
    left: 0;
  }
`;

export default App;
