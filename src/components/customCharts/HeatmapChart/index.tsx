import EchartBase from "@components/molecules/Echarts/Base";
import { EChartsOption, SeriesOption } from "echarts/types/dist/echarts";
import { css, SerializedStyles } from "@emotion/react";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { getData } from "@components/customCharts/EfScatterChart/getEfScatterData";

const containerWrapper = css``;

export interface HeatmapChartProps {
  isLoading?: boolean;
  animation?: boolean;
  colorSet?: string[];
  visualMapBorderColor?: string;
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
 * /molecules/Echarts/HeatmapChart
 * (Portfolio Historical Line Chart)
 */
const HeatmapChart = ({
  animation = true,
  colorSet,
  visualMapBorderColor,
  data,
  showSymbol = true,
  subtitle,
  title,
  containerCss,
  isLoading = true,
  ...props
}: HeatmapChartProps) => {
  const data_ = getData(data);
  const {
    heatmapData: { heatmapData, xAxisName, yAxisName },
  }: any = data_;
  // const xAxisName = "";
  // const yAxisName = "";

  console.log("heatmapData : ", heatmapData);

  const defaultOpt: EChartsOption = {
    color: "#fff",
    tooltip: {
      position: "top",
    },
    grid: {
      height: "100%",
      top: "0%",
    },
    xAxis: {
      type: "category",
      data: xAxisName,
      axisLabel: {
        show: true,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    gradientColor: colorSet,
    yAxis: {
      data: yAxisName,
      axisLabel: {
        show: true,
        rotate: 0,
        margin: 2,
        fontSize: 10,
        formatter: function (value, index) {
          return value.slice(0, 4);
        },
        align: "right",
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    visualMap: {
      type: "continuous",
      min: -1, // 조정 필요
      max: 1, // 조정 필요
      calculable: false,
      orient: "vertical",
      top: "center",
      right: "4px", // 변경 가능
      itemHeight: 165,
      itemWidth: 13,
      align: "auto",
      borderColor: visualMapBorderColor,
      borderWidth: 3,
      padding: 0,
    },
    series: [
      {
        name: "Correlation",
        type: "heatmap",
        data: heatmapData,
        label: {
          show: false,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 4,
            shadowColor: "#fff",
          },
        },
      },
    ],
  };

  const [opt, setOpt] = useState(defaultOpt);

  useEffect(() => {}, []);

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

export default HeatmapChart;
