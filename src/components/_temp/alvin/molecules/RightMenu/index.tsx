import React, {useCallback, useState, useRef, useEffect} from "react";
import Buttonable, { ButtonableProps } from "@components/atoms/Buttonable";
import { SerializedStyles } from "@emotion/react";
import {css} from "@emotion/react";
import Colors from "@styles/colors";
import { flexRowBetween } from "src/styles";
import { BsCheckCircleFill } from "react-icons/bs";
import Image from "next/image";
import RightMenuBody from "@alvinComponents/molecules/RightMenu/RightMenuBody";


const rightMenuContainerCss = (bodyWidth)=>css`
    top: 0px;
    right: 0px;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-start;
    transition: transform 0.6s ease-out;
`;

const rightMenuButtonWrapCss = (width, paddingTop)=>css`
    width: ${width}px;
    position: relative;
    padding-top: ${paddingTop}px;
    height: 100%;
`;

const rightMenuBodyWrapCss = (width, paddingTop, paddingBottom)=>css`
    width: ${width}px;
    height: 100%;
    position: relative;
    padding-top: ${paddingTop}px;
    padding-bottom: ${paddingBottom}px;
    transition: width 0.6s ease-out;
    &.close {
        width: 0px;
        transition: width 0.5s ease-in;
    }
`;



const RightMenuButton = ({width, onClick}) => {

    const rightMenuButtonCss = (width)=>css`
    width: ${width}px;
    height: 171px;
    position: absolute;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${Colors.backgroundPrimary1};
    /* box-shadow: 1px -1px 9px rgba(0, 0, 0, 0.35); */
    border-radius: 8px 0px 0px 8px;

    > p {
        margin-left: -8px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
        line-height: 18px;
        color: ${Colors.primary2};
        transform: rotate(-90deg);
    }
`;

  return (
    <div css={[rightMenuButtonCss(width)]} onClick={onClick}>
        <p>Load</p>
    </div>
  )
}


const RightMenu = ({...props})=>{
    const [opened, setOpened] = useState(false);

    const containerRef = useRef(null)
    const buttonWrapPaddingTop = 242;
    const buttonWidth = 55;

    const bodyWrapPaddingTop = 50;
    const bodyWrapPaddingBottom = 50;
    const bodyWidth = 872;
    const bodyHeight = 840;

    const slideToggle = useCallback(()=>{
        const containerRefClassList= containerRef.current.classList
        opened ? containerRefClassList.add('close') : containerRefClassList.remove('close');
        setOpened(!opened);
    },[opened])


    return(
      <div>
        {opened &&<div css={css`height:100vh; width:100vw; background-color:gray; opacity:80%; position:fixed; top: 0px; right:0px; z-index:98;`}></div>}
        <div css={css`position:fixed; top: 0px; right:0px; z-index:99;`}>
          <div css={rightMenuContainerCss(bodyWidth)}>
            <div css={[rightMenuButtonWrapCss(buttonWidth, buttonWrapPaddingTop)]}>
              <RightMenuButton width={buttonWidth} onClick={slideToggle}/>
            </div>
            <div
              className={'close'}
              css={[rightMenuBodyWrapCss(bodyWidth, bodyWrapPaddingTop, bodyWrapPaddingBottom)]}
              ref={containerRef}
            >
              <RightMenuBody width={bodyWidth} minHeight={bodyHeight} onClick={slideToggle}/>
            </div>
          </div>
        </div>
      </div>

    )
};

export default RightMenu;