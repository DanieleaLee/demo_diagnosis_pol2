import React from 'react';

import EchartBase from '@components/molecules/Echarts/Base';
import { EChartsOption, SeriesOption } from 'echarts/types/dist/echarts';
import { css, SerializedStyles } from '@emotion/react';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

const containerWrapper = css``;

export interface SingleScoreChartProps {
  isLoading?: boolean;
  animation?: boolean;
  title?: string;
  subtitle?: string;
  containerCss?: SerializedStyles;
  name?: string;
  value: number;
  fontSize?: number;
  lineWidth?: number;
}

/**
 * 기본 Series 옵션.
 * */
export const defaultSeriesOpt: SeriesOption = {
  type: 'gauge',
  radius: '100%',
  startAngle: 90,
  endAngle: -270,
  pointer: { show: false },
  axisTick: { show: false },
  axisLabel: { show: false },
  splitLine: { show: false },
  data: [],
  title: { show: false },
};

/**
 * /molecules/Echarts/SingleScoreChart
 *
 */
const SingleScoreChart = ({
  animation = true,
  subtitle,
  title,
  containerCss,
  isLoading = true,
  name='single score chart',
  value,
  lineWidth = 3,
  fontSize = 17.42,
}: SingleScoreChartProps) => {
  const defaultOpt: EChartsOption = {
    animation,
    title: {
      text: title,
      subtext: subtitle,
      padding: 0,
      left: 0,
    },
  };

  const [opt, setOpt] = useState(defaultOpt);

  useEffect(() => {
    const isPositive = value >= 50;
    const _color = isPositive ? '#3478BC' : '#ED6565';
    // const _color = 'linear-gradient(90deg, rgba(5,106,26,1) 0%, rgba(140,162,31,0.9850315126050421) 22%, rgba(68,151,71,0.8393732492997199) 49%, rgba(36,180,158,0.788953081232493) 70%, rgba(0,212,255,1) 100%)'

    const _series: SeriesOption[] = [
      {
        ...defaultSeriesOpt,
        // clockwise: isPositive,
        detail: {
          fontFamily: 'Inter',
          fontSize: fontSize,
          fontWeight: 600,
          color: _color,
          // formatter: (isPositive ? '+' : '-') + '{value}',
          formatter:  '{value}',
        },
        axisLine: { lineStyle: { width: lineWidth, color: [[1, '#C4C4C4']] } },
        progress: {
          show: true,
          overlap: true,
          roundCap: true,
          width: lineWidth,
          itemStyle: { color: _color },
        },
        data: [
          {
            value: Math.abs(value),
            name: name,
            detail: {
              valueAnimation: true,
              offsetCenter: [0, 0],
            },
          },
        ],
      },
    ];
    setOpt({
      ...defaultOpt,
      series: _series,
    });
  }, [name, value]);

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

export default SingleScoreChart;
