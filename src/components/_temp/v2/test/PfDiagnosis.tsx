import React from "react";
import { css } from "@emotion/react";
import Colors from "@styles/colors";
import * as Typography from "@styles/typography";
import { flexRowBetween, flexRow } from "@styles";
import * as TextButton from "@components/atoms/TextButton";
import StackedBarChart from "@components/customCharts/StackedBarChart";
import { STACKED_BAR_DATA } from "@tempComponents/v2/test/ChartTest";
import PfDiagnosisThemeTable from "@lucian2Components/molecules/PfDiagnosisThemeTable/index";
import PfDiagnosisThemeBar from "@lucian2Components/atoms/PfDiagnosisThemeBar";
import { ThemeType } from "@lucian2Components/atoms/PfDiagnosisThemeBar/index";
import { themebar_data } from "src/data/themebar_data";

const PfDgBodyCss = css`
  background: ${Colors.primary1};
`;

const PfDgUpperBodyCss = css`
  ${flexRowBetween};
  max-width: 1507px;
  width: 100%;
  margin: 0 auto;
  padding: 24px 0 21px 0;
`;

const PfDgBtnWrapCss = css`
  ${flexRow};

  & > button:first-of-type {
    margin-right: 11px;
  }
`;

const PfDgLowerBodyCss = css`
  ${flexRow};
  max-width: 1507px;
  width: 100%;
  margin: 0 auto;
`;

const PfDgSummaryThemeWrapCss = css`
  width: 382px;
  height: 431px;
  background: ${Colors.backgroundWhite};
  border-radius: 8px;
  border: 0.5px solid ${Colors.borderPrimary};
  padding: 11px 11px 13px 12px;
`;

const PfDgSummaryBox = css`
  width: 100%;
  height: 110px;
  background: ${Colors.diagnosisSummaryBg};
  border: 1px solid ${Colors.borderPrimary};
  border-radius: 4px;
  padding: 9px 0 0 20px;
  margin-bottom: 8px;
`;

const PfDgStackedBarChartWrapCss = css`
  width: 360px;
  height: 289px;
  background: ${Colors.backgroundWhite};
  border: 0.5px solid ${Colors.borderPrimary};
  border-radius: 4px;
`;

const PfDgThemeBarContainerCss = css`
  ${flexRow}
  width:100%;
  height: 431px;
  background: ${Colors.backgroundWhite};
  border: 0.5px solid ${Colors.borderPrimary};
  border-radius: 8px;
  margin-left: 12px;
  padding: 16px 100px 0 32px;
`;

const PFDgThemeBarsCss = css`
  display: flex;
  margin-top: 50px;
`;

const PFDgThemeHorizontalBarsCss = css`
  margin-right: 25px;
`;

const PfDgThemeHorizontalBarCss = css`
  margin: 20px 0;
`;

const PfDgThemeVerticalBarCss = css`
  padding-top: 38px;
`;

const PfDiagnosis = () => {
  return (
    <div css={PfDgBodyCss}>
      <div css={PfDgUpperBodyCss}>
        <div>
          <Typography.Subtitle4 color={Colors.diagnosisTextColor}>
            Diagnosis
          </Typography.Subtitle4>
          <Typography.Title2 color={Colors.selectCategoryAmountBg}>
            Inflation enhancing Multi-Asset
          </Typography.Title2>
        </div>
        <div css={PfDgBtnWrapCss}>
          {/* prettier-ignore */}
          <TextButton.Normal title="Prev" bgTheme="primary" onClick={() => {}}/>
          {/* prettier-ignore */}
          <TextButton.Normal title="Diagnosis" bgTheme="common" onClick={() => {}}/>
        </div>
      </div>
      <div css={PfDgLowerBodyCss}>
        <div css={PfDgSummaryThemeWrapCss}>
          <div css={PfDgSummaryBox}>
            <Typography.Body5 color={Colors.hint}>
              Diagnosis Summary
            </Typography.Body5>
          </div>
          <div css={PfDgStackedBarChartWrapCss}>
            <StackedBarChart
              title="Top 5 Theme of the Portfolio"
              animation={false}
              color={["#063C62", "#CEE4F2", "#0A79C1", "#2148AA", "#039EF9"]}
              data={STACKED_BAR_DATA}
              isLoading={false}
              // prettier-ignore
              containerCss={css`height: 100%;width: 100%; padding: 16px;`}
              barWidth={20}
            />
          </div>
        </div>
        <div css={PfDgThemeBarContainerCss}>
          <PfDiagnosisThemeTable />
          <div css={PFDgThemeBarsCss}>
            <div css={PFDgThemeHorizontalBarsCss}>
              {themebar_data.map((item) => (
                <div key={item.id} css={PfDgThemeHorizontalBarCss}>
                  <PfDiagnosisThemeBar
                    theme={item.theme as ThemeType}
                    totalPercentage={item.totalPercentage}
                    percentage={item.percentage}
                    align="horizontal"
                  />
                </div>
              ))}
            </div>
            <div css={PfDgThemeVerticalBarCss}>
              <PfDiagnosisThemeBar align="vertical" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PfDiagnosis;
