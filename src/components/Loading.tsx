import React from "react";
import styled, { keyframes } from "styled-components";
import { primaryColor } from "../styles/theme";

const Loading: React.FC = () => (
  <LoadingWrapper>
    <p>Loading</p>
    <Dot delay="0s" />
    <Dot delay="0.1s" />
    <Dot delay="0.2s" />
  </LoadingWrapper>
);

const LoadingWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const BounceAnimation = keyframes`
  0% { 
    margin-bottom: 0; 
  }

  50% { 
    margin-bottom: 1rem;
  }

  100% { 
    margin-bottom: 0;
  }
`;

export const Dot = styled.div<{ delay: string }>`
  background-color: ${primaryColor};
  border-radius: 50%;
  width: 0.5rem;
  height: 0.5rem;
  margin: 0 0.25rem;
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${(props) => props.delay};
`;

export default Loading;
