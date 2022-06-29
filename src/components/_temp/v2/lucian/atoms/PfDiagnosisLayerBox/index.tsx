import React from "react";
import { css } from "@emotion/react";
import Colors from "@styles/colors";
import * as Typography from "@styles/typography";

const PfDgLayerBoxContainerCss = (width = 99, height) => css`
  background: ${Colors.backgroundWhite};
  border: 1px solid ${Colors.borderPrimary};
  border-radius: 4px;
  width: ${width}px;
  height: auto;
  text-align: center;
  padding-bottom: 10px;
`;

const PfDgLayerBoxLayerTxtCss = css`
  border-bottom: 1px solid ${Colors.borderPrimary};
  width: 100%;
  padding: 5px 30px 6px 28px;
`;

const PfDgLayerBoxScoreTxtCss = css`
  padding: 3px 10px 0 0;
`;

interface Props {
  width?: number;
  height?: number;
  layerNumberTxt?: string;
  scoreTxt?: string;
  headlineColor?: string;
  themeName?: string;
}

const PfDiagnosisLayerBox = ({
  width,
  height,
  layerNumberTxt,
  scoreTxt,
  headlineColor,
  themeName,
}: Props) => {
  return (
    <div css={[PfDgLayerBoxContainerCss(width, height)]}>
      <div css={PfDgLayerBoxLayerTxtCss}>
        <Typography.Body5 color={Colors.primary2}>
          {layerNumberTxt}
        </Typography.Body5>
      </div>
      <div css={PfDgLayerBoxScoreTxtCss}>
        <Typography.Headline3 color={headlineColor}>
          {scoreTxt}
        </Typography.Headline3>
      </div>
      <Typography.Body5 color={Colors.selectCategoryAmountBg}>
        {themeName}
      </Typography.Body5>
    </div>
  );
};

export default PfDiagnosisLayerBox;
