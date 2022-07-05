import React, { useRef, useState, useEffect } from "react";
import { css } from "@emotion/react";
import Buttonable from "@components/atoms/Buttonable";
import RangeBox from "@components/template/OverlayConfigTemplate/customComponents/RangeBox";
import { flexCenter } from "@styles";

const containerStyle = css`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
`;

const buttonStyle = (disabled: boolean) => css`
  ${flexCenter};
  background-color: ${disabled ? "#E4E7EA" : "#546a78;"};
  color: ${disabled ? "#9DA6AD" : "#ffffff;"};
  border-radius: 4px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 10px;
  line-height: 12px;
  width: 59px;
  padding: 5px 0;
  margin-bottom: 3px;
  &:not(:disabled) {
    cursor: ${disabled ? "default" : "pointer"};
  }
`;

type Props = {
  disabled?: boolean;
  rowId: string;
  minLimit: number;
  maxLimit: number;
  minValue: number;
  maxValue: number;
  onApply: (props: { id?: string; min: number; max: number }) => void;
  openBox?: boolean;
  value?:number;
  isTable?:boolean
};

const RangeBtn = ({
  disabled,
  rowId,
  minLimit,
  maxLimit,
  minValue,
  maxValue,
  onApply,
  openBox,
  value,
  isTable
}: Props) => {
  const btnRef = useRef<HTMLButtonElement>();
  const containerRef = useRef<HTMLDivElement>(null);
  const setBoxRef = useRef<HTMLDivElement>();
  const [open, setOpen] = useState(false);
  const [boxYposition, setboxYposition] = useState(0);

  useEffect(() => {
    const curContainer = containerRef.current;
    const { top: curContainerTop, height: curContainerHeight } =
      curContainer.getBoundingClientRect();
    const tableNode =
      curContainer.parentNode.parentNode.parentNode.parentNode.parentNode
        .parentNode;
    if (open && openBox) {
      const curSetBox = setBoxRef.current;
      const { top: curSetBoxTop } = curSetBox.getBoundingClientRect();
      const newBoxYposition =
        curContainerTop - curSetBoxTop + curContainerHeight;
      tableNode.style = "overflow-y:hidden";
      setboxYposition(newBoxYposition);
    } else {
      tableNode.style = "overflow-y:scroll;";
      setboxYposition(0);
    }
  }, [open]);

  return (
    <div ref={containerRef} css={containerStyle}>
      <Buttonable
        ref={btnRef}
        disabled={disabled}
        containerCss={buttonStyle(disabled)}
        onClick={() => setOpen(!open)}
      >
        {`${minValue}%-${maxValue}%`}
      </Buttonable>
      {openBox && open && (
        <div
          ref={setBoxRef}
          css={css`
            position: absolute;
            top: ${boxYposition}px;
            left:${value === 100 ? '450px':isTable ? '590px':'870px'};
          `}
        >
          <RangeBox
            rowId={rowId}
            open={open}
            setOpen={setOpen}
            min={0}
            max={100}
            minVal={minValue}
            maxVal={maxValue}
            minLimit={minLimit}
            maxLimit={maxLimit}
            onApply={onApply}
          />
        </div>
      )}
    </div>
  );
};

export default RangeBtn;
