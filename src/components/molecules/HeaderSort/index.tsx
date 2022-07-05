import React from "react";
import { css } from "@emotion/react";
import { BiSortDown, BiSortUp } from "react-icons/bi";

const sortIconWrap = (color,isHoldings) => css`
  background-color: ${color};
  border-radius:${isHoldings ? '2px':'0.2rem'};
  box-shadow:${isHoldings ? '0px 0px 4px rgba(0, 0, 0, 0.15)':'0px'};
  display: inline-flex;
  padding:${isHoldings ? '0.15rem':'0.2rem'};
  margin-left: 0.4rem;
`;

export type HeaderSortProps = {
  column: any;
  columnName: string;
  size?: number;
  isHoldings?:boolean;
};

const HeaderSort = ({ column, columnName, size = 7 ,isHoldings = false}: HeaderSortProps) => {
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
          <div css={sortIconWrap("#525F68",isHoldings)}>
            <BiSortUp size={size} color={"white"} />
          </div>
        ) : column.isSorted && column.isSortedDesc === true ? (
          <div css={sortIconWrap("#525F68",isHoldings)}>
            <BiSortDown size={size} color={"white"} />
          </div>
        ) : (
          <div css={sortIconWrap("#9DA6AD",isHoldings)}>
            <BiSortUp size={size} color={"white"} />
          </div>
        ))}
    </>
  );
};

export default HeaderSort;
