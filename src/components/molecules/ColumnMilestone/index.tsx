import { SerializedStyles } from "@emotion/react";
import {css} from "@emotion/react";
import Colors from "@styles/colors";
import { flexColumnBetween } from "src/styles";
import { BsCheckCircleFill } from "react-icons/bs";
import Image from "next/image";

export type ColumnMilestoneProps = {
    // totalSteps: number;
    totalStepsList: string[];
    currentStep: number;
    containerCss?: SerializedStyles;
}

const ContainerWrap = (width: number=232, height: number=500) => css`
    width: 100%;
    height: ${height}px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    // border: 1px solid ${Colors.primary5};
`;

const milestoneContainer = (height: number=500, paddingLeft: number=85) => css`
    height: ${height}px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 21px;
    padding-bottom: 21px;
    padding-left: ${paddingLeft}px;
    position: absolute;
    left: 0px;
`;


const baselineStyle = css`
    position: relative;
    width: 2px;
    height: 100%;
    background-color: ${Colors.borderPrimary};
    border-radius: 1rem;
`;

const progresslineStyle = (currentStep, totalStep) => css`
    width: 100%;
    height: ${Math.round(  (Math.min(currentStep-1, totalStep-1))  /(totalStep-1)*100)}%;
    background-color: ${Colors.primary2};
    border-radius: 1rem;
`;

const nodeContainerWrap = css`
    ${flexColumnBetween};
    position: absolute;
    height: 100%;
    padding-top: 21px;
    padding-bottom: 21px;
`;

const mileStoneNode = css`
    position: relative;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid ${Colors.primary2};
`

const textMenu = (width: number=232, height: number=49, paddingLeft: number=85) => css`
    width: ${width}px;
    height: ${height}px;
    font-size: 17px;
    font-weight: 600;
    line-height: 1;
    padding-left: ${paddingLeft}px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    white-space: pre-wrap;// totalStepList?????? n ????????? ??????
    /* &:hover {
        background: #F3F7FA;
    } */
`;

/**
* css ??????
*
* ContainerWrap(width, height): ?????? ContainerWarp ??????, ??????
* -> ContainerWrap??? Height??? milestoneContainer??? Height??? ????????? ??????. (totalHeight = 500)
* -> ContainerWrap??? width??? textMenu width??? ????????? ??????. (totalWidth = 232;)
*
* milestoneContainer(height, padding-left): node, line??? ????????? ???????????? ??????, padding-left
* -> padding-left??? node line??? ?????? ?????? (nodePaddingLeft = 85)
*
* textMenu(width, height, padding-left): textMenu ?????? ????????? css
*-> textMenuPaddingLeft??? textMenu??? ?????? ?????? (textMenuPaddingLeft = 100)
*/


const ColumnMilestone = ({totalStepsList, currentStep=1, ...props}: ColumnMilestoneProps)=>{

    const totalSteps = totalStepsList.length
    const totalStepsListReplaced = totalStepsList.map((ts, k)=> String(ts).replace(' ', '\n'))

    const totalHeight = 500;
    const totalWidth = 232;
    const nodePaddingLeft = 85;
    const textMenuPaddingLeft = 100;

    return(
        // ContainerWrap(width, height): ?????? ContainerWarp ??????, ??????
        <div css={[ContainerWrap(totalWidth, totalHeight), props.containerCss]}>

            {/* milestoneContainer(width, height, padding-left): node, line??? ????????? ???????????? ??????, ??????, padding-left*/}
            <div css={[milestoneContainer(totalHeight, nodePaddingLeft), props.containerCss]}>
                <div css={baselineStyle}>
                    <div css={progresslineStyle(currentStep, totalSteps)}/>
                </div>
                <div css={nodeContainerWrap}>
                    {[...Array(totalSteps)].map((ts, k)=>
                        {
                            const currentStepName = totalStepsListReplaced[k]
                            const stepStatus = (k <= currentStep -1) ? 'finished' : 'future'
                            // console.log('k, currentStep', [k, currentStep])
                            return (
                                <span key={k} css={[
                                    mileStoneNode,
                                    css`background-color: ${stepStatus == 'finished' ? Colors.primary2 : Colors.backgroundWhite};`
                                    ]}
                                />
                            )
                        }
                    )}
                </div>
            </div>

            {totalStepsListReplaced.map((ts, k)=>{
                return (
                    <span key={k} css={[
                        // textMenu(width, height, padding-left): textMenu ?????? ????????? css
                        textMenu(totalWidth, 49, textMenuPaddingLeft),
                        css`background-color: ${k == currentStep-1 ? Colors.backgroundPrimary1 : ''};`
                    ]}>{ts}</span>
                )
            })}
        </div>
    );
};

export default ColumnMilestone;