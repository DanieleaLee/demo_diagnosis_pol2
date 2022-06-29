import React, { useState, useEffect } from "react";
import PortfolioTag from "@lucian2Components/atoms/PortfolioTag";
import { css } from "@emotion/react";
import Colors from "@styles/colors";
import * as Typography from "@styles/typography";
import PortfolioResultCard from "@lucian2Components/atoms/PortfolioResultCard/index";
import { pfResultType } from "@lucian2Components/templates/PfTemplate/index";
import { flexRow, flexColumn } from "@styles";

const PfComparisonCardsCss = css`
  ${flexRow};
`;

const PfComparisonCardCss = css`
  ${flexColumn};
  padding-right: 16px;
  flex: 33.3%;
  // max-width: 570px;
`;

const PfComparisonCardTextCss = css`
  padding-bottom: 10px;
`;

const PfResultCardBodyCss = css`
  width: auto;
  height: auto;
  padding: 18px 18.59px 21px 21px;
`;

const PfResultCardTagBodyCss = css`
  display: inline-flex;
  flex-wrap: wrap;
  padding: 0 7px 9px 0;
`;

const title = [
  "Portfolio Name",
  "Portfolio Type",
  "Source",
  "Underlying Assets",
  "# of Holdings",
  "Initial Date",
  "End Date",
];

interface Props {
  portfolioListArray: Array<pfResultType>;
  removeComparedPortfolio: (idx: number) => void;
}

const PfResultCard = ({
  portfolioListArray,
  removeComparedPortfolio,
}: Props) => {
  const [selectComparedBox, setSelectComparedBox] = useState(0);

  const selectComparedBoxHandler = (idx: number) => {
    setSelectComparedBox(idx);
  };

  return (
    <div css={PfComparisonCardsCss}>
      {portfolioListArray.map((el, idx) => (
        <div css={PfComparisonCardCss} key={idx}>
          <Typography.Base
            fontSize="14px"
            fontWeight="600"
            lineHeight="17px"
            color={Colors.buttonSubmit}
            css={PfComparisonCardTextCss}
          >
            Porfolio {idx + 1}
          </Typography.Base>
          <PortfolioResultCard
            clicked={selectComparedBox === idx}
            onSelect={() => selectComparedBoxHandler(idx)}
            onRemove={() => removeComparedPortfolio(idx)}
          >
            <div css={PfResultCardBodyCss}>
              {el?.element !== undefined ? (
                <>
                  <Typography.Base
                    css={css`
                      font-family: "Inter";
                      padding-bottom: 13px;
                    `}
                    fontSize="18px"
                    fontWeight="500"
                    lineHeight="22px"
                    color={Colors.buttonSubmit}
                  >
                    {el?.element[1]}
                  </Typography.Base>
                  {el?.element
                    .slice(2, el?.element.length - 2)
                    .map((el, idx) => {
                      return (
                        <div css={PfResultCardTagBodyCss} key={idx}>
                          <PortfolioTag
                            title={title[idx + 1]}
                            element={el as string | number}
                          />
                        </div>
                      );
                    })}
                </>
              ) : (
                <>N/A</>
              )}
            </div>
          </PortfolioResultCard>
        </div>
      ))}
    </div>
  );
};

export default PfResultCard;
