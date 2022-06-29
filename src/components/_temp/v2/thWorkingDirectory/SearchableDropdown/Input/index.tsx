import React from "react";
import { css } from "@emotion/react";

const inputStyle = css`
  height: 26px;
  width: 200px;
  border-radius: 3px;
  border: 1px solid black;
  outline: none;
  position: relative;
  /* margin: 0.5rem; */
  font-size: 16px;
  font-weight: 500;

  &:focus {
    outline: none;
  }
`;
type InputProps = {
  onChange: (value: string) => void;
  setToggle: (toggle: boolean) => void;
  value: string;
};
const Input = ({ onChange, setToggle, value }: InputProps) => {
  return (
    <input
      css={inputStyle}
      // onBlur={(e) => {
      //   e.preventDefault();
      //   setToggle(false);
      // }}
      onFocus={() => setToggle(true)}
      type="text"
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  );
};

export default Input;
