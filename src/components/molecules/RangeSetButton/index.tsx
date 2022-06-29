import React, { useRef } from "react";
import { css } from "@emotion/react";
import Buttonable from "../../atoms/Buttonable/index";
import RangeSetBox from "../RangeSetBox/index";

const containerStyle = css`
  display: inline;
`;

const buttonStyle = (disabled: boolean) => css`
  background-color: ${disabled ? "#E4E7EA" : "#546a78;"};
  color: ${disabled ? "#9DA6AD" : "#ffffff;"};
  border-radius: 4px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 10px;
  line-height: 12px;
  padding: 8px 10px;
  &:not(:disabled) {
    cursor: ${disabled ? "default" : "pointer"};
  }
`;

type RangeSetButtonProps = {
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
};

const RangeSetButton = ({
  disabled,
  rowId,
  minLimit,
  maxLimit,
  minValue,
  maxValue,
  onApply,
  open,
  setOpen,
  boxPosRight = 38,
}: RangeSetButtonProps) => {
  const btnRef = useRef<HTMLButtonElement>();
  const containerRef = useRef<HTMLDivElement>();
  const containerTop =
    containerRef.current?.parentElement.parentElement.getBoundingClientRect()
      .top;
  const rowTop =
    containerRef.current?.parentElement.getBoundingClientRect().top;

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
      {btnRef.current && containerRef.current && (
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
          boxPosition={css`top: ${rowTop-containerTop+43+10}px;right: -${boxPosRight}px;`}
        />
      )}
    </div>
  );
};

export default RangeSetButton;
