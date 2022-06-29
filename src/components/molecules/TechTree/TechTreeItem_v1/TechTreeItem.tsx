import React, {useCallback, useState, useRef, useEffect} from "react";
import Buttonable, { ButtonableProps } from "@components/atoms/Buttonable";
import { SerializedStyles } from "@emotion/react";
import {css} from "@emotion/react";
import Colors from "@styles/colors";
import { flexRowBetween } from "src/styles";
import { BsCheckCircleFill } from "react-icons/bs";
import Image from "next/image";
import RightMenuBody from "@alvinComponents/molecules/RightMenu/RightMenuBody";
 
const TechTreeItem = ({bgCol='#2E3B43', children}) => {
 
    const itemsCnt = 8;
    const TechTreeItemContainerCss = (bgCol, itemsCnt)=>css`
        width: calc(100vw/${itemsCnt}); // Item Container - Props ★
        height: 200px;  // Item Container Height
        background-color: ${bgCol}; 
        padding-top: 12px; // 조정 필요
        color: white;
    `;
 
 
    return (
        <div css={[TechTreeItemContainerCss(bgCol, itemsCnt)]}>
            {children}
        </div> 
    )
}
 
export default TechTreeItem