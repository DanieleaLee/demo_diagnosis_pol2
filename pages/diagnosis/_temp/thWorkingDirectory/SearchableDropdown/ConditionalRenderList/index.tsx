import React from "react";
import { css } from "@emotion/react";

const listStyle = css`
  position: absolute;
  /* margin: 0.15rem; */
  top: 26px;
  /* bottom: 0; */
  width: 200px;
  border: 1px solid #232323;
  border-top: 0;
  /* border-radius: 15px; */
  background-color: white;
`;

const itemStyle = css`
  /* padding: 0.25rem; */
  color: black;
  font-size: 14px;
  font-weight: 700;
  /* border-radius: 15px; */

  &:hover {
    background-color: blue;
    cursor: pointer;
  }
`;

type ConditionalRenderListProps = {
  value: string;
  list: { id: number | string; option: string }[];
  setValue: (value: string) => void;
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
};
const ConditionalRenderList = ({ value, list, setValue, toggle, setToggle }: ConditionalRenderListProps) => {
  if (!toggle) return null;
  if (!value) {
    return (
      <div css={listStyle}>
        {list.map((item) => (
          <div
            css={itemStyle}
            onClick={(e) => {
              e.stopPropagation();
              setValue(item.option);
              setToggle(false);
            }}
          >
            {item.option}
          </div>
        ))}
      </div>
    );
  }
  const filteredList = list.filter((item) => item.option.toString().toLowerCase().startsWith(value));

  return (
    <div css={listStyle}>
      {filteredList.map((item) => (
        <div
          css={itemStyle}
          onClick={(e) => {
            e.stopPropagation();
            setToggle(false);
            setValue(item.option);
          }}
        >
          {item.option}
        </div>
      ))}
    </div>
  );
};

export default ConditionalRenderList;
