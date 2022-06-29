import EchartBase from '@components/molecules/Echarts/Base';
import { EChartsOption, SeriesOption } from 'echarts/types/dist/echarts';
import { css, SerializedStyles } from '@emotion/react';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

const defaultColors = [
  '#5470c6',
  '#5470c6',
  '#5470c6',
  '#91cc75',
  '#91cc75',
  '#91cc75',
  '#fac858',
  '#fac858',
  '#fac858',
];
const containerWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface LineChartHnTDotProps {
  isLoading?: boolean;
  animation?: boolean;
  color?: string[];
  fontSize?: number;
  showSymbol?: boolean;
  title?: string;
  subtitle?: string;
  containerCss?: SerializedStyles;
  data?: number[][];
}

/**
 * 기본 Series 옵션.
 * */
export const defaultSeriesOpt: SeriesOption = {
  // xAxisIndex: 0,
  // yAxisIndex: 0,
  showSymbol: true,
  symbol: 'circle',
  symbolSize: 4,
};

/**
 * /molecules/Echarts/LineChartHnTDot
 * HnT(Head n Tail): 시작 값/끝 값을 점으로 표시한 선형 차트
 */
const LineChartHnTDot = ({
  data = [],
  animation = true,
  color,
  fontSize,
  showSymbol = true,
  subtitle,
  title,
  containerCss,
  isLoading = true,
  ...props
}: LineChartHnTDotProps) => {
  const defaultOpt: EChartsOption = {
    grid: {
      left: 0,
      top: '3%',
      right: 0,
      bottom: 0,
    },
    animation,
    // color: color || {},
    title: {
      text: title,
      subtext: subtitle,
      textStyle: {
        fontSize,
      },
    },
    xAxis: {
      type: 'category',
      show: false,
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        ...defaultSeriesOpt,
        type: 'line',
        data: [],
        symbolSize: 3.3,
        lineStyle: { width: 1.6 },
      },
    ],
  };

  const [opt, setOpt] = useState(defaultOpt);

  useEffect(() => {
    let _xAxis = [];
    let _series = [];
    let _colors = [];

    data.forEach((d, i) => {
      _xAxis.push([
        {
          type: 'category',
          show: false,
          data: new Array(d.length).fill(0).map((_, i) => i),
        },
        {
          type: 'category',
          show: false,
          data: new Array(d.length).fill(0).map((_, i) => i),
        },
        {
          type: 'category',
          show: false,
          data: new Array(d.length).fill(0).map((_, i) => i),
          inverse: true,
        },
      ]);

      _series.push([
        { ...opt.series[0], xAxisIndex: i * 3, data: [d[0]] },
        { ...opt.series[0], xAxisIndex: i * 3 + 1, data: d, showSymbol: false },
        { ...opt.series[0], xAxisIndex: i * 3 + 2, data: [d[d.length - 1]] },
      ]);

      color && _colors.push([color[i], color[i], color[i]]);
    });

    setOpt({
      ...opt,
      color: color ? _colors.flat() : defaultColors,
      xAxis: _xAxis.flat(),
      series: _series.flat(),
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

export default LineChartHnTDot;
