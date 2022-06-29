import React from "react";
import { css } from "@emotion/react";
import Colors from "../../../styles/colors";
import { flexCenter } from "@styles";

interface BasicBoxProps {
  width?: number;
  height?: number;
  children: React.ReactNode;
  isDisabled?: boolean;
  borderColor?: string;
  borderRadius?: number;
  scrollGap?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  isScroll?: boolean;
  backgroundColor?: string;
}

type boxContinerStyleProps = {
  width: number;
  height: number;
  isDisabled?: boolean;
  borderColor?: string;
  borderRadius?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  backgroundColor?: string;
};

const boxContinerStyle = ({
  width,
  height,
  isDisabled,
  borderColor,
  borderRadius,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  backgroundColor,
}: boxContinerStyleProps) => css`
  ${flexCenter};
  background-color: ${isDisabled ? Colors.disabled2 : backgroundColor};
  /* background-color: ${backgroundColor}; */
  border: ${borderColor ? `0.5px solid ${borderColor}` : "none"};
  border-radius: ${borderRadius ? `${borderRadius}px` : "8px"};
  width: ${width ? `${width}px` : "100%"};
  height: ${height ? `${height}px` : "auto"};
  position: relative;
  padding-top: ${paddingTop}px;
  padding-bottom: ${paddingBottom}px;
  padding-left: ${paddingLeft}px;
  padding-right: ${paddingRight}px;
`;

const childrenStyle = (scrollGap: number, isScroll: boolean) => css`
  width: 100%;
  height: 100%;
  padding-right: ${scrollGap}px;
  overflow-y: ${isScroll ? "auto" : "none"};

  &::-webkit-scrollbar {
    background: #ececec;
    border-radius: 1.5px;
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 1.5px;
    background: #9da6ad;
  }
`;

const BasicBox = ({
  width,
  height,
  isScroll,
  isDisabled,
  borderColor,
  borderRadius,
  scrollGap = 0,
  paddingTop = 0,
  paddingBottom = 0,
  paddingLeft = 0,
  paddingRight = 0,
  backgroundColor=Colors.backgroundWhite,
  ...props
}: BasicBoxProps) => {
  const _paddingRight = paddingRight ? (scrollGap ? paddingRight - scrollGap : paddingRight) : 0;
  
  return (
    <div
      css={[
        boxContinerStyle({
          width,
          height,
          isDisabled,
          borderColor,
          borderRadius,
          paddingTop,
          paddingBottom,
          paddingLeft,
          paddingRight: _paddingRight,
          backgroundColor,
        }),
      ]}
    >
      <div css={childrenStyle(scrollGap, isScroll)}>{props.children}</div>
    </div>
  );
};

export default BasicBox;
