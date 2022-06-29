import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import Buttonable from "@components/atoms/Buttonable";
import RangeSetBox from "@lucian2Components/molecules/RangeSetBox";
import { flexCenter } from "@styles";

const containerStyle = css`
  display: inline-block;
`;

const buttonStyle = (disabled: boolean) => css`
  min-width: 69px;
  width: 100%;
  height: 25px;
  background-color: ${disabled ? "#E4E7EA" : "#546a78;"};
  color: ${disabled ? "#9DA6AD" : "#ffffff;"};
  border-radius: 4px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 10px;
  line-height: 1;
  ${flexCenter};

  &:not(:disabled) {
    cursor: ${disabled ? "default" : "pointer"};
  }
`;

type RangeBarContentsProps = {
  disabled?: boolean;
  isLast?: boolean;
  rowId: string;
  minLimit: number;
  maxLimit: number;
  minValue: number;
  maxValue: number;
  onApply: (props: { id?: string; min: number; max: number }) => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  boxPosRight?: number;
  openBox?: boolean;
};

const RangeBarContents = ({
  disabled,
  rowId,
  minLimit,
  maxLimit,
  minValue,
  maxValue,
  onApply,
  open,
  setOpen,
  boxPosRight,
  openBox
}: RangeBarContentsProps) => {
  const btnRef = useRef<HTMLButtonElement>();
  const containerRef = useRef<HTMLDivElement>();
  const setBoxRef = useRef<HTMLDivElement>();
  const [skipCount, setSkipCount] = useState(true);
  const [boxYposition, setboxYposition] = useState(0)

  useEffect(() => {
    if (skipCount) setSkipCount(false);
    if (!skipCount) {
      const curContainer = containerRef.current
      const { top: curContainerTop, height: curContainerHeight } = curContainer.getBoundingClientRect()
      const tableNode = curContainer.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
      if (openBox && open) {
        const curSetBox = setBoxRef.current
        const { top: curSetBoxTop } = curSetBox.getBoundingClientRect()
        const newBoxYpostion = (curContainerTop - curSetBoxTop + curContainerHeight)
        tableNode.style = "overflow-y: hidden;"
        setboxYposition(newBoxYpostion)
      } else {
        tableNode.style = "overflow-y: scroll;"
        setboxYposition(0)
      }
    }
  }, [open])

  return (
    <div ref={containerRef} css={containerStyle}>
      <Buttonable
        ref={btnRef}
        disabled={disabled}
        containerCss={buttonStyle(disabled)}
        onClick={() => { setOpen(!open) }}
      >
        {`${minValue}%-${maxValue}%`}
      </Buttonable>

      {openBox && open && (
        <div ref={setBoxRef} css={css`position: absolute; top: ${boxYposition}px;`}>
          <RangeSetBox
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
            // prettier-ignore
            boxPosition={css``}
          />
        </div>
      )}

    </div>
  );
};

export default RangeBarContents;
