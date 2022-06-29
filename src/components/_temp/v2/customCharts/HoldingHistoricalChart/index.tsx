import EchartBase from '@components/molecules/Echarts/Base';
import { EChartsOption, SeriesOption } from 'echarts/types/dist/echarts';
import { css, SerializedStyles } from '@emotion/react';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

const containerWrapper = css``;

export interface HoldingHistoricalChartProps {
  isLoading?: boolean;
  animation?: boolean;
  color?: string[];
  fontSize?: number;
  showSymbol?: boolean;
  title?: string;
  subtitle?: string;
  containerCss?: SerializedStyles;
  rowData: { name: string; data: number[] }[];
  xAxisData: string[];
}

/**
 * 기본 Series 옵션.
 * */
export const defaultSeriesOpt: SeriesOption = {
  type: 'line',
  smooth: false,
  symbol: 'none',
  areaStyle: { opacity: 0.7 },
  stack: 'default',
  emphasis: {
    focus: 'series',
  },
  lineStyle: { width: 0 },
};

/**
 * /molecules/Echarts/HoldingHistoricalChart
 * (Portfolio Historical Line Chart)
 */
const HoldingHistoricalChart = ({
  rowData = [],
  animation = true,
  color,
  fontSize,
  showSymbol = true,
  subtitle,
  title,
  containerCss,
  isLoading = true,
  xAxisData,
  ...props
}: HoldingHistoricalChartProps) => {
  const defaultOpt: EChartsOption = {
    grid: {
      left: '1%',
      right: '1%',
      bottom: '50%',
      top: '3%',
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
      trigger: 'axis',
      // position: function (point, params, dom, rect, size) {
      //   // fixed at top
      //   return [point[0], '10%'];
      // },
      position: function (pos, params, dom, rect, size) {
        // tooltip will be fixed on the right if mouse hovering on the left,
        // and on the left if hovering on the right.
        var obj = { top: 20 };
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
        return obj;
      },
    },

    // xAxis: {
    //   type: 'time',
    // },
    yAxis: {
      type: 'value',
      show: false,
      boundaryGap: false,
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
      {
        type: 'slider',
        start: 0,
        end: 100,
        height: 26,
        bottom: 90,
      },
    ],
  };

  const [opt, setOpt] = useState(defaultOpt);

  useEffect(() => {
    const _color = color ? { color: color } : {};
    const _series = rowData.map((d) => {
      return {
        ...defaultSeriesOpt,
        name: d.name,
        data: d.data,
        showSymbol: false,
      };
    });
    const _legendData = rowData.map((d) => d.name);
    setOpt({
      ...defaultOpt,
      ..._color,
      legend: {
        data: _legendData,
        bottom: 0,
        backgroundColor: '#F9F9F9',
        padding: [10, 18, 10, 18],
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          width: 140,
          fontSize: 10,
          backgroundColor: '#F9F9F9',
        },
        icon: 'rect',
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: xAxisData,
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

export default HoldingHistoricalChart;
