import React, { useState } from "react";
import { css } from "@emotion/react";
import HeatmapChart from "@components/customCharts/HeatmapChart";
import * as heatmapChartData from "@components/customCharts/HeatmapChart/getHeatmapData";
import EfScatterChart from "@components/customCharts/EfScatterChart";
import * as graphQlData from "@components/customCharts/EfScatterChart/getEfScatterData";
import RiskReturnScatterChart from "@components/customCharts/RiskReturnScatterChart";

// HEATMAP
const heatmapColorSet = [
  "#294B70",
  "#2D5885",
  "#34628B",
  "#336BA0",
  "#3476B7",
  "#3A83C7",
  "#3C89C5",
  "#497EB9",
  "#4A74BE",
  "#4A76D7",
  "#3B77E6",
  "#4C86E7",
  "#548DEC",
  "#4895DB",
  "#4BADC4",
  "#5CC9BB",
  "#82D2D9",
  "#A9E3EF",
  "#C1E6FF",
  "#E0F3FF",
].reverse();
const heatmapXaxisName = heatmapChartData.xAxisName;
const heatmapYaxisName = heatmapXaxisName.reverse();
const heatmapData = heatmapChartData.heatmapData;

// efScatterChartData
const maxValueSharpes = graphQlData.maxValueSharpes;
const minValueSharpes = graphQlData.minValueSharpes;
const efPointX = graphQlData.efPointX;
const efPointXMaxValue = graphQlData.efPointXMaxValue;
const efPointY = graphQlData.efPointY;
const efPointWithSharpes = graphQlData.efPointWithSharpes;
const efLineData = graphQlData.efLineData;

const efScatterDataSet = {
  maxValueSharpes,
  minValueSharpes,
  efPointX,
  efPointXMaxValue,
  efPointY,
  efPointWithSharpes,
  efLineData,
};

// RiskReturnScatterData
const miniPointX = graphQlData.miniPointX;
const miniPointY = graphQlData.miniPointY;
const tickersXYvalues = graphQlData.tickersXYvalues;

const RiskReturnScatterData = {
  miniPointX,
  miniPointY,
  tickersXYvalues,
};



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
  console.log('RiskReturnScatterData : ', RiskReturnScatterData)
  return (
    <>
      <h4>HeatmapChart</h4>
      <div
        // prettier-ignore
        css={css`width: 329px; height: 173px;`}
      >
        <HeatmapChart
          animation={false}
          colorSet={heatmapColorSet}
          visualMapBorderColor={"#2E3B43"}
          xAxisName={heatmapXaxisName}
          yAxisName={heatmapYaxisName}
          data={heatmapData}
          isLoading={false}
          // prettier-ignore
          containerCss={css`height: 100%;width: 100%; background-color: #2E3B43;`}
        />
      </div>

      <br />
      <h4>EfScatterChart</h4>
      <div
        // prettier-ignore
        css={css`width: 415px;height: 270px;`}
      >
        <EfScatterChart
          animation={false}
          colorSet={["#9C02FD", "#4E4AC3", "#2CDCC1", "#0C7DC2", "#063E64"]}
          lineColor={"#CC6A6A"}
          data={efScatterDataSet}
          isLoading={false}
          containerCss={css`
            height: 100%;
            width: 100%;
            border: 1px solid black;
          `}
        />
      </div>

      <br />
      <h4>RiskReturnScatterChart</h4>
      <div
        // prettier-ignore
        css={css`width: 329px;height: 166px;`}
      >
        <RiskReturnScatterChart
          animation={false}
          borderColor={"#CED9E1"} // '#546A78
          pointColor={"#94C9EC"} // 일반 point color는 같음. 강조할 점 '#546A78'
          data={RiskReturnScatterData}
          isLoading={false}
          // prettier-ignore
          containerCss={css`height: 100%;width: 100%; border: 1px solid black;  background-color: #2E3B43;`}
        />
      </div>
      <br />
    </>
  );
};

export default ChartTest;
