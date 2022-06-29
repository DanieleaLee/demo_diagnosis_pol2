import EchartBase from '@components/molecules/Echarts/Base';
import { EChartsOption, SeriesOption } from 'echarts/types/dist/echarts';
import { css, SerializedStyles } from '@emotion/react';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

const containerWrapper = css``;

export interface PWStackedBarChartProps {
  barWidth?: number;
  xAxisData: number[];
  labelArr: string[];
  isLoading?: boolean;
  animation?: boolean;
  color?: string[];
  fontSize?: number;
  showSymbol?: boolean;
  title?: string;
  subtitle?: string;
  containerCss?: SerializedStyles;
  data?: number[][];
  zoomStartValue?: number;
}

/**
 * 기본 Series 옵션.
 * */
export const defaultSeriesOpt: SeriesOption = {
  type: 'bar',
  stack: 'single_stack',
  emphasis: {
    focus: 'series',
  },
};

/**
 * /molecules/Echarts/PWStackedBarChart
 *
 */
const PWStackedBarChart = ({
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
  xAxisData,
  labelArr,
  zoomStartValue = 0,
  ...props
}: PWStackedBarChartProps) => {
  const xAxisEndIndex = xAxisData.length - 1;
  const defaultOpt: EChartsOption = {
    grid: {
      left: '3%',
      right: '3%',
      bottom: '10%',
      top: '3%',
      containLabel: true,
      // width: '75%',
    },
    animation,
    title: {
      text: title,
      subtext: subtitle,
      padding: 0,
      left: 0,
      textStyle: {
        fontFamily: 'Inter',
        fontWeight: 600,
        fontSize: 15,
      },
    },
    legend: {
      // orient: 'vertical',
      // right: 0,
      // top: 'middle',
      bottom: 0,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        width: 60,
        overflow: 'truncate',
        fontSize: 10,
        fontFamily: 'Inter',
        fontWeight: 500,
        lineHeight: 13,
        // color: '#2F3B43',
        color: '#ffffff',
        
      },
    },
    xAxis: [
      {
        type: 'category',
        data: xAxisData,

        axisLabel: {
          // show: false,
          fontSize: 10,
          fontFamily: 'Inter',
          fontWeight: 500,
          lineHeight: 13,
          // color: '#2F3B43',
          color: '#ffffff',
          margin: 11,
        },
      },
    ],
    yAxis: {
      type: 'value',
      axisLabel: {
        // show: false,
        fontSize: 10,
        fontFamily: 'Inter',
        fontWeight: 500,
        lineHeight: 13,
        // color: '#2F3B43',
        color: '#ffffff',
        margin: 11,
      },
    },
    // dataZoom: [
    //   {
    //     type: 'slider',
    //     startValue: 0,
    //     endValue: xAxisEndIndex,
    //   },
    // ],
  };

  const [opt, setOpt] = useState(defaultOpt);

  useEffect(() => {
    const colorTemp = color ? { color: color } : {};
    const _data = [...data];
    const _series = labelArr.map((d, i) => {
      const _seriesData = _data.map((c) => c[i]);
      return {
        ...defaultSeriesOpt,
        barWidth: '110%',
        name: labelArr[i],
        data: _seriesData,
        itemStyle: {
          borderColor: 'black',
          borderWidth: 0,
        },
      };
    });

    setOpt({
      ...defaultOpt,
      ...colorTemp,

      // tooltip: {
      //   trigger: 'item',
      //   axisPointer: {
      //     type: 'shadow',
      //   },
      //   formatter: (params) => {
      //     const { dataIndex, marker, seriesIndex, seriesName } = params;

      //     if (dataIndex === 1) return;
      //     const { data } = _series[seriesIndex];
      //     const qq = data.map((d, i) => {
      //       return [xAxisData[i], d];
      //     });

      //     let string = '';
      //     qq.forEach((q, i) => {
      //       if (i === 1) return;
      //       const [name, value] = q;
      //       string += `${marker} <b>${name}</b> ${value} <br/>`;
      //     });

      //     return `<b>${seriesName}</b><br/>${string}`;
      //   },
      // },
      dataZoom: [
        {
          type: 'inside',
          startValue: zoomStartValue ? xAxisEndIndex - zoomStartValue - 1 : 0,
          endValue: xAxisEndIndex,
          zoomLock: true,
        },
      ],

      series: _series,
    });
  }, [zoomStartValue]);

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

export default PWStackedBarChart;
