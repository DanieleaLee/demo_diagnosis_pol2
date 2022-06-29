import { SerializedStyles } from "@emotion/serialize";
import {css} from "@emotion/react";
import Colors from "@styles/colors"
import {LegacyRef, RefObject, useRef, useState} from "react";

export type DigitInputProps = {
  containerCss?: SerializedStyles;
  firstEleRef?: RefObject <HTMLInputElement>
  isLast?: boolean;
  v: string;
  setV: (v:string)=>void;
  k: number;
};

const InputStyle = css`
  width: 52px;
  margin: 0 10px;
  height: 50px;
  font-size: 25px;
  text-align: center;
  border: 1px solid ${Colors.divider};
  border-radius: 5px;
  caret-color: transparent;
  // line-height: 20px;
  // padding-top: 20px 10px;

  
  &:focus{
    box-shadow: 0 0 10px ${Colors.primary5};
  }
  
  // &.error {
  //   animation: shake 0.2s ease-in-out 0s 2;
  // }
`;

const DigitInput = ({containerCss, firstEleRef, isLast, v, setV, k, ...props}: DigitInputProps) => {

  const self = useRef<HTMLInputElement>(null);
  const inp = firstEleRef || self;

  return(
    <input className="error" css={[InputStyle, containerCss]} type='text' maxLength={1} ref={inp}
           value={v.charAt(k)}

           onChange={e=>{
             e.preventDefault();
           }}

           /** TODO
           * callback 혹은 loop 안에서 hook 을 사용할 수 없기때문에 digit 모든 DigitInput 이 전체 digit을 공유하도록 변경.
           * 단, DigitInput의 경우, 그 이전 이웃 DigitInput 에 의해 변경된 새로운 digit 을 업데이트 받지 못해서.
           * `onFocus` 가 현재 버그가 있는 상태..
           * */
           // onFocus={e=>{
           //   setV(`${v.substring(0,k)} ${v.substring(k+1)}`);
           // }}

           onKeyDown={ (e)=>{
             /**
              * 백스페이스 처리
              * */
             if(e.key == 'Backspace'){

               // 기존 필드에 값이 없었거나, 첫번째 input 이 아닌경우, 백스페이스 처리 하지 x
               if (v[k]==" " && !firstEleRef) {
                 (inp.current.previousSibling as HTMLElement).focus();
               }
               else{
                 setV(`${v.substring(0,k)} ${v.substring(k+1)}`);
               }
             }

             /**
              * 숫자 입력 처리
              * */
             else if (/^\d+$/.test(e.key)){
               const s = v.substring(0,k) + e.key + v.substring(k+1);
               setV( v.substring(0,k) + e.key + v.substring(k+1));

               if (!isLast){
                 (inp.current.nextSibling as HTMLElement).focus();
               }
             }

             /**
              * 숫자가 아닌경우..
              * */
             else{
               e.preventDefault();
             }
           }}

    />
  );
};

export default DigitInput;