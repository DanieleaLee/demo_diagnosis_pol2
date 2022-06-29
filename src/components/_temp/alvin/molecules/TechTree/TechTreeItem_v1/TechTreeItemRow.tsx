import {css} from "@emotion/react";
import { ReactElement } from "react";
import { AiOutlineConsoleSql } from "react-icons/ai";
import Image from "next/image";

const TechTreeItemRow = ({
    type, 
    value, 
    spaceWidth,
    onClick
}) => { 

    const [leftSpaceWidth, middleSpaceWidth, rightSpaceWidth] = spaceWidth
  
    const TechTreeItemCss = css` // Item
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: stretch;
        color: #fff;
        font-weight: 600;
        font-size: 11px; //
        font-family: 'Inter';
        font-style: normal;
    `;

    const leftSpace = (width)=>css`
        width: ${width}%;  // Item left Width - Props
        display: flex;
        flex-direction: column;
        justify-content: center;
    `;
    const middleSpace = (width)=>css`
        width: ${width}%; // Item middle Width - Props
        
    `;
    const rightSpace = (width)=>css`
        width: ${width}%; // Item right Width - Props
        display: flex;
        flex-direction: column;
        justify-content: center;
    `;
    
    const connectLine = css`
        display: inline-block;
        width: 100%; // 양쪽 Line Width - Props
        height: 2px;
        background-color:#B2BFC0;
    `;


const titleCss = css`
    width:100%;
    height: 26px; // 높이
    /* line-height: 10px; */
    /* padding-top: 2px; */
`

const labelCss = css`
    border: 2px solid #B2BFC0;
    -webkit-border-radius: 5px/4px;
    -moz-border-radius: 5px/4px;
    background: #4A5C67;
    border-radius: 5px/4px;
    width:100%;
    height: 26px; // 높이
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const weightTitleCss = css` 
    width:100%;
    height: 26px; // 높이
    font-size: 10px;
    /* line-height: 10px; */
    padding-top: 5px;
`

const weightBarOutlineCss = css`
    border: 2px solid #94A1A9;
    -webkit-border-radius: 6px/3px;
    -moz-border-radius: 6px/3px;
    width:100%;
    height: 12px; // 높이
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: 1.3px;
    padding-right: 1.3px;
    padding-top: 1.3px;
    padding-bottom: 1.3px;
`

const weightBarInlineCss = (weight)=>css`
    background-color: #fff;
    border-radius: 3px;
    opacity: 0.7;
    width: ${weight}%;
    height: 100%;
`

const weightBarLabelCss = css`
    padding-top: 2px;
    font-size: 10px;
    text-align: right;
    padding-bottom: 5px;
` 

const imgCss = css`
    padding-top: 4px;
    text-align: center;
` 

    const HTMLinMiddleSpace = (type, value)=>{
        if (type=='title') {
            return <div css={[titleCss]} onClick={onClick}>{value}</div>
        } else if (type=='label' && value) {
            return <div css={[labelCss]} onClick={onClick}>{value[0]} {value[1] ? ' : ' + value[1] : ''}</div>
        } else if (type=='weightTitle' && value) {
            return <div css={[weightTitleCss]} onClick={onClick}>{value}</div>
        } else if (type=='weight' && value) {
            return (
                Object.entries(value).map(([name,weight], k)=>{
                    return (
                        <div key={k} onClick={onClick}>
                            <div css={[weightBarOutlineCss]}>
                                <div css={[weightBarInlineCss(weight)]}></div>
                            </div>
                            <div css={[weightBarLabelCss]}>
                                <span>{name} </span> 
                                <span>{weight}%</span>
                            </div>
                        </div>
                    )
                })
            )
        } else if (type=='img' && value) {
            return (
                <div css={[imgCss]} onClick={onClick}>
                    <Image src={value[0]} width={value[1]} height={value[2]} alt={'regoin'}/>
                </div>
            )
        }
    }

  return (
    <div css={[TechTreeItemCss]}>
        <div css={[leftSpace(leftSpaceWidth)]}>
            {type == 'label' ? <span css={[connectLine]}></span> : ''}
        </div>
        <div css={[middleSpace(middleSpaceWidth)]}>
            {HTMLinMiddleSpace(type, value)}
        </div>
        <div css={[rightSpace(rightSpaceWidth)]}>
            {type == 'label' ? <span css={[connectLine]}></span> : ''}
        </div>
    </div>
  )
}

export default TechTreeItemRow