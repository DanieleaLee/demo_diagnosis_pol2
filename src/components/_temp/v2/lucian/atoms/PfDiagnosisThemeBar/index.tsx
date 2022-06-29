import React from "react";
import { css } from "@emotion/react";
import * as Typography from "@styles/typography";
import Colors from "@styles/colors";

const PfDgThemeBarBodyCss = (align: AlignType) => css`
  width: ${align === "vertical" ? "8px" : "630px"};
  transform: ${align === "vertical" ? "rotate(180deg)" : ""};
  position: ${align === "vertical" ? "relative" : "none"};
`;

const PfDgThemeBarPercentageTextCss = (
  totalPercentage: number,
  percentage: number
) => css`
  position: relative;
  padding-left: ${(percentage / totalPercentage) * 100 - 2}%;
`;

const PfDgThemeBarContainerCss = (align: AlignType) => css`
  height: ${align === "vertical" ? "250px" : "8px"};
  background: ${align === "vertical"
    ? "linear-gradient(180deg, #009bff, #31c96d)"
    : "linear-gradient(90deg, #009bff, #31c96d)"};
  border-radius: 8px;
  position: relative;
`;

const PfDgThemeBarDotCss = (totalPercentage: number, percentage: number) => css`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${Colors.backgroundWhite};
  position: absolute;
  left: ${(percentage / totalPercentage) * 100}%;
  bottom: 2px;
`;

const PfDgThemeBarNegativeTxtCss = css`
  font-family: "Inter";
  display: inline-flex;
  width: 50px;
  transform: rotate(180deg);
  white-space: pre-wrap;
  position: absolute;
  top: -7px;
  left: -60px;
  text-align: center;
`;

const PfDgThemeBarPositiveTxtCss = css`
  font-family: "Inter";
  display: inline-flex;
  width: 50px;
  transform: rotate(180deg);
  white-space: pre-wrap;
  position: absolute;
  bottom: -15px;
  right: 20px;
  text-align: center;
`;

export type ThemeType = "oil-price" | "inverted-yield-curve" | "agflation";
export type AlignType = "vertical" | "horizontal";

interface Props {
  totalPercentage?: number;
  percentage?: number;
  theme?: ThemeType;
  align?: AlignType;
}

// Diagnosis Page => Theme Influence Analysis Return 값 나타내주는 막대
const PfDiagnosisThemeBar = ({
  totalPercentage,
  percentage,
  theme,
  align,
}: Props) => {
  const themeSignCondition =
    theme === "oil-price"
      ? "$/B"
      : theme === "inverted-yield-curve"
      ? "bp"
      : theme === "agflation"
      ? " $"
      : "%";

  return (
    <div css={[PfDgThemeBarBodyCss(align)]}>
      {align === "vertical" && (
        <div css={[PfDgThemeBarContainerCss(align)]}>
          <Typography.Base
            fontSize="10px"
            fontWeight="600"
            lineHeight="12px"
            color={Colors.selectCategoryAmountBg}
            css={PfDgThemeBarNegativeTxtCss}
          >
            {`Negative\non Return`}
          </Typography.Base>
          <Typography.Base
            fontSize="10px"
            fontWeight="600"
            lineHeight="12px"
            color={Colors.selectCategoryAmountBg}
            css={PfDgThemeBarPositiveTxtCss}
          >
            {`Positive\non Return`}
          </Typography.Base>
        </div>
      )}
      {align === "horizontal" && (
        <>
          <Typography.Body2
            css={[PfDgThemeBarPercentageTextCss(totalPercentage, percentage)]}
            color={Colors.buttonSubmit}
          >
            {percentage}
            {themeSignCondition}
          </Typography.Body2>
          <div css={[PfDgThemeBarContainerCss(align)]}>
            <div css={[PfDgThemeBarDotCss(totalPercentage, percentage)]}></div>
          </div>
        </>
      )}
    </div>
  );
};

export default PfDiagnosisThemeBar;
