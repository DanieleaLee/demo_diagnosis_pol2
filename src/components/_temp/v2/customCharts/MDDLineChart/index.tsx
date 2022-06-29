import EchartBase from '@components/molecules/Echarts/Base';
import { EChartsOption, SeriesOption } from 'echarts/types/dist/echarts';
import { css, SerializedStyles } from '@emotion/react';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

const containerWrapper = css``;

export interface MDDLineChartProps {
  isLoading?: boolean;
  animation?: boolean;
  colorSet?: [color: string, opacity?: number][];
  fontSize?: number;
  showSymbol?: boolean;
  title?: string;
  subtitle?: string;
  containerCss?: SerializedStyles;
  rowData?: { name: string; data: number[][] }[];
}

/**
 * 기본 Series 옵션.
 * */
export const defaultSeriesOpt: SeriesOption = {
  type: 'line',
  smooth: true,
  symbol: 'none',
  lineStyle: { width: 0.5 },
};

/**
 * /molecules/Echarts/MDDLineChart
 *
 */
const MDDLineChart = ({
  rowData = [],
  animation = true,
  colorSet,
  fontSize,
  showSymbol = true,
  subtitle,
  title,
  containerCss,
  isLoading = true,

  ...props
}: MDDLineChartProps) => {
  const defaultOpt: EChartsOption = {
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    },
    animation,
    title: {
      text: title,
      subtext: subtitle,
      padding: 0,
      left: 0,
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'time',
      axisTick: { show: false },
      axisLabel: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
  };

  const [opt, setOpt] = useState(defaultOpt);

  useEffect(() => {
    const _color = colorSet ? { color: colorSet.map((c) => c[0]) } : {};
    const _series = rowData.map((r, i) => ({
      ...defaultSeriesOpt,
      name: r.name,
      data: r.data,
      areaStyle: { opacity: colorSet ? colorSet[i][1] : 0.7 },
    }));
    setOpt({
      ...defaultOpt,
      ..._color,
      xAxis: {
        ...defaultOpt.xAxis,
        axisLine: {
          show: true,
          lineStyle: colorSet ? { color: [...colorSet].pop()[0] } : {},
        },
      },
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

export default MDDLineChart;
