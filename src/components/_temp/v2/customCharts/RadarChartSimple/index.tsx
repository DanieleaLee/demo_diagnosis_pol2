import React from "react";

import EchartBase from "@components/molecules/Echarts/Base";
import { EChartsOption, SeriesOption } from "echarts/types/dist/echarts";
import { css, SerializedStyles } from "@emotion/react";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import echarts from "echarts";

const containerWrapper = css``;

export interface RadarChartSimpleProps {
  isLoading?: boolean;
  animation?: boolean;
  color?: string[];
  fontSize?: number;
  title?: string;
  subtitle?: string;
  containerCss?: SerializedStyles;
  rowData?: { name: string; value: number[] }[];
  indicatorOpt?: { name: string; max: number }[];
}

/**
 * 기본 Series 옵션.
 * */
export const defaultSeriesOpt: SeriesOption = {
  name: "Single Radar Chart",
  type: "radar",
  areaStyle: {
    opacity: 0.3,
  },
  lineStyle:{
    color:'#7485C1',
    width:1
  },
  symbol: "none",
};

/**
 * /molecules/Echarts/RadarChartSimple
 *
 */
const RadarChartSimple = ({
  animation = true,
  color,
  fontSize,
  subtitle,
  title,
  containerCss,
  isLoading = true,
  rowData = [],
  indicatorOpt,
  ...props
}: RadarChartSimpleProps) => {
  const defaultOpt: EChartsOption = {
    animation,
    title: {
      text: title,
      subtext: subtitle,
      padding: 0,
      left: 0,
    },
    // legend: {},
    tooltip: {},
    radar: {
      shape: "circle",
      splitArea: {
        show: false,
      },
      axisName: {
        fontFamily: "Inter",
        fontWeight: 500,
        fontSize: 13,
        color: "#2F3B43",
      },
      indicator: indicatorOpt,
    },
  };

  const [opt, setOpt] = useState(defaultOpt);

  useEffect(() => {
    const _series: SeriesOption[] = [
      {
        ...defaultSeriesOpt,
        data: [...rowData],
      },
    ];
    setOpt({
      ...defaultOpt,
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

export default RadarChartSimple;
