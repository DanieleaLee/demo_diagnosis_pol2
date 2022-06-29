import { ChartProps } from "@components/molecules/Echarts/Base";
import { ClipLoader } from "react-spinners";
import { css, SerializedStyles } from "@emotion/react";
import EchartBase from "@components/molecules/Echarts/Base";
import { useState, useEffect } from "react";
import { EChartsOption } from "echarts/types/dist/echarts";
import Colors from "@styles/colors";

export type DiagnosisPieChartProps = ChartProps & {};

const containerWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface SingleScoreChartProps {
  isLoading?: boolean;
  animation?: boolean;
  title?: string;
  subtitle?: string;
  containerCss?: SerializedStyles;
  name?: string;
  data?: { value: number; name: string }[];
}
const DiagnosisPieChart = ({
  animation = true,
  subtitle,
  title,
  containerCss,
  isLoading = true,
  name = "single score chart",
  data,
}: SingleScoreChartProps) => {
  const defaultOpt: EChartsOption = {
    backgroundColor: "rgba(111,111,111,0)",
    color: [Colors.semanticGraph1, Colors.semanticGraph2, Colors.semanticGraph3],
    animation,
    title: {
      text: title,
      subtext: subtitle,
      padding: 0,
      left: 0,
    },
    tooltip: {
      trigger: "item",
    },

    series: [
      {
        name: name,
        type: "pie",
        radius: ["45%", "80%"],
        label: { show: false },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  const [opt, setOpt] = useState(defaultOpt);

  useEffect(() => {
    setOpt({
      ...opt,
      series: [
        {
          ...opt.series[0],
          data: data,
        },
      ],
    });
  }, [data]);

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

export default DiagnosisPieChart;
