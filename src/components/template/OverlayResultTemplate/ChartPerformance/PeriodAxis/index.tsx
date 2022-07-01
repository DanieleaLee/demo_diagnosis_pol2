import React from "react";
import { css } from "@emotion/react";
import Colors from "@styles/colors";
import { flexRowBetween } from "src/styles";

const ContainerWrap = (width: number = 805, height: number = 1) => css`
  width: ${width}px;
  height: ${height}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const baselineStyle = css`
  position: relative;
  width: 805px;
  height: 1px;
  background-color: #DEDEDE;
  border-radius: 1rem;
`;

const progresslineStyle = (totalDate) => css`
  height: 100%;
  width: ${Math.round(((totalDate - 1) / (totalDate - 1)) * 100)}%;
`;


const periodText = (
  height: number = 1,
  textPaddingTop: number,
  positionLeft
) => css`
  height: ${height}px;
  font-size: 11px;
  font-weight: 500;
  font-family: "Inter";
  line-height: 13px;
  color: ${Colors.buttonSubmit};
  margin-top: ${textPaddingTop}px;
  position: absolute;
  float: left;
  left: ${positionLeft}px;
`;

const nodeStyle = css`
  ${flexRowBetween};
  position: absolute;
  width: 100%;
`;

const tick =css`
  width: 1px;
  height: 4px;
  background: #546A78;
  /* border: 0.1px solid red; */
  position: absolute;
  top: -6px;
  z-index:3;
`

const dummy = ["2007", "2008", "2009", "2010", "2011", "2012", "2013"];

// Overlay => Performance Anaylsis 의 Date bar 밑에 xAxis 기간 표시하는 컴포넌트
// 현재는 dummy에 날짜 추가 삭제함에 따라 변경이됨.
const PeriodAxis = ({
  axisList,
  wholeMonths,
  wholeWidth
}) => {

  const yearMonthList = axisList.map((el,i)=>{
    const year = el
    const months = (i < axisList.length-1) 
      ? [...Array(12).keys()].map((v,i)=> String(i).length < 2 ? '0' + (i+1) : (i+1)) 
      : [...Array((wholeMonths%12)+2).keys()].map((v,i)=> String(i).length < 2 ? '0' + (i+1) : (i+1))
    const yearMonth = months.map((month,i)=> [String(year),String(month)].join('.'))
    return yearMonth 
  }).flat();

  const totalMonths = yearMonthList.length;
  const unit = Number(wholeWidth/totalMonths)



  const totalHeight = 1;
  const textPaddingTop = 15;

  return (
    <div css={[ContainerWrap(wholeWidth, totalHeight)]}>

      <div css={[nodeStyle]}>

        <div css={baselineStyle}>
        </div>

        {yearMonthList.map((ts, x) => {
          const year = ts.split('.')[0]
          const month = ts.split('.')[1]
          return (
            month == '01'
            ?
            <span css={[periodText(totalHeight, textPaddingTop, unit*Number(x)),]} key={x}>
              <div css={tick}></div>
              <span css={css`position: absolute;transform: translateX(-50%);`}>
              {year}
              </span>
            </span>
            : 
            ''
          );
        })}

      </div>
    </div>
  );
};

export default PeriodAxis;
