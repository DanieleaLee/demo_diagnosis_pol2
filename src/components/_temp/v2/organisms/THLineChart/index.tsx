// import EchartBase, {EchartsProps} from "../Base";
import EchartBase from "@components/molecules/Echarts/Base";
import {
  EChartsOption,
  SeriesOption,
  SetOptionOpts,
  XAXisComponentOption,
} from "echarts/types/dist/echarts";
import { SerializedStyles } from "@emotion/serialize";
import Echarts from "@components/molecules/Echarts/Base";
import React, { useState, useEffect } from "react";
import { useLoadingCallback } from "src/lib/hooks/useLoadingCallback";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";

const containerWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface LinearChartProps {
  fetchFn: (...args: any[] | never) => any;
  animation?: boolean;
  color?: string[];
  fontSize?: number;
  showSymbol?: boolean;
  title?: string;
  subtitle?: string;
  containerCss?: SerializedStyles;
  customOptions?: EChartsOption;
}

/**
 * 기본 Series 옵션.
 * */
export const defaultSeriesOpt: SeriesOption = {
  // xAxisIndex: 0,
  // yAxisIndex: 0,
  showSymbol: true,
  symbol: "circle",
  symbolSize: 4,
};

const LinearChart = ({
  fetchFn,
  animation = true,
  color,
  fontSize,
  showSymbol = true,
  subtitle,
  title,
  containerCss,
  customOptions,
  ...props
}: LinearChartProps) => {
  const defaultOpt: EChartsOption = {
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    animation,
    color: color || {},
    // ...color||{}, // 형식 변경
    title: {
      text: title,
      subtext: subtitle,
      textStyle: {
        fontSize,
      },
    },
    xAxis: {
      type: "category",
      show: false,
    },
    yAxis: {
      type: "value",
      show: false,
    },
    series: [
      {
        ...defaultSeriesOpt,
        type: "line",
        data: [],
      },
    ],
  };

  const [opt, setOpt] = useState(defaultOpt);

  const { callback: loadChart, isLoading } = useLoadingCallback(async () => {
    const data = await fetchFn();
    // console.log({
    //   ...opt,
    //   series: data.map(d=>({
    //     ...opt.series[0],
    //     ...d
    //   }))
    // });

    setOpt({
      ...opt,
      ...customOptions,
      series: data.map((d, i) => ({
        ...opt.series[0],
        showSymbol: i === 1 ? false : true,
        symbolSize:3.3,
        xAxisIndex: i,
        lineStyle: { width: 1.6  },
        ...d,
      })),
    });
  }, []);

  useEffect(() => {
    loadChart();
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

export default LinearChart;
