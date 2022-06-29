import EchartBase from "@components/molecules/Echarts/Base";
import { EChartsOption, SeriesOption } from "echarts/types/dist/echarts";
import { css, SerializedStyles } from "@emotion/react";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import echarts from "echarts";

const containerWrapper = css``;

export interface TreemapChartSimpleProps {
  isLoading?: boolean;
  animation?: boolean;
  color?: string[];
  fontSize?: number;
  title?: string;
  subtitle?: string;
  containerCss?: SerializedStyles | SerializedStyles[];
  rowData?: { name: string; value: number }[];
}

/**
 * 기본 Series 옵션.
 * */
export const defaultSeriesOpt: SeriesOption = {
  type: "treemap",
};

/**
 * /molecules/Echarts/TreemapChartSimple
 *
 */
const TreemapChartSimple = ({
  rowData = [],
  animation = true,
  color,
  fontSize,
  subtitle,
  title,
  containerCss,
  isLoading = true,
  ...props
}: TreemapChartSimpleProps) => {
  const defaultOpt: EChartsOption = {
    grid: {
      // left: 0,
      // right: 0,
      // bottom: 0,
      // top: 0,
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
      formatter: function (info) {
        let value = info.value;
        // return ['<div class="tooltip-title">' + echarts.format.encodeHTML(info.name) + '</div>', value].join('');
        return ['<div class="tooltip-title">' + info.name + "</div>", value].join("");
      },
    },
  };

  const [opt, setOpt] = useState(defaultOpt);

  useEffect(() => {
    const _series: SeriesOption[] = [
      {
        type: "treemap",
        name: "ALL",
        width: "100%",
        height: "100%",
        roam: false,
        nodeClick: false as any,
        breadcrumb: { show: false },
        label: {
          show: true,
          formatter: "{b}",
        },
        itemStyle: {
          borderColor: "black",
        },
        levels: [
          {
            color: color ? color : "none",
          },
        ],
        data: rowData,
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

export default TreemapChartSimple;
