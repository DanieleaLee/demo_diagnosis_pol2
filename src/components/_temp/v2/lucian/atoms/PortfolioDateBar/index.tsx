import React from "react";
import { css } from "@emotion/react";
import { flexRowBetween } from "@styles";
import * as Typography from "@styles/typography";
import Colors from "@styles/colors";

const PfDateBarBodyCss = (width = 814.82) => css`
  width: ${width}px;
  ${flexRowBetween};
  font-family: "Inter";
  position: relative;
`;

const PfDateBarCss = (
  background = "rgba(84,106,120,0.2)",
  diff,
  totalDiff,
  left,
  right
) => css`
  background: ${background};
  width: ${(diff / totalDiff) * 100}%;
  border-radius: 0 0 10px 10px;
  position: absolute;
  left: ${`${left}%`};
  right: ${`${right}%`};
  padding: 0 12px;
  height: 20px;
  ${flexRowBetween};
`;

interface Props {
  width?: number;
  background?: string;
  startDate?: string;
  endDate?: string;
  minDate: string;
  maxDate: string;
  totalDiff: number;
  getDateDiff?: (startDate: string, endDate: string) => number;
}

const PortfolioDateBar = ({
  width,
  background,
  startDate,
  endDate,
  minDate,
  maxDate,
  totalDiff,
  getDateDiff,
}: Props) => {
  const diff = getDateDiff(startDate, endDate);
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const min = new Date(minDate).getTime();
  const max = new Date(maxDate).getTime();
  const left = ((start - min) / totalDiff) * 100;
  const right = ((max - end) / totalDiff) * 100;

  return (
    <div css={[PfDateBarBodyCss(width)]}>
      <div css={[PfDateBarCss(background, diff, totalDiff, left, right)]}>
        <Typography.Base
          fontSize="13px"
          fontWeight="600"
          lineHeight="16px"
          color={Colors.buttonSubmit}
        >
          {startDate}
        </Typography.Base>
        <Typography.Base
          fontSize="13px"
          fontWeight="600"
          lineHeight="16px"
          color={Colors.buttonSubmit}
        >
          {endDate}
        </Typography.Base>
      </div>
    </div>
  );
};

export default PortfolioDateBar;
