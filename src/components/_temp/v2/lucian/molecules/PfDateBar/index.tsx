import React from "react";
import { css } from "@emotion/react";
import Colors from "@styles/colors";
import * as Typography from "@styles/typography";
import { flexRow } from "@styles";
import PortfolioDateBar from "@lucian2Components/atoms/PortfolioDateBar";
import { pfResultType } from "@lucian2Components/templates/PfTemplate";

const PfComparisonDateBarContainerCss = css`
  width: 100%;
`;

const PfComparisonDateBarCss = css`
  ${flexRow};
  padding-bottom: 28px;
  max-width: 1156px;
`;

const PfDateBarTextCss = css`
  width: 91px;
`;

const PfDateBarContainerCss = css`
  ${flexRow};
`;

const PfDateBarNameCss = css`
  width: 221px;
`;

interface Props {
  portfolioList: Array<pfResultType>;
  portfolioListArray: Array<pfResultType>;
}

// Pofrtolio List에서 사용되는 Date Bar
const PfDateBar = ({ portfolioList, portfolioListArray }: Props) => {
  const getDateDiff = (date1: string, date2: string) => {
    const diff = new Date(date2).getTime() - new Date(date1).getTime();
    return diff;
  };

  // PortfolioList 중 최대 date
  const maxDate = portfolioList.reduce((acc, cur) => {
    return acc > cur?.element[7] ? acc : cur?.element[7];
  }, 0);

  // PortfolioList 중 최소 date
  const minDate = portfolioList.reduce((acc, cur) => {
    return acc < cur?.element[6] ? acc : cur?.element[6];
  }, maxDate);

  // 최소 date와 최대 date 차이
  const totalDiff = getDateDiff(String(minDate), String(maxDate));

  return (
    <div css={PfComparisonDateBarContainerCss}>
      {portfolioListArray.map((el, idx) => (
        <div key={idx} css={PfComparisonDateBarCss}>
          <Typography.Base
            fontSize="14px"
            fontWeight="600"
            lineHeight="17px"
            color={Colors.buttonSubmit}
            css={PfDateBarTextCss}
          >
            Porfolio {idx + 1}
          </Typography.Base>
          {el?.element !== undefined && (
            <>
              <Typography.Base
                fontSize="15px"
                fontWeight="400"
                lineHeight="18px"
                color={Colors.primary2}
                css={PfDateBarNameCss}
              >
                {String(el?.element[1])}
              </Typography.Base>
              <div css={PfDateBarContainerCss}>
                <PortfolioDateBar
                  startDate={String(el?.element[6])}
                  endDate={String(el?.element[7])}
                  minDate={String(minDate)}
                  maxDate={String(maxDate)}
                  background={
                    idx === 0
                      ? "rgba(84, 106, 120, 0.2)"
                      : idx === 1
                      ? "rgba(68, 158, 242, 0.2)"
                      : "rgba(68, 100, 216, 0.2)"
                  }
                  totalDiff={totalDiff}
                  getDateDiff={getDateDiff}
                />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default PfDateBar;
