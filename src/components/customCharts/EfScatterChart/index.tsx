import EchartBase from "@components/molecules/Echarts/Base";
import { EChartsOption, SeriesOption } from "echarts/types/dist/echarts";
import { css, SerializedStyles } from "@emotion/react";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { getData } from "./getEfScatterData";

const containerWrapper = css``;

export interface RiskReturnScatterChartProps {
  isLoading?: boolean;
  animation?: boolean;
  colorSet?: string[];
  lineColor?: string;
  xAxisName?: string[];
  yAxisName?: string[];
  data?: Object;
  fontSize?: number;
  showSymbol?: boolean;
  title?: string;
  subtitle?: string;
  containerCss?: SerializedStyles;
  // rowData: { name: string; data: number[] }[];
  // xAxisData: string[];
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
 * /molecules/Echarts/RiskReturnScatterChart
 * (Portfolio Historical Line Chart)
 */
const RiskReturnScatterChart = ({
  animation = true,
  colorSet,
  lineColor,
  xAxisName,
  yAxisName,
  data,
  showSymbol = true,
  subtitle,
  title,
  containerCss,
  isLoading = true,
  ...props
}: RiskReturnScatterChartProps) => {
  const data_ = getData(data);
  const {
    sharpes: { maxValueSharpes, minValueSharpes },
    efPoint: { efPointX, efPointXMaxValue, efPointY },
    efLine: { efLineData, efPointWithSharpes },
  }: any = data_;

  const defaultOpt: EChartsOption = {
    grid: {
      height: "230px",
      top: "10px",
      containLabel: false,
    },
    visualMap: {
      max: maxValueSharpes,
      min: minValueSharpes,
      dimension: 2,
      precision: 2,
      orient: "vertical",
      top: "15px",
      right: "10px",
      itemHeight: 230,
      itemWidth: 13,
      seriesIndex: 0,
      calculable: false,
      hoverLink: true,
      padding: 0,
      inRange: {
        color: colorSet,
      },
      textStyle: {
        fontSize: 0,
        color: "rgba(0, 0, 0, 0)",
      },
    },
    tooltip: {
      trigger: "item",
      axisPointer: {
        type: "cross",
      },
      position: "top",
      backgroundColor: "rgba(0, 0, 0, 0.97)",
      borderColor: "#0E1616",
      textStyle: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "normal",
      },
      formatter: (params) => {
        const [xValue, yValue, sharpes] = params.value;
        return `
        <span>vol : ${xValue.toFixed(2)}</span><br>
        <span>return : ${yValue.toFixed(2)}</span><br>
        <span>sharpes: ${sharpes.toFixed(2)}</span>
        `;
      },
    },

    xAxis: [
      {
        data: efPointX,
        max: (efPointXMaxValue * 1.2).toFixed(2),
        type: "value",
        splitNumber: 8,
        axisLabel: {
          show: true,
          fontWeight: "bold",
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
        },
      },
    ],
    yAxis: [
      {
        data: efPointY,
        type: "value",
        splitNumber: 6,
        axisLabel: {
          show: true,
          fontWeight: "bold",
          align: "left",
          margin: 40,
          showMinLabel: true,
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
      },
    ],
    series: [
      {
        id: "scatter_1",
        name: "scatter",
        type: "scatter",
        symbolSize: 3,
        data: efPointWithSharpes,
        markLine: {
          silent: true,
          symbol: "none",
          animation: false,
          label: {
            show: false,
          },
          data: [
            {
              xAxis: 0,
              lineStyle: {
                color: "#fff",
                width: 2,
                type: "solid",
              },
            },
            {
              xAxis: (efPointXMaxValue * 1.2).toFixed(2),
              valueIndex: 0,
              lineStyle: {
                color: "#fff",
                width: 2,
                type: "solid",
              },
            },
          ],
        },
      },
      {
        data: efLineData,
        id: "line_1",
        type: "line",
        smooth: true,
        symbol: "none",
        itemStyle: {
          normal: {
            lineStyle: {
              color: lineColor,
              type: "dashed",
              width: 2,
              type: [4, 2],
            },
          },
        },
      },
    ],
  };

  const [opt, setOpt] = useState(defaultOpt);

  useEffect(() => {
    // console.log("data 2 : ", data);
    // const data_ = getData(data);
    // console.log("data_ 2 : ", data_);
    // const {
    //   sharpes: { maxValueSharpes, minValueSharpes },
    //   efPoint: { efPointX, efPointXMaxValue, efPointY },
    //   efLine: { efLineData, efPointWithSharpes },
    // }: any = data_;
    // const newOpt = {
    //   visualMap: {
    //     max: maxValueSharpes,
    //     min: minValueSharpes,
    //   },
    //   xAxis: [
    //     {
    //       data: efPointX,
    //       max: (efPointXMaxValue * 1.2).toFixed(2),
    //     },
    //   ],
    //   yAxis: [
    //     {
    //       data: efPointY,
    //     },
    //   ],
    //   series: [
    //     {
    //       data: efPointWithSharpes,
    //       markLine: {
    //         data: [
    //           {
    //             xAxis: (efPointXMaxValue * 1.2).toFixed(2),
    //           },
    //         ],
    //       },
    //     },
    //     {
    //       data: efLineData,
    //     },
    //   ],
    // };
    // console.log("newOpt : ", newOpt);
    // const v = { ...defaultOpt, ...defaultOpt };
    // console.log("v : ", v);
    // setOpt({ ...defaultOpt, ...defaultOpt });
  }, []);

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
