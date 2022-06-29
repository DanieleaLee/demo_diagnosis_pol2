import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";
import { ChartProps } from "@components/molecules/Echarts/Base";
import EchartBase from "@components/molecules/Echarts/Base";
import Colors from "@styles/colors";
import { flexCenter } from "@styles";
import { useLoadingCallback } from "src/lib/hooks/useLoadingCallback";
import { EChartsOption } from "echarts/types/dist/echarts";

const MRIndexPieChartContainerCss = css`
  ${flexCenter};
`;

export type MRIndexPieChartProps = ChartProps & {};

const fetchIndexData = async (opt: EChartsOption) => {
  const { data } = await new Promise((resolve, _) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            value: 0.5,
            name: "Equity, U.S\nLarge CAp(VTI)",
          },
          {
            value: 0.4,
            name: "Bond U.S\nLong-Term(TLT)",
          },
          {
            value: 0.1,
            name: "Commodity,\nBroad\nDiversified (GSG)",
          },
        ],
      });
    }, 1000);
  });
  return data;
};

const MRIndexPieChart = ({ ...props }: MRIndexPieChartProps) => {
  const defaultOpt: EChartsOption = {
    color: [
      Colors.semanticGraph1,
      Colors.semanticGraph2,
      Colors.semanticGraph3,
    ],
    title: {
      text: "Index",
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
        name: "Index",
        type: "pie",
        radius: ["25%", "40%"],
        data: [],
        label: {
          show: true,
          color: Colors.selectCategoryAmountBg,
          fontSize: 11,
          fontWeight: 500,
          alignTo: "edge",
          align: "left",
          edgeDistance: 10,
          formatter: "{d}%\n{b}",
          width: 100,
          lineHeight: 15,
          overflow: "truncate",
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
  const { callback: loadIndexChart, isLoading } =
    useLoadingCallback(async () => {
      const data = await fetchIndexData(opt);
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
    loadIndexChart();
  }, []);

  return (
    <div css={[MRIndexPieChartContainerCss, props.containerCss]}>
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

export default MRIndexPieChart;
