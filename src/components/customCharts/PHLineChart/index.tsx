import EchartBase from "@components/molecules/Echarts/Base";
import { EChartsOption, SeriesOption } from "echarts/types/dist/echarts";
import { css, SerializedStyles } from "@emotion/react";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const containerWrapper = css``;

export interface PHLineChartProps {
  isLoading?: boolean;
  animation?: boolean;
  color?: string[];
  fontSize?: number;
  showSymbol?: boolean;
  title?: string;
  subtitle?: string;
  containerCss?: SerializedStyles;
  rowData?: { name: string; data: number[][] }[];
  lineWidth?: number[];
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
 * /molecules/Echarts/PHLineChart
 * (Portfolio Historical Line Chart)
 */
const PHLineChart = ({
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
  ...props
}: PHLineChartProps) => {
  const defaultOpt: EChartsOption = {
    grid: {
      left: "1%",
      right: "1%",
      bottom: 70,
      top: "3%",
      // containLabel: true,
    },
    animation,
    title: {
      text: title,
      subtext: subtitle,
      padding: 0,
      left: 0,
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "time",
    },
    yAxis: {
      type: "value",
      show: false,
      boundaryGap: false,
    },
    dataZoom: [
      {
        type: "inside",
        start: 40,
        end: 60,
      },
      {
        type: "slider",
        start: 40,
        end: 60,
        height: 26,
      },
    ],
  };

  const [opt, setOpt] = useState(defaultOpt);

  useEffect(() => {
    const _color = color ? { color: color } : {};
    const _series = rowData.map((r, i) => ({
      ...defaultSeriesOpt,
      name: r.name,
      data: r.data,
      lineStyle: { width: lineWidth[i] ? lineWidth[i] : 1 },
    }));
    setOpt({
      ...defaultOpt,
      ..._color,
      series: _series,
    });
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

export default PHLineChart;
