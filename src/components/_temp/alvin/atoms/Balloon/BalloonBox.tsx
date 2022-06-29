import React from "react";
import { css, useTheme } from "@emotion/react";
import Colors from '@styles/colors';
import Image from "next/image";


const getArrowPosition = (position:string)=>{
  if(position=='top') return css`width: 100%; top: -8px; flex-direction: row; > div { transform: rotate(45deg);}`;
  if(position=='bottom') return css`width: 100%; bottom: 6px; flex-direction: row; > div { transform: rotate(225deg);}`;
  if(position=='left') return css`height: 100%; left: -8px; flex-direction: column; > div { transform: rotate(-45deg);}`;
}

const getArrowAline = (align:string, position:string)=>{
  const innerPadding = '14px'
  if(align=='start') {
    return css`
      justify-content: flex-start; 
      ${position == 'left' ? `padding-top: ${innerPadding};`: `padding-left: ${innerPadding};`}
    `;
  }
  if(align=='center') {
    return css`
      justify-content: center;
    `;
  }
  if(align=='end') {
    return css`
      justify-content: flex-end; 
      ${position == 'left' ? `padding-bottom: ${innerPadding};`: `padding-right: ${innerPadding};`}
    `;
  }
}

const boxConteinerWrap = css`
  position: relative;
  background-color: #fff;
  padding: 5px;
`;

const arrowWrap = css`
  position: absolute;
  display: flex;
  background-color: #fff;
`;

const arrow = css`
  width: 14px;
  height: 14px;
  position: absolute;
  border-top: 0.5px solid #ececec;
  border-left: 0.5px solid #ececec;
  box-shadow: inset 1px 1px 0px 0px rgba(122, 122, 122, 0.15);
  background-color: #fff;
`;

const boxConteiner = (width:number, height:number)=>css`
  position: relative;
  width: ${width}px;
  height: ${height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
  border: 0.5px solid #ececec;
  border-radius: 4px;
`;

const contentConteiner = css`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0px;
`

export type BalloonBoxProps = {
  arrowPosition: string;
  arrowAlign: string;
  children: JSX.Element | any;
  width: number;
  height: number;
};

const BalloonBox = ({arrowPosition, arrowAlign, children, width, height}:BalloonBoxProps) => {

  return (
    <div css={[boxConteinerWrap]}>
      <div css={[boxConteiner(width, height)]}>
        <div css={[arrowWrap, getArrowPosition(arrowPosition), getArrowAline(arrowAlign, arrowPosition)]}>
          <div css={[arrow]}></div>
        </div>
        <div css={[contentConteiner]}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default BalloonBox