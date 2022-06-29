import React from 'react';
import Colors from "@styles/colors";
import {RiArrowUpDownFill} from "react-icons/ri";
import { BiSortDown, BiSortUp } from 'react-icons/bi';

import {css} from "@emotion/react";

const sortIconWrap = (color) => css`
  background-color: ${color};
  border-radius: 0.2rem;
  display: inline-flex;
  height: 20px;
  padding: 0.2rem;
  margin-left: 0.4rem;
`;


export type TblHeaderPrimaryProps = {
  column: any;
  columnName: string;
}

const TblHeaderPrimary = ({column, columnName}:TblHeaderPrimaryProps) => {
  return (
    <>
      <span css={css`display: inline-block; line-height:20px;`}>{columnName}</span>
      {/* { (!!column.canSort)&& (column.isSorted
        ? <div css={sortIconWrap(Colors.backgroundAccent2)}><RiArrowUpDownFill size={12} color={'white'}/></div>
        : <div css={sortIconWrap(Colors.hint)}><RiArrowUpDownFill size={12} color={'white'}/></div>)
      } */}


{ (!!column.canSort)&& (column.isSorted && column.isSortedDesc === false 
      ? <div css={sortIconWrap("#525F68")}><BiSortUp size={12} color={"white"}/></div>
      :column.isSorted && column.isSortedDesc === true?<div css={sortIconWrap("#525F68")}><BiSortDown size={12} color={"white"}/></div>
      : <div css={sortIconWrap("#9DA6AD")}><BiSortUp size={12} color={"white"}/></div>)
    }
    </>
  );
};

export default TblHeaderPrimary;
