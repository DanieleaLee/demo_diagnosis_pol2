import React, { useState } from "react";
import { css } from "@emotion/react";
import ConditionalRenderList from "./ConditionalRenderList";
import Input from "./Input";

const searchableDropdownContainerStyle = css`
  display: inline-block;
  position: relative;
  background-color: red;
  /* padding: 10px; */
`;
const SearchableDropdown = () => {
  const [value, setValue] = useState("");
  const [toggle, setToggle] = useState(false);
  // console.log(value)
  return (
    <>
      <h2>SearchableDropdown</h2>
      <div css={searchableDropdownContainerStyle}>
        <Input
          setToggle={setToggle}
          onChange={(inputValue) => {
            setValue(inputValue);
          }}
          value={value}
        />
        <ConditionalRenderList value={value} list={list} setValue={setValue} toggle={toggle} setToggle={setToggle} />
      </div>
    </>
  );
};

export default SearchableDropdown;

const list = [
  { id: 1, option: "aa" },
  { id: 2, option: "ab" },
  { id: 3, option: "ac" },
  { id: 4, option: "ad" },
  { id: 5, option: "e" },
  { id: 6, option: "f" },
  { id: 7, option: "g" },
  { id: 8, option: "h" },
  { id: 9, option: "i" },
];
