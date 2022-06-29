import React from "react";
import Colors from "@styles/colors";
import { css } from "@emotion/react";
import { flexColumn, flexRow } from "@styles";
import PortfolioGraphTag from "@lucian2Components/atoms/PortfolioGraphTag";
import { pfResultType } from "@lucian2Components/templates/PfTemplate";

const PfGraphTagsBodyCss = (portfolioOverlayArray: Array<string>) => css`
  ${portfolioOverlayArray ? flexColumn : flexRow};
  width: 100%;
  padding-top:14px;

  > div {
    margin-right: 5.87px;
  }

  & > div {
    margin-bottom: 5px;
  }
`;

const bgColorGraphTag = [
  Colors.primary2,
  Colors.graphSecondTagBg,
  Colors.graphThirdTagBg,
];

const bgOverlayGraphTag = [
  Colors.primary2,
  Colors.graphSecondTagBg,
  Colors.graphSecondTagBg,
  Colors.graphSecondTagBg,
  Colors.graphSecondTagBg,
  Colors.overlayGraphTagColor,
];

interface Props {
  width?: number;
  colorWidth?: number;
  portfolioListArray?: Array<pfResultType>;
  portfolioOverlayArray?: Array<string>;
}

const PfGraphTag = ({
  width,
  colorWidth,
  portfolioListArray,
  portfolioOverlayArray,
}: Props) => {
  return (
    <div css={[PfGraphTagsBodyCss(portfolioOverlayArray)]}>
      {portfolioListArray?.map(
        (el, idx) =>
          el?.element !== undefined && (
            <PortfolioGraphTag
              key={idx}
              tagName={String(el?.element[1])}
              backgroundColor={bgColorGraphTag[idx]}
            />
          )
      )}
      {portfolioOverlayArray?.map((el, idx) => (
        <PortfolioGraphTag
          colorWidth={colorWidth}
          width={width}
          key={idx}
          tagName={el}
          backgroundColor={bgOverlayGraphTag[idx]}
        />
      ))}
    </div>
  );
};

export default PfGraphTag;
