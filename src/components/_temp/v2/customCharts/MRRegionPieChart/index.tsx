import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";
import { ChartProps } from "@components/molecules/Echarts/Base";
import EchartBase from "@components/molecules/Echarts/Base";
import Colors from "@styles/colors";
import { useLoadingCallback } from "src/lib/hooks/useLoadingCallback";
import { EChartsOption } from "echarts/types/dist/echarts";
import { flexCenter } from "@styles";

const MRRegionPieChartContainerCss = css`
  ${flexCenter}
`;

export type MRRegionPieChartProps = ChartProps & {};

const fetchMRRegionData = async (opt: EChartsOption) => {
  const { data } = await new Promise((resolve, _) => {
    setTimeout(() => {
      resolve({
        data: [
          { value: 0.4, name: "Europe" },
          { value: 0.2, name: "Asia" },
          { value: 0.4, name: "North America" },
        ],
      });
    }, 1000);
  });
  return data;
};

const MRRegionPieChart = ({ ...props }: MRRegionPieChartProps) => {
  const defaultOpt: EChartsOption = {
    color: [
      Colors.semanticGraph1,
      Colors.semanticGraph2,
      Colors.semanticGraph3,
    ],
    title: {
      text: "Region",
      top: 10,
      right: 14,
      textStyle: {
        color: Colors.selectCategoryAmountBg,
        fontSize: 13,
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      show: true,
      orient: "vertical",
      left: "right",
      top: "bottom",
      itemGap: 6,
      formatter: (name) => `${name.split("\n")[0]}`,
      textStyle: {
        color: "black",
        fontSize: 8,
      },
      itemWidth: 0,
      width: "20%",
    },
    series: [
      {
        name: "Region",
        type: "pie",
        radius: ["25%", "40%"],
        data: [],
        label: {
          show: true,
          color: Colors.selectCategoryAmountBg,
          fontSize: 11,
          fontWeight: 500,
          align: "left",
          edgeDistance: 30,
          formatter: "{d}%\n{b}",
          width: 100,
          lineHeight: 15,
          overflow: "truncate",
          // width: 'auto',
          // lineStyle:{color:'white'}
        },
        labelLayout: {
          // align: 'left'
        },
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
  const { callback: loadChart, isLoading } = useLoadingCallback(async () => {
    const data = await fetchMRRegionData(opt);
    setOpt({
      ...opt,
      series: [
        {
          ...opt.series[0],
          data,
        },
      ],
    });
  }, []);

  useEffect(() => {
    loadChart();
  }, []);

  return (
    <div css={[MRRegionPieChartContainerCss, props.containerCss]}>
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

export default MRRegionPieChart;
