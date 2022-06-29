import React from "react";
import { css, Theme, useTheme } from "@emotion/react";
import Colors from "src/styles/colors";

interface Props {
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

const modernPTPeriodLayout = (props: {
  theme: Theme;
  width: number;
  height: number;
}) => css`
  background: ${props.theme.colors.backgroundWhite};
  border: 0.5px solid ${Colors.divider};
  border-radius: 8px;
  width: ${props.width ? `${props.width}px` : "auto"};
  height: ${props.height ? `${props.height}px` : "100%"};
`;

const ModernPTPeriodBox = ({ width, height, ...props }: Props) => {
  const theme = useTheme();
  return (
    <div
      css={[
        modernPTPeriodLayout({
          theme,
          width,
          height,
        }),
      ]}
    >
      {props.children}
    </div>
  );
};

export default ModernPTPeriodBox;
