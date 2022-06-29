import {css} from "@emotion/react";
import Colors from "@styles/colors";
import React, {useCallback, useState, useRef, useEffect} from "react";

const TabButtons = ({menuList, selectedMenu, onClick}) => {
    const tabButtonConainerCss = css`
        display: flex;
        width: 100%;
        height: 54px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: #E9ECEE;
        border-radius: 8px;
        padding-top: 4px;
        padding-bottom: 4px;
        padding-left: 2px;
        padding-right: 2px;
    `

    const tabButtons = css`
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        user-select: none;
        transition: background 0.4s ease-out;
        font-size: 12px;
        color: #ABB1B5;
        width: 100%;
        height: 48px;
        background: #E9ECEE;
        border-radius: 6px;
        margin-left: 2px;
        margin-right: 2px;

        &.selected {
            background: #FFFFFF;
            color: #838B8F;
            box-shadow: 0px 0px 10px rgba(122, 106, 106, 0.1);
        }
    `

    return (
        <div css={[tabButtonConainerCss]}>        
            {[...menuList].map((ts, k)=>{
                return(
                    <div 
                        key={k} 
                        css={[tabButtons]} 
                        className={`tabButton${selectedMenu == ts? " selected" : ""}` } 
                        onClick={(e)=>onClick(e, ts)
                    }>
                        {ts}
                    </div>
                )
            })}
        </div>
    )
}

export default TabButtons