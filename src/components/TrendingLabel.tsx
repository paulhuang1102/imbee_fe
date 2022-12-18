import { useCallback } from "react";
import styled from "styled-components";
import { Trending } from "../models/trending";
import { primaryColor } from "../styles/theme";

interface Props {
  trending: Trending;
  isActive: boolean;
  onClick: () => void;
}

const TrendingLabel: React.FC<Props> = ({
  trending,
  isActive = false,
  onClick,
}) => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <SCLabel isActive={isActive} onClick={handleClick}>
      {trending.name}
    </SCLabel>
  );
};

const SCLabel = styled.button<{ isActive: boolean }>`
  box-sizing: border-box;
  border-radius: 0.5rem;
  border: 1px solid ${primaryColor};
  padding: 0.75rem 0.25rem;
  margin-right: 0.5rem;
  background-color: ${({ isActive }) => (isActive ? primaryColor : "#FFF")};
`;

export default TrendingLabel;
