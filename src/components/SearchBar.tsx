import React, { ChangeEvent, useCallback, useRef } from "react";
import styled from "styled-components";
import { fontColor, primaryColor } from "../styles/theme";

interface Props {
  onChange: (v: string) => void;
}

const SearchBar: React.FC<Props> = ({ onChange }) => {
  const timout = useRef<ReturnType<typeof setTimeout>>();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      clearTimeout(timout.current);
      timout.current = setTimeout(() => {
        onChange(value);
      }, 300);
    },
    [onChange]
  );

  return (
    <SCInput>
      <input type="text" placeholder="Tag" onChange={handleChange} />

      <button>Search</button>
    </SCInput>
  );
};

const SCInput = styled.div`
  border: 2px solid ${primaryColor};
  width: 100vw;
  border-radius: 0.75rem;
  overflow: hidden;
  display: flex;

  input {
    outline: none;
    border: none;
    padding: 0.5rem 0;
    flex: 1;
  }

  button {
    background-color: ${primaryColor};
    color: ${fontColor};
    border: none;
    padding: 0.5rem;
  }
`;

export default SearchBar;
