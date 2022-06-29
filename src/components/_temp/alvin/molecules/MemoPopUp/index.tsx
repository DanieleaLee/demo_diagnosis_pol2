import { SerializedStyles } from "@emotion/react";
import {css} from "@emotion/react";
import Colors from "@styles/colors";
import { flexRowBetween } from "src/styles";
import { BsCheckCircleFill } from "react-icons/bs";
import Image from "next/image";


const containerWrapCss = (width: number=171, height: number=225) => css`
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
    /* overflow-wrap: break-word; */
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


const MemoPopUp = ({title, tags, content}) => {

  const containerWidth = 171;
  const containerHeight = 225;

  return (
    <div css={[containerWrapCss(containerWidth, containerHeight)]}>
        <div css={[containerCss, scrollBar]}> 
            <div css={[titleCss]}>{title || 'Note'}</div>
            <div css={[tagsCss]}>
                {tags.map((ts,k)=>{
                        return (
                            <span style={{marginRight: '4px'}}key={k}>{ts}</span>
                        )
                    })
                }
            </div>
            <p css={[contentCss]}>{content}</p>
        </div>
    </div>
  )
}


export default MemoPopUp;