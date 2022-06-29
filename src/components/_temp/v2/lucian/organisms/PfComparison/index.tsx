import React from "react";
import * as Typography from "@styles/typography";
import Colors from "@styles/colors";
import { flexCenter, flexColumn, flexRow } from "@styles";
import { css } from "@emotion/react";
import { HiServer } from "react-icons/hi";
import {
  errorMessage,
  pfResultType,
} from "@lucian2Components/templates/PfTemplate";
import PfResultCard from "@lucian2Components/molecules/PfResultCard";
import PfDateBar from "@lucian2Components/molecules/PfDateBar";
import { Big } from "@lucian2Components/atoms/Button/TextButtonBig";
import PfGraphTag from "@lucian2Components/molecules/PfGraphTag";
import PCLineChart from "../../../customCharts/PCLineChart/index";
import { getData } from "../../../customCharts/PHLineChart/getData";

const PfComparisonUpperCss = css`
  ${flexRow}
  width:100%;
  justify-content: space-between;
`;

const PfComparisonUpperTextCss = css`
  padding-bottom: 13px;
`;

const PfComparisonBodyCss = () => css`
  ${flexColumn}
  width:100%;
  height: auto;
  border: 0.5px solid ${Colors.divider};
  border-radius: 8px;
  background: ${Colors.backgroundWhite};
  padding: 25px 0 0 25px;
`;

const PfComparisonBottomWrapCss = css`
  ${flexRow};
  width: calc(100% - 25px);
`;

const PfComparisonBottomRightWrapCss = (
  portfolioList: Array<pfResultType>
) => css`
  margin: 17px 0 25px 16px;
  position: relative;
  padding: 33px 40px 52px 53px;
  background: ${portfolioList.length > 0 ? "#FAFAFA" : ""};
  border-radius: 8px;
  width: 100%;
  height: 100%;
`;

const PfComparisonGraphTagWrapCss = css`
  position: absolute;
  bottom: 13.53px;
  right: 14.61px;
`;

const PfDateBarWrapCss = css`
  padding-top: 37px;
`;

const buttonStyle = css`
  ${flexCenter};
  margin-bottom: 13px;
`;

const slcData = getData();
const slcData2 = getData();
const slcData3 = getData();

interface Props {
  portfolioList: Array<pfResultType>;
  removeComparedPortfolio: (idx: number) => void;
}

const PfComparison = ({ portfolioList, removeComparedPortfolio }: Props) => {
  const singlePFArr = portfolioList.map((el) => el.element.slice(1));

  const arrayWithEmpty = new Array(3).fill(undefined);

  const portfolioListArray = arrayWithEmpty.map((_, idx) => {
    return (arrayWithEmpty[idx] = portfolioList[idx]);
  });

  // Holdings 0인 요소가 있는지 확인
  const isCountOfHoldingsZero = portfolioList.some((el) => el.element[5] === 0);
  // Start date, End date가 동일한 요소가 있는지 확인
  const isSameDate = portfolioList.some(
    (el) => el.element[6] === el.element[7]
  );
  // Portfolio 모든 요소가 서로 동일한 요소가 있는지 확인
  const isDuplicatedPortfolio =
    JSON.stringify(singlePFArr[0]) === JSON.stringify(singlePFArr[1]) &&
    singlePFArr.length > 0;

  const disabledCondition =
    isCountOfHoldingsZero || isSameDate || isDuplicatedPortfolio;

  const errorCondition = errorMessage(
    isCountOfHoldingsZero
      ? "Some Portfolios have no holdings"
      : isSameDate
      ? "Some Portfolios have all empty values"
      : isDuplicatedPortfolio
      ? "Some Portfolios are duplicated"
      : ""
  );

  return (
    <>
      <div css={PfComparisonUpperCss}>
        <Typography.Base
          fontWeight="500"
          fontSize="18px"
          lineHeight="22px"
          color={Colors.selectBoxBorder}
          css={PfComparisonUpperTextCss}
        >
          Portfolio Comparison
        </Typography.Base>
        <div>
          {disabledCondition && errorCondition}
          <Big
            bgTheme="accent"
            icon={() => <HiServer size={22} color={Colors.backgroundWhite} />}
            title="Comparison Analysis"
            onClick={() => {}}
            css={buttonStyle}
            disabled={portfolioList.length === 1 || disabledCondition}
          />
        </div>
      </div>
      <div css={PfComparisonBodyCss}>
        <div>
          <PfResultCard
            portfolioListArray={portfolioListArray}
            removeComparedPortfolio={removeComparedPortfolio}
          />
        </div>
        <div css={PfComparisonBottomWrapCss}>
          <div css={PfDateBarWrapCss}>
            <PfDateBar
              portfolioList={portfolioList}
              portfolioListArray={portfolioListArray}
            />
          </div>
          <div css={[PfComparisonBottomRightWrapCss(portfolioList)]}>
            <div css={PfComparisonGraphTagWrapCss}>
              <PfGraphTag portfolioListArray={portfolioListArray} />
            </div>
            {portfolioList.length > 0 && (
              <div
                css={css`
                  width: inherit;
                  height: 162px;
                `}
              >
                <PCLineChart
                  animation={false}
                  color={["#546A78", "#449EF2", "#4464D8"]}
                  lineWidth={[2, 2, 2]}
                  rowData={[
                    portfolioListArray[0] && slcData,
                    portfolioListArray[1] && slcData2,
                    portfolioListArray[2] && slcData3,
                  ]}
                  isLoading={false}
                  portfolioListArray={portfolioListArray}
                  containerCss={css`
                    height: 100%;
                    width: 100%;
                  `}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PfComparison;
