import EchartBase from "@components/molecules/Echarts/Base";
import { EChartsOption, SeriesOption } from "echarts/types/dist/echarts";
import { css, SerializedStyles } from "@emotion/react";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import * as riskReturnScatterData from "../EfScatterChart/getEfScatterData";
import { getData } from "@components/_temp/v2/customCharts/EfScatterChart/getEfScatterData";
// import {dataFromGraphql} from '@components/_temp/v2/customCharts/EfScatterChart/rawDataFromGraphql'

const containerWrapper = css``;

console.log("RISKRETURN DATA");

export interface RiskReturnScatterChartProps {
  isLoading?: boolean;
  animation?: boolean;
  colorSet?: string[];
  borderColor?: string;
  pointColor?: string;
  xAxisName?: string[];
  yAxisName?: string[];
  data?: Object;
  height?: number;
  width?: number;
  top?: number;
  right?: number;
  fontSize?: number;
  showSymbol?: boolean;
  title?: string;
  subtitle?: string;
  containerCss?: SerializedStyles;
}

/**
 * 기본 Series 옵션.
 * */
export const defaultSeriesOpt: SeriesOption = {
  type: "line",
  smooth: false,
  symbol: "none",
  areaStyle: { opacity: 0.7 },
  stack: "default",
  emphasis: {
    focus: "series",
  },
  lineStyle: { width: 0 },
};

/**
 * /molecules/Echarts/EfScatterChart
 * (Portfolio Historical Line Chart)
 */
const RiskReturnScatterChart = ({
  animation = true,
  borderColor,
  pointColor,
  data,
  height,
  width,
  top,
  right,
  showSymbol = true,
  subtitle,
  title,
  containerCss,
  isLoading = true,
  ...props
}: RiskReturnScatterChartProps) => {

  const getValueFromObj = (ticker, obj) => {
    return obj.filter((v, i) => v['key'] === ticker).map((j, k) => j['value'])[0]
  }

  const getTickerXYvalue = (arrX, arrY) => {
    return arrX.reduce(
      (acc, cur) => {
        const ticker = cur['key']
        const [_xValue, _yValue] = [cur['value'], getValueFromObj(ticker, arrY)]
        return [...acc, [_xValue, _yValue, ticker]]
      }, []
    );
  }

  const miniPointY = data['data']['getMPTPortfolio']['return_statistics']['return']
  const miniPointX = data['data']['getMPTPortfolio']['return_statistics']['volatility']
  const tickersXYvalues = getTickerXYvalue(miniPointX, miniPointY)

  // const {
  //   miniMap: { miniPointX, miniPointY, tickersXYvalues },
  // }: any = data;

  const defaultOpt: EChartsOption = {
    grid: {
      // height: "260px",
      // width: "620px",
      // top: "7px",
      // right: "30px",
      height: height,
      width: width,
      top: top,
      right: right,
      containLabel: false,
      show: true,
      borderColor: borderColor,
      borderWidth: 1,
    },
    tooltip: {
      trigger: "item",
      position: "right",
      backgroundColor: "rgba(0, 0, 0, 0.97)",
      borderColor: "#0E1616",
      textStyle: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "normal",
      },
      formatter: (params) => {
        const [xValue, yValue, ticker] = params.value;
        return `
        <span>Vol : ${xValue.toFixed(2)}</span><br>
        <span>Return : ${yValue.toFixed(2)}</span><br>
        <span>${ticker}</span><br>
        `;
      },
    },

    xAxis: [
      {
        data: miniPointX,
        type: "value",
        splitNumber: 6,
        axisLabel: {
          show: true,
          color: borderColor,
          fontSize: 10,
          showMinLabel: false,
          showMaxLabel: false,
          formatter: function (value, index) {
            return value.toFixed(2);
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 0.6,
            color: borderColor,
          },
        },
      },
    ],
    yAxis: [
      {
        data: miniPointY,
        type: "value",
        splitNumber: 4,
        axisLabel: {
          color: borderColor,
          show: true,
          fontSize: 10,
          showMinLabel: true,
          formatter: function (value, index) {
            return value;
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 0.6,
            color: borderColor,
          },
        },
      },
    ],
    series: [
      {
        id: "scatter_1",
        name: "scatter",
        type: "scatter",
        symbolSize: 9,
        itemStyle: {
          color: pointColor,
        },
        data: tickersXYvalues,
      },
    ],
  };

  const [opt, setOpt] = useState(defaultOpt);

  useEffect(() => { }, []);

  return (
    <div css={[containerWrapper, containerCss]}>
      {!!isLoading && (
        <ClipLoader
          css={css`
            background: red;
          `}
        />
      )}
      {!isLoading && <EchartBase option={opt} />}
    </div>
  );
};

export default RiskReturnScatterChart;
