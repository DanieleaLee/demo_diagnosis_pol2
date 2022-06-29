import DigitInput from "@components/atoms/DigitInput";
import {css} from "@emotion/react";
import {useEffect, useState, useRef, createElement, RefObject} from "react";

export type DigitInputGroupProps = {
  children: React.ReactNode;
};

const containerStyle =  css`
  display: flex;
  justify-content: center;
  padding: 5px 0;
`;

export const useDigitInputGroup = (n:number, focus:RefObject<HTMLInputElement> =null)
  :{digits:string; nodes:React.ReactNode} => {

  const firstElement : RefObject<HTMLInputElement> = useRef();

  const [digits, setDigits] = useState(" ".repeat(n));


  useEffect(()=>{
    if (digits.indexOf(' ') < 0 && !!focus){
      focus.current.focus();
    }

  }, [digits]);


  useEffect(()=>{
    firstElement.current?.focus();
  },[firstElement]);

  const nodes: React.ReactNode = <div>
      {
        [...new Array(n)].map((ele, k)=> {

          return (k ?
              <DigitInput key={k} v={digits} setV={setDigits}
                          k={k} isLast={k == (n - 1)} />
              :
              <DigitInput key={k} v={digits} setV={setDigits}
                          k={k} firstEleRef={firstElement} isLast={k == (n - 1)} />
          );
        })
      }
    </div>;

  return{
    digits,
    nodes
  }
};


const DigitInputGroup = ({children, ...props}: DigitInputGroupProps) => {

  return (
    <div css={containerStyle}>
      {children}
    </div>
  );
};

export default DigitInputGroup;