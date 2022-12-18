import React from "react";
import styled from "styled-components";
import { Question } from "../models/question";
import { fontColor } from "../styles/theme";
import { device } from "../styles/media";
interface Props {
  question: Question;
}

const QuestionList: React.FC<Props> = ({ question }) => (
  <SCLi>
    <a href={question.link} target="_blank" rel="noreferrer">
      <div>
        <p>{question.title}</p>

        <SCInfo>
          <div>
            <p>Score</p>
            <span className={question.score < 0 ? "wrong" : ""}>
              {question.score}
            </span>
          </div>

          <div>
            <p>Anwsers</p>
            <span
              className={
                question.isAnswered && question.answerCount > 0
                  ? "accepted"
                  : question.answerCount > 0
                  ? "answered"
                  : ""
              }
            >
              {question.answerCount}
            </span>
          </div>

          <div>
            <p>Viewed</p>
            <span>{question.viewCount}</span>
          </div>
        </SCInfo>
      </div>
      <div>
        <SCProfile>
          <img src={question.owner.profileImage} alt="Owner Profile" />
          <span>{question.owner.name}</span>
        </SCProfile>
      </div>
    </a>
  </SCLi>
);

const SCLi = styled.li`
  border-bottom: 1px solid #ddd;
  padding: 4px 0;

  > a {
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    color: ${fontColor};

    > div {
      display: flex;
      flex-direction: column;

      &:first-child {
        flex: 1;
      }
    }
  }
`;

const SCInfo = styled.div`
  display: flex;
  justify-content: space-around;

  > div {
    text-align: center;

    p {
      color: #bc4659;
    }

    span {
      border: 1px solid transparent;
      display: block;
      width: 100%;

      &.wrong {
        color: red;
      }

      &.answered {
        border-color: #41713c;
        color: #41713c;
      }

      &.accepted {
        background-color: #0f5e0b;
        border-color: #0f5e0b;
        color: #fff;
      }
    }
  }
`;

const SCProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 3rem;

  img {
    height: 3rem;
    width: 3rem;
    margin: 0.5rem 0;
    border-radius: 50%;
  }

  span {
    text-align: center;
    font-size: 0.875rem;
    line-height: 0.875rem;
  }

  ${device.laptop} {
    width: 5rem;

    img {
      height: 5rem;
      width: 5rem;
    }
  }
`;

export default QuestionList;
