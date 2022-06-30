import { ClipLoader } from "react-spinners";
import { EChartsOption, SeriesOption } from "echarts/types/dist/echarts";
import { css, SerializedStyles } from "@emotion/react";
import { useEffect, useState } from "react";
import EchartBase from "@components/molecules/Echarts/Base";
import { TableDataType } from "@lucian2Components/organisms/PfOverlayChartPerformance/index";

const containerWrapper = css``;

type RowDataType = {
  id: number;
  hip: string;
  cagr: string;
  volatility: string;
  mdd: string;
  sharpe: string;
  var: string;
  beta: string;
  chart?: string;
};

export interface PCLineChartProps {
  isLoading?: boolean;
  animation?: boolean;
  color?: string[];
  fontSize?: number;
  showSymbol?: boolean;
  title?: string;
  subtitle?: string;
  containerCss?: SerializedStyles;
  rowData?: { rowData: Array<number[]>; name: string }[];
  lineWidth?: number[];
  tableData?: TableDataType[];
}

/**
 * 기본 Series 옵션.
 * */
export const defaultSeriesOpt: SeriesOption = {
  type: "line",
  smooth: true,
  symbol: "none",
};

/**
 * /molecules/Echarts/PCLineChart
 * (Portfolio Historical Line Chart)
 */
const PCLineChart2 = ({
  lineWidth = [],
  rowData = [],
  animation = true,
  color,
  fontSize,
  showSymbol = true,
  subtitle,
  title,
  containerCss,
  tableData,
  isLoading = true,
  ...props
}: PCLineChartProps) => {
  const defaultOpt: EChartsOption = {
    grid: {
      left: "14%",
      right: "0%",
      bottom: "0%",
      top: "15%",
      containLabel: true,
    },
    legend: {
      orient: "vertical",
      itemGap: 3,
      top: 10,
      left: "left",
      padding: [0, 0, 0, 26],
      height: 250,
      width: 300,
      textStyle: {
        fontSize: 10,
        fontWeight: 400,
        backgroundColor: "transparent",
        width: 100,
        fontFamily: "Inter",
        lineHeight: 12,
        borderWidth: 1,
        borderColor: "#ECECEC",
        borderType: "solid",
        padding: [8, 4, 8, 10],
      },
      itemWidth: 7,
      itemHeight: 25,
      icon: "roundRect",
    },
    animation,
    tooltip: {
      trigger: "axis",
      formatter: (params) => {
        const { name, axisValueLabel, data } = params[0];
        return `Y-value : ${data[1]}\nDate : ${axisValueLabel
          .split("-")
          .join("/")}`;
      },
    },
    xAxis: {
      type: "time",
      show: false,
    },
    yAxis: {
      type: "value",
      show: false,
      boundaryGap: false,
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100,
      },
    ],
  };

  const [opt, setOpt] = useState(defaultOpt);

  useEffect(() => {
    const _color = color ? { color: color } : {};

    const _series: SeriesOption[] = rowData.map((r, i) => ({
      ...defaultSeriesOpt,
      data: r.rowData,
      name: r.name,
      lineStyle: { width: lineWidth[i] ? lineWidth[i] : 1 },
    }));

    const _xAxis = [];

    setOpt({
      ...defaultOpt,
      ..._color,
      xAxis: _xAxis,
      series: _series,
    });
  }, [rowData]);

  return (
    <div css={[containerWrapper, containerCss]}>
      {!!isLoading && <ClipLoader />}
      {!isLoading && <EchartBase option={opt} />}
    </div>
  );
};

export default PCLineChart2;
