import EchartBase from "@components/molecules/Echarts/Base";
import { EChartsOption, SeriesOption } from "echarts/types/dist/echarts";
import { css, SerializedStyles } from "@emotion/react";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { pfResultType } from "../../lucian/templates/PfTemplate/index";

const containerWrapper = css``;

export interface PCLineChartProps {
  isLoading?: boolean;
  animation?: boolean;
  color?: string[];
  fontSize?: number;
  showSymbol?: boolean;
  title?: string;
  subtitle?: string;
  containerCss?: SerializedStyles;
  rowData?: Array<number[][]>;
  lineWidth?: number[];
  portfolioListArray?: Array<pfResultType>;
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
const PCLineChart = ({
  lineWidth = [],
  rowData = [],
  animation = true,
  color,
  fontSize,
  showSymbol = true,
  subtitle,
  title,
  containerCss,
  isLoading = true,
  portfolioListArray,
  ...props
}: PCLineChartProps) => {
  const defaultOpt: EChartsOption = {
    grid: {
      left: "1%",
      right: "1%",
      bottom: "0%",
      top: "3%",
      // containLabel: true,
    },
    animation,
    tooltip: {
      trigger: "axis",
      formatter: "{d}%\n{b}",
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
        start: 50,
        end: 100,
      },
    ],
  };

  const [opt, setOpt] = useState(defaultOpt);

  useEffect(() => {
    const _color = color ? { color: color } : {};

    const _series = rowData.map((r, i) => ({
      ...defaultSeriesOpt,
      data: r,
      lineStyle: { width: lineWidth[i] ? lineWidth[i] : 1 },
    }));
    setOpt({
      ...defaultOpt,
      ..._color,
      series: _series,
    });
  }, [portfolioListArray]);

  return (
    <div css={[containerWrapper, containerCss]}>
      {!!isLoading && <ClipLoader />}
      {!isLoading && <EchartBase option={opt} />}
    </div>
  );
};

export default PCLineChart;
