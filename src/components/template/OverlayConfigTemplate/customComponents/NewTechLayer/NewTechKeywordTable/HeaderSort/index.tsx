import React from "react";
import { css } from "@emotion/react";
import { BiSortDown, BiSortUp } from "react-icons/bi";

const sortIconWrap = (color) => css`
  background-color: ${color};
  border-radius: 2px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
  display: inline-flex;
  padding: 0.15rem;
  margin-left: 0.4rem;
`;

export type HeaderSortProps = {
  column: any;
  columnName: string;
  size?: number;
};

const HeaderSort = ({ column, columnName, size = 7 }: HeaderSortProps) => {
  return (
    <>
      <span
        css={css`
          display: inline-block;
          line-height: 20px;
        `}
      >
        {columnName}
      </span>
      {!!column.canSort &&
        (column.isSorted && column.isSortedDesc === false ? (
          <div css={sortIconWrap("#525F68")}>
            <BiSortUp size={size} color={"white"} />
          </div>
        ) : column.isSorted && column.isSortedDesc === true ? (
          <div css={sortIconWrap("#525F68")}>
            <BiSortDown size={size} color={"white"} />
          </div>
        ) : (
          <div css={sortIconWrap("#9DA6AD")}>
            <BiSortUp size={size} color={"white"} />
          </div>
        ))}
    </>
  );
};

export default HeaderSort;
