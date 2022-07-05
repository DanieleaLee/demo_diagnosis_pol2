import React from "react";
import { css } from "@emotion/react";
import Colors from "@styles/colors";
import { flexCenter } from "@styles";

const PfOverlayCss = css`
  display: inline-block;
  position: absolute;
`;

const PfOverlayBalloonContainerCss = (width = 130.1, height) => css`
  width: ${width}px;
  height: ${height ? `${height}px` : "auto"};
  background: ${Colors.overlayBalloonBg};
  border-radius: 4px;
  ${flexCenter}
`;

const PfOverlayBalloonTriangleWrapCss = css`
  display: flex;
  justify-content: center;
  width: 100%;
`;

// Balloon 밑에 삼각형 에로우
const PfOverlayBalloonTriangleCss = (triangleSize: number) => css`
  width: 0;
  height: 0;
  border-bottom: ${triangleSize}px solid transparent;
  border-top: ${triangleSize}px solid ${Colors.overlayBalloonBg};
  border-left: ${triangleSize}px solid transparent;
  border-right: ${triangleSize}px solid transparent;
  position: absolute;
`;

interface Props {
  width?: number;
  height?: number;
  triangleSize?: number;
  children: React.ReactNode;
  className?: string;
}
const OverlayBalloon = ({
  className,
  width,
  height,
  children,
  triangleSize
}: Props) => {
  return (
    <div css={PfOverlayCss} className={className}>
      <div css={[PfOverlayBalloonContainerCss(width, height)]}>{children}</div>
      <div css={PfOverlayBalloonTriangleWrapCss}>
        <div css={[PfOverlayBalloonTriangleCss(triangleSize)]} />
      </div>
    </div>
  );
};

export default OverlayBalloon;
