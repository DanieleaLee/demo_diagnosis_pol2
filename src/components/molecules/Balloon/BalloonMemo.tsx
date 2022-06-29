import { SerializedStyles } from "@emotion/react";
import {css} from "@emotion/react";
import Colors from "../../../styles/colors";
import { flexRowBetween } from "src/styles/index";
import { BsCheckCircleFill } from "react-icons/bs";
import Image from "next/image";
import { LoaderHeightWidthRadiusProps } from "react-spinners/interfaces";


const containerWrapCss = (width:number, height:number) => css`
    height: ${height}px;
    width: ${width}px;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 12px;
    padding-bottom: 17px;
    margin-top: 10px; // index page에서 test를 위해 넣은 것
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 0px 12px 12px 12px;
`;

// 스크롤바를 위해 넣어둠
const containerCss = css`
    width: 100%;
    height: 100%;
    padding-right: 7px;
    overflow-y: auto;
    overflow-x: hidden;
`

const scrollBar = css`
    &::-webkit-scrollbar {
    background: #ececec;
    border-radius: 1.5px;
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 1.5px;
    background: #2f3b43;
  }
`

const titleCss = css`
    color: ${Colors.hint};
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    padding-bottom: 7px;
`;

const tagsCss = css`
    color: ${Colors.buttonSubmit};
    position: relative;
    width: 100%;
    min-height: 13px;
    max-height: 23px;
    font-style: normal;
    font-weight: 400;
    font-size: 8px;
    line-height: 11px;
    overflow: hidden;
    margin-bottom: 3px;
    span {
        float: left;
    }
`;

const contentCss = css`
    display: inline-block;
    color: black;
    font-style: normal;
    font-weight: 400;
    font-size: 8px;
    line-height: 11px;
`;

export interface BalloonMemoProps {
    width: number;
    height: number;
    title?: string;
    tags?: string[];
    children: JSX.Element | any;
  }

const BalloonMemo = ({width, height, title, tags, children}:BalloonMemoProps) => {
  return (
    <div css={[containerWrapCss(width, height)]}>
        <div css={[containerCss, scrollBar]}>
            {title && <div css={[titleCss]}>{title || 'Note'}</div> }
            <div css={[tagsCss]}>
                {tags && tags.map((ts,k)=>{
                        return (
                            <span style={{marginRight: '4px'}}key={k}>{ts}</span>
                        )
                    })
                }
            </div>
            <p css={[contentCss]}>{children}</p>
        </div>
    </div>
  )
}


export default BalloonMemo;