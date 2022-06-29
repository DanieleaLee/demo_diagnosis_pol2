import React from "react";
import { css, Theme, useTheme } from "@emotion/react";
import Colors from "src/styles/colors";
import { flexCenter } from "src/styles";

interface Props {
  width?: number;
  height?: number;
  children?: React.ReactNode;
  isScroll?: boolean;
  isDisabled?: boolean;
  childrenWidth?: number;
  childrenHeight?: number;
  scrollBarWidth?: number;
  scrollBarColor?: string;
  scrollBgColor?: string;
  borderColor?: string;
}

const modernPTLowerSectionBox = (props: {
  theme: Theme;
  width: number;
  height: number;
  isDisabled: boolean;
  borderColor: string;
}) => css`
  ${flexCenter};
  background: ${props.isDisabled ? Colors.disabled2 : Colors.backgroundWhite};
  border: ${props.borderColor ? `0.5px solid ${props.borderColor}` : "none"};
  border-radius: 8px;
  width: ${props.width ? `${props.width}px` : "100%"};
  height: ${props.height ? `${props.height}px` : "auto"};
`;

const childrenStyle = (props: {
  theme: Theme;
  isScroll: boolean;
  childrenWidth?: number;
  childrenHeight?: number;
  scrollBarWidth?: number;
  scrollBgColor?: string;
  scrollBarColor?: string;
}) => css`
  width: calc(100% - ${props.childrenWidth}px);
  height: calc(100% - ${props.childrenHeight}px);
  overflow-y: ${props.isScroll ? "scroll" : "none"};

  &::-webkit-scrollbar {
    background: ${props.scrollBgColor};
    border-radius: 1.5px;
    width: ${props.scrollBarWidth}px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 1.5px;
    background: ${props.scrollBarColor};
  }
`;

const ModernPTLowerSectionBox = ({
  width,
  height,
  isScroll,
  isDisabled,
  childrenWidth,
  childrenHeight,
  scrollBarWidth,
  scrollBarColor,
  scrollBgColor,
  borderColor,
  ...props
}: Props) => {
  const theme = useTheme();
  return (
    <div
      css={[
        modernPTLowerSectionBox({
          theme,
          width,
          height,
          isDisabled,
          borderColor,
        }),
      ]}
    >
      <div
        css={[
          childrenStyle({
            theme,
            isScroll,
            childrenWidth,
            childrenHeight,
            scrollBarWidth,
            scrollBarColor,
            scrollBgColor,
          }),
        ]}
      >
        {props.children}
      </div>
    </div>
  );
};

export default ModernPTLowerSectionBox;
