import { SerializedStyles } from "@emotion/react";
import {css} from "@emotion/react";
import Colors from "@styles/colors";
import { flexRowBetween } from "src/styles";
import { BsCheckCircleFill } from "react-icons/bs";
import Image from "next/image";

export type RowMilestoneProps = {
    // totalSteps: number;
    totalStepsList: string[];
    currentStep: number;
    currentStepStatus: boolean;
    containerCss?: SerializedStyles;
}

const ContainerWrap = (width: number, height: number) => css`
    height: ${height ? `${height}px` : "30px"};
    width: ${width ? `${width}px` : "300px"};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 8px;
    padding-right: 8px;
    position: relative;
`;

const baselineStyle = css`
    position: relative;
    height: 2px;
    width: 100%;
    background-color: ${Colors.borderPrimary};
    border-radius: 1rem;
`;

const progresslineStyle = (currentStep, totalStep) => css`
    height: 100%;
    width: ${Math.round(  (Math.min(currentStep-1, totalStep-1))  /(totalStep-1)*100)}%;
    background-color: ${Colors.primary2};
    border-radius: 1rem;
`;

const nodeContainerWrap = css`
    ${flexRowBetween};
    position: absolute;
    width: 100%;
`;

const mileStoneNode = css`
    position: relative;
    margin-top: -2px;
    &:hover .tooltipText {
        visibility: visible;
    }
`
const tooltipText = css`
    visibility: hidden;
    width: 66px; // tooltip box sizing 조절
    height: 40px; // tooltip box sizing 조절
    font-size: 11px;
    background-color: black;
    box-shadow: 0px 0px 2px rgba(4, 0, 0, 0.25);
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 3px 0;
    position: absolute;
    z-index: 99;
    bottom: 100%;
    left: -28px;
    white-space: pre-wrap;// totalStepList에서 n 줄바꿈 처리
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: black transparent transparent transparent;
    }

`

/**
 * totalSteps는 parameter로 받지 않고 totalStepsList.length로 계산
 * currentStep은 1부터 받음, 1 첫번째 동그라미, 2 두번째 동그라미
 * currentStepStatus: true는 inProgress, false는 endProgress
 * totalStepsList의 각 element내 공백은 \n으로 replace되어 강제 줄바꿈 (tooltipBox 이쁘게 만들기)
 */

// totalStepsList example
// const totalStepsList = [
//  'Universe Select',
//  'Model Select',
//  'Post Process',
//  'Analysis',
//  'Reporting'
//  ]


const RowMilestone = ({totalStepsList, currentStep=1, currentStepStatus, ...props}: RowMilestoneProps)=>{

    const totalSteps = totalStepsList.length
    const totalStepsListReplaced = totalStepsList.map((ts, k)=> String(ts).replace(' ', '\n'))

    return(
        <div css={[ContainerWrap(300, 30), props.containerCss]}>
            <div css={baselineStyle}>
                <div css={progresslineStyle(currentStep, totalSteps)}/>
            </div>
            <div css={nodeContainerWrap}>
                    {[...Array(totalSteps)].map((ts, k)=>
                        {
                            const currentStepName = totalStepsListReplaced[k]
                            const i_name = (k >= currentStep) ? 'no' : ((currentStepStatus && k == currentStep-1) ? 'in': 'end')
                            return (
                                <span key={k} css={mileStoneNode} >
                                    <Image width={10} height={10} src={`/img/i_${i_name}Progress.png`} alt={currentStepName}/>
                                    <span className='tooltipText' css={tooltipText}>{currentStepName}</span>
                                </span>
                            )
                        }
                    )}
            </div>
        </div>
    );
};

export default RowMilestone;