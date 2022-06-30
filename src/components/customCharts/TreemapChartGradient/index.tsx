import EchartBase from "@components/molecules/Echarts/Base";
import { EChartsOption, SeriesOption } from "echarts/types/dist/echarts";
import { css, SerializedStyles } from "@emotion/react";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import * as echarts from "echarts";

const containerWrapper = css``;

interface TreeNode {
  name: string;
  id: string;
  value: number[];
  children?: TreeNode[];
}

export interface TreemapChartGradientProps {
  isLoading?: boolean;
  animation?: boolean;
  color?: string[];
  fontSize?: number;
  title?: string;
  subtitle?: string;
  containerCss?: SerializedStyles;
  rowData?: TreeNode[];
  visualDimension?: number;
  tooltipFormatter?: (info: any) => string;
}

export function isValidNumber(num: number) {
  return num != null && isFinite(num);
}

/**
 * /molecules/Echarts/TreemapChartGradient
 *
 */
const TreemapChartGradient = ({
  rowData = [],
  animation = true,
  color,
  fontSize,
  subtitle,
  title,
  containerCss,
  isLoading = true,
  visualDimension,
  tooltipFormatter,
  ...props
}: TreemapChartGradientProps) => {
  const defaultOpt: EChartsOption = {
    animation,
    title: {
      text: title,
      subtext: subtitle,
      padding: 0,
      left: 0,
    },
    // TODO) formatter 함수 props로 받도록
    tooltip: {
      formatter: tooltipFormatter,
    },
  };

  const [opt, setOpt] = useState(defaultOpt);

  useEffect(() => {
    const _series: SeriesOption[] = [
      {
        name: "ALL",
        // top: 40,
        type: "treemap",
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
        visualMin: -100,
        visualMax: 100,
        visualDimension: visualDimension,
        levels: [
          {
            itemStyle: {
              borderWidth: 1.5,
              borderColor: "#2F3B43",
              gapWidth: 1,
            },
          },
          {
            color: ["#ed6565df", "#ffffffcf", "#0A79C1"],
            
            colorMappingBy: "value",
            itemStyle: {
              borderColor: "#2F3B43",
              gapWidth: 0.5,
            },
          },
        ],
        data: rowData,
      },
    ];
    setOpt({
      ...defaultOpt,
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

export default TreemapChartGradient;
