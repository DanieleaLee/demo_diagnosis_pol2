import EchartBase from "@components/molecules/Echarts/Base";
import { EChartsOption, SeriesOption } from "echarts/types/dist/echarts";
import { css, SerializedStyles } from "@emotion/react";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const containerWrapper = css``;

export interface StackedBarChartProps {
  barWidth?: number;
  isLoading?: boolean;
  animation?: boolean;
  color?: string[];
  fontSize?: number;
  showSymbol?: boolean;
  title?: string;
  subtitle?: string;
  containerCss?: SerializedStyles;
  data?: {
    name: string;
    data: {
      label: string;
      value: number;
    }[];
  }[];
}

/**
 * 기본 Series 옵션.
 * */
export const defaultSeriesOpt: SeriesOption = {
  type: "bar",
  stack: "single_stack",
  emphasis: {
    focus: "series",
  },
  markLine: {
    silent: true,
    symbol: "none",
    label: {
      show: false,
    },
    emphasis: { disabled: true },
    data: [
      {
        name: "Split Line",
        xAxis: 1,
        lineStyle: {
          color: "#2F3B43",
          width: 1,
          type: "dashed",
        },
      },
    ],
  },
};

/**
 * /molecules/Echarts/StackedBarChart
 *
 */
const StackedBarChart = ({
  data = [],
  animation = true,
  color,
  fontSize,
  showSymbol = true,
  subtitle,
  title,
  containerCss,
  isLoading = true,
  barWidth = 20,
  ...props
}: StackedBarChartProps) => {
  const defaultOpt: EChartsOption = {
    grid: {
      left: 0,
      right: 0,
      bottom: 12,
      top: 51,
      containLabel: true,
      width: "75%",
    },
    animation,
    title: {
      text: title,
      subtext: subtitle,
      padding: 0,
      left: 0,
      textStyle: {
        fontFamily: "Inter",
        fontWeight: 600,
        fontSize: 15,
      },
    },
    legend: {
      orient: "vertical",
      right: 0,
      top: "middle",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        width: 60,
        overflow: "truncate",
      },
    },
    xAxis: [
      {
        type: "category",
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          fontSize: 10,
          fontFamily: "Inter",
          fontWeight: 500,
          lineHeight: 13,
          color: "#2F3B43",
          margin: 11,
        },
      },
    ],
    yAxis: {
      type: "value",
    },
  };

  const [opt, setOpt] = useState(defaultOpt);

  useEffect(() => {
    const colorTemp = color ? { color: color } : {};
    const blankData = {
      name: "",
      data: data[0].data.map((d) => ({
        label: d.label,
        value: 0,
      })),
    };

    const _data = [...data];
    _data.splice(1, 0, blankData);

    const _tempLabel = _data.map((d, i) => {
      if (i === 0) return "Target";
      if (i === 2) return "S&P 500";
      if (i === 3) return "VWO";
      return "";
    });
    const _series = _data[0].data.map((d, i) => {
      const _seriesData = _data.map((c) => c.data[i].value);
      return {
        ...defaultSeriesOpt,
        barWidth: barWidth,
        name: d.label,
        data: _seriesData,
      };
    });

    setOpt({
      ...defaultOpt,
      ...colorTemp,
      tooltip: {
        trigger: "item",
        axisPointer: {
          type: "shadow",
        },
        formatter: (params) => {
          const { dataIndex, marker, seriesIndex, seriesName } = params;

          if (dataIndex === 1) return;
          const { data } = _series[seriesIndex];
          const qq = data.map((d, i) => {
            return [_data[i].name, d];
          });

          let string = "";
          qq.forEach((q, i) => {
            if (i === 1) return;
            const [name, value] = q;
            string += `${marker} ${name} ${value} <br/>`;
          });

          return `<b>${seriesName}</b><br/>${string}`;
        },
      },
      xAxis: [
        {
          ...defaultOpt.xAxis[0],
          data: _tempLabel,
        },
      ],

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

export default StackedBarChart;
