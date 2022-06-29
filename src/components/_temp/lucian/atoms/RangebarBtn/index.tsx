import React from "react";
import { css, useTheme, Theme } from "@emotion/react";
import * as Typography from "@styles/typography";
import { flexCenter } from "src/styles";
import Colors from "src/styles/colors";

export interface Props {
  startRangeNum: number;
  endRangeNum: number;
  onClick?: () => void;
  width?: number;
}

const rangeBarContainerWrap = (props: { theme: Theme; width: number }) => css`
  width: ${props.width ? `${props.width}px` : "69px"};
  height: 28px;
  background: ${props.theme.colors.primary2};
  ${flexCenter};
  font-family: "Inter";
  border-radius: 4px;
  cursor: pointer;
`;

const RangeBarBtn = ({
  width,
  onClick,
  startRangeNum,
  endRangeNum,
  ...props
}: Props) => {
  const theme = useTheme();
  return (
    <div css={[rangeBarContainerWrap({ theme, width })]} onClick={onClick}>
      <Typography.Base
        fontSize="10px"
        fontWeight="800"
        lineHeight="12px"
        color={Colors.backgroundWhite}
      >
        {startRangeNum}%-{endRangeNum}%
      </Typography.Base>
    </div>
  );
};

export default RangeBarBtn;
