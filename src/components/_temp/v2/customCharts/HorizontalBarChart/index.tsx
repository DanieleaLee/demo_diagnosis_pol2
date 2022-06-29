import EchartBase from '@components/molecules/Echarts/Base';
import { EChartsOption, SeriesOption } from 'echarts/types/dist/echarts';
import { css, SerializedStyles } from '@emotion/react';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

const containerWrapper = css``;

export interface HorizontalBarChartProps {
  isLoading?: boolean;
  animation?: boolean;
  color?: string[];
  fontSize?: number;
  title?: string;
  subtitle?: string;
  containerCss?: SerializedStyles;
  rowData?: { name: string; data: number[] }[];
  yAxisData?: string[];
}

/**
 * 기본 Series 옵션.
 * */
export const defaultSeriesOpt: SeriesOption = {
  type: 'bar',
  name: '',
  data: [],
};

/**
 * /molecules/Echarts/HorizontalBarChart
 *
 */
const HorizontalBarChart = ({
  rowData = [],
  animation = true,
  color,
  fontSize,
  subtitle,
  title,
  containerCss,
  isLoading = true,
  yAxisData,
  ...props
}: HorizontalBarChartProps) => {
  const defaultOpt: EChartsOption = {
    grid: {
      // left: 0,
      // right: 0,
      bottom: 0,
      // top: 0,
      containLabel: true,
    },
    animation,
    title: {
      text: title,
      subtext: subtitle,
      padding: 0,
      left: 0,
    },
    legend: { type: 'scroll' },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: 'category',
      data: yAxisData,
      // inverse:true,
      // data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'],
    },
  };

  const [opt, setOpt] = useState(defaultOpt);

  useEffect(() => {
    const colorTemp = color ? { color: color } : {};
    const _series = rowData.map((r, i) => ({
      ...defaultSeriesOpt,
      name: r.name,
      data: r.data,
    }));
    setOpt({
      ...defaultOpt,
      ...colorTemp,
      series: _series,
    });
  }, [rowData]);

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

export default HorizontalBarChart;
