import React, { useState } from "react";
import { css } from "@emotion/react";
import LineChartHnTDot from "./../customCharts/LineChartHnTDot";
import StackedBarChart from "./../customCharts/StackedBarChart";
import MDDLineChart from "../customCharts/MDDLineChart";
import { getMddData } from "../customCharts/MDDLineChart/getNegativeData";
import PHLineChart from "../customCharts/PHLineChart";
import { getData } from "../customCharts/PHLineChart/getData";
import HoldingHistoricalChart from "../customCharts/HoldingHistoricalChart";
import {
  holdingData,
  holidngDate,
} from "../customCharts/HoldingHistoricalChart/getHoldingData";
import PWStackedBarChart from "../customCharts/PWStackedBarChart";
import {
  labels,
  pwChartData,
  getDateArr,
} from "../customCharts/PWStackedBarChart/getPWDate";

const DATA = [
  1, 2.8, 3, 4.8, 3.8, 3.2, 4.4, 2.2, 3.1, 3.8, 1.2, 1.3, 3.1, 4.2, 5, 4.3, 5.5,
];
const DATA2 = [
  1.5, 3.3, 3.5, 5.3, 4.3, 3.7, 4.9, 2.7, 3.6, 4.3, 1.7, 1.8, 3.6, 4.7, 5.5,
  4.8, 6,
];
const DATA3 = [
  0, 0.5, 0.5, 0.5, 0.5, 0.5, 5.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
  1,
];

const mddData = getMddData();
const mddData2 = getMddData();
const mddData3 = getMddData();

const slcData = getData();
const slcData2 = getData();
const slcData3 = getData();
const slcData4 = getData();

const buttonStyle = css`
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  overflow: visible;
  cursor: pointer;
  background-color: #3b77e6;
  width: 60px;
  color: #fff;
`;

const ChartTest = () => {
  const [period, setPeriod] = useState(0);
  return (
    <>
      <h4>PWStackedBarChart</h4>
      <div
        // prettier-ignore
        css={css`width: 714px;height: 350px;background-color:#27293D;padding-top:8px;`}
      >
        <div
          // prettier-ignore
          css={css`display: flex;justify-content: space-between;padding-right:16px;padding-left:16px;`}
        >
          {/* prettier-ignore */}
          <span css={css`color:#ffffff;`}>Asset Allocation Trend</span>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              gap: 8px;
            `}
          >
            <button css={buttonStyle} onClick={() => setPeriod(31)}>
              1M
            </button>
            <button css={buttonStyle} onClick={() => setPeriod(92)}>
              3M
            </button>
            <button css={buttonStyle} onClick={() => setPeriod(184)}>
              6M
            </button>
            <button css={buttonStyle} onClick={() => setPeriod(0)}>
              RESET
            </button>
          </div>
        </div>

        <PWStackedBarChart
          animation={false}
          color={[
            "#294B70",
            "#2D5885",
            "#336BA0",
            "#34628B",
            "#3476B7",
            "#3A83C7",
            "#3B77E6",
            "#3C89C5",
            "#4895DB",
            "#497EB9",
            "#4A74BE",
            "#4A76D7",
            "#4C86E7",
            "#548DEC",
            "#4BADC4",
            "#5CC9BB",
            "#82D2D9",
            "#A9E3EF",
            "#C1E6FF",
          ]}
          xAxisData={getDateArr()}
          data={pwChartData()}
          labelArr={labels}
          isLoading={false}
          zoomStartValue={period}
          // prettier-ignore
          containerCss={css`height: 100%;width: 100%;background-color:#27293D;`}
        />
      </div>
      <br />

      <br />
      <h4>HoldingHistoricalChart</h4>
      <div
        // prettier-ignore
        css={css`width: 714px;height: 325px;`}
      >
        <HoldingHistoricalChart
          animation={false}
          color={[
            // '#294B70',
            // // '#2D5885',
            // '#336BA0',
            // // '#34628B',
            // '#3476B7',
            // // '#3A83C7',
            // '#3B77E6',
            // // '#3C89C5',
            // '#4895DB',
            // // '#497EB9',
            // '#4A74BE',
            // // '#4A76D7',
            // '#4BADC4',
            // // '#4C86E7',
            // '#548DEC',
            // // '#5CC9BB',
            // '#82D2D9',
            // // '#A9E3EF',
            // '#C1E6FF',
            "#E0F3FF",
            "#449EF2",
            "#2F7ACC",
            "#C5D9F7",
            "#4464D8",
            "#2140D8",
            "#6C8DD8",
            "#1818A0",
            "#1B1B56",
            "#4848AF",
            "#000000",
          ]}
          xAxisData={holidngDate}
          rowData={holdingData}
          isLoading={false}
          // prettier-ignore
          containerCss={css`height: 100%;width: 100%;`}
        />
      </div>
      <br />

      <h4>LineChartHnTDot</h4>
      {/* prettier-ignore */}
      <div css={css`width: 300px;height: 100px;`}>
        <LineChartHnTDot
          animation={false}
          color={['#D47878', '#449EF2', '#2E3B43']}
          data={[DATA, DATA2, DATA3]}
          isLoading={false}
          // prettier-ignore
          containerCss={css`height: 100%;width: 100%; padding:8px;`}
        />
      </div>

      <br />
      <h4>StackedBarChart</h4>
      <div
        // prettier-ignore
        css={css`width: 360px;height: 289px;`}
      >
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

      <br />
      <h4>MDDLineChart</h4>
      <div
        // prettier-ignore
        css={css`width: 558px;height: 155px;background-color:#F9F9F9;`}
      >
        <MDDLineChart
          animation={false}
          colorSet={[
            ["#0A79C1", 0.25],
            ["#D47878", 0.15],
            ["#18A3FD", 0.1],
          ]}
          rowData={[
            { name: "test1", data: mddData },
            { name: "test2", data: mddData2 },
            { name: "test3", data: mddData3 },
          ]}
          isLoading={false}
          // prettier-ignore
          containerCss={css`height: 100%;width: 100%;`}
        />
      </div>

      <br />
      <h4>PHLineChart</h4>
      <div
        // prettier-ignore
        css={css`width: 714px;height: 300px;`}
      >
        <PHLineChart
          animation={false}
          color={["#546A78", "#449EF2", "#4464D8", "#B0DEFF"]}
          lineWidth={[2, 2, 2, 0.5]}
          rowData={[
            { name: "test1", data: slcData },
            { name: "test2", data: slcData2 },
            { name: "test3", data: slcData3 },
            { name: "test4", data: slcData4 },
          ]}
          isLoading={false}
          // prettier-ignore
          containerCss={css`height: 100%;width: 100%;`}
        />
      </div>

      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default ChartTest;

export const STACKED_BAR_DATA = [
  {
    name: "This Portfolio",
    data: [
      { label: "Inflation", value: 10 },
      { label: "Oil Price", value: 20 },
      { label: "Agflation", value: 30 },
      { label: "Fed Rate", value: 40 },
      { label: "Turnaround", value: 50 },
    ],
  },
  {
    name: "S&P500",
    data: [
      { label: "Inflation", value: 15 },
      { label: "Oil Price", value: 25 },
      { label: "Agflation", value: 35 },
      { label: "Fed Rate", value: 45 },
      { label: "Turnaround", value: 55 },
    ],
  },
  {
    name: "VMO",
    data: [
      { label: "Inflation", value: 17 },
      { label: "Oil Price", value: 27 },
      { label: "Agflation", value: 37 },
      { label: "Fed Rate", value: 47 },
      { label: "Turnaround", value: 57 },
    ],
  },
];
