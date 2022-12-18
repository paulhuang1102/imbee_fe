import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchTrendings, selectTrending } from "./slices/trending";
import { AppState, AppDispatch } from "./store";
import TrendingLabel from "./components/TrendingLabel";
import QuestionList from "./components/QuestionList";
import { fetchQuestions } from "./slices/question";
import SearchBar from "./components/SearchBar";
import Loading from "./components/Loading";
import { device } from "./styles/media";

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
        document.documentElement.offsetHeight &&
      !question.loading &&
      !question.isEnd
    ) {
      dispatch(fetchQuestions(question.tag));
    }
  }, [dispatch, question.isEnd, question.loading, question.tag]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <SCConatiner>
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
    </SCConatiner>
  );
}

const SCConatiner = styled.div`
  padding: 0 1.25rem;

  ${device.laptop} {
    padding: 0;
    max-width: 80%;
    margin: 0 auto;
  }
`;

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
  margin-bottom: 60px;

  > div {
    position: fixed;
    display: flex;
    top: 10px;
    left: 0;
    margin: 0 20px;
    width: calc(100% - 40px);
  }

  ${device.laptop} {
    margin-bottom: 80px;

    > div {
      left: 10%;
      width: 80%;
      margin: 0;
    }
  }
`;

export default App;
