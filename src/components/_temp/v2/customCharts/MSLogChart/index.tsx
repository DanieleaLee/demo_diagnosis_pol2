import { useEffect, useState } from "react";
import { css, SerializedStyles } from "@emotion/react";
import EchartBase from "@components/molecules/Echarts/Base";
import { EChartsOption, SeriesOption } from "echarts/types/dist/echarts";
import { ClipLoader } from "react-spinners";

const containerWrapper = css``;

interface Props {
  isLoading?: boolean;
  animation?: boolean;
  color?: string[];
  containerCss?: SerializedStyles;
  data?: number[][];
  title?: string[];
}

const defaultSeriesOpt: SeriesOption = {
  type: "line",
  smooth: true,
  symbol: "none",
  name: "ddd",
};

const MSLogChart = ({
  data = [],
  animation = true,
  color,
  containerCss,
  isLoading = true,
  title = [],
}: Props) => {
  const defaultOpt: EChartsOption = {
    animation,
    tooltip: {
      trigger: "axis",
    },
    grid: {
      backgroundColor: "#F3F7FA",
      show: true,
    },
    xAxis: {
      type: "category",
      name: "Step",
      nameLocation: "end",
      data: ["1", "2", "3", "4", "5", "6", "7"],
      nameGap: 0,
      nameTextStyle: {
        align: "right",
        verticalAlign: "top",
        padding: [5, 0, 0, 0],
      },
      show: true,
      axisTick: {
        show: false,
      },
      // position: "bottom",
      alignTicks: false,
      axisLine: {
        show: true,
        lineStyle: {
          color: "#000",
        },
      },
      axisLabel: {
        formatter: "",
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "log",
      name: "Loss",
      nameLocation: "end",
      nameGap: 0,
      nameTextStyle: {
        align: "right",
        verticalAlign: "bottom",
        padding: [0, 0, 10, 0],
      },
      nameRotate: 90,
      show: true,
      position: "left",
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: "#000",
        },
      },
      axisLabel: {
        formatter: "",
      },
      splitLine: {
        show: false,
      },
    },
  };

  const [opt, setOpt] = useState(defaultOpt);

  useEffect(() => {
    const _color = color || ["#5CC9BB", "#3B77E6", "#3476B7"];
    const _series = data.map((r, i) => ({
      ...defaultSeriesOpt,
      color: _color[i],
      endLabel: {
        show: true,
        formatter: title[i],
        color: _color[i],
      },
      data: r,
    }));

    setOpt({
      ...opt,
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

export default MSLogChart;
