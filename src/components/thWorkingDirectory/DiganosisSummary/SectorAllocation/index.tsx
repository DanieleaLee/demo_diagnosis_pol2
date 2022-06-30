import { css, SerializedStyles } from "@emotion/react";
import HelpTooltip from "@components/molecules/HelpTooltip";
import TreemapChartSimple from "@components/customCharts/TreemapChartSimple";
import * as Typography from "@styles/typography";

const SectorAllocationContainerStyle = css`
  /* padding-top: 22px; */
`;
const titleContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 7.17px;
`;

type SectorAllocationProps = {
  treemapData: {
    name: string;
    value: number;
  }[];
  chartContainerCss?: SerializedStyles;
};

const SectorAllocation = ({ treemapData, chartContainerCss }: SectorAllocationProps) => {
  const colorSet = [
    "#284CCD",
    "#294B70",
    "#3B77E6",
    "#4BADC4",
    "#5CC9BB",
    "#7958DC",
    "#A793E4",
    "#A9E3EF",
    "#D3C3FF",
    "#E0F3FF",
  ];
  return (
    <div css={SectorAllocationContainerStyle}>
      <span css={titleContainerStyle}>
        <Typography.Body2 color="#2F3B43" lineHeight="15.73px">
          Sector Allocation
        </Typography.Body2>
        <HelpTooltip
          size={14}
          title="Sector Allocation"
          description="The size of area indicates exposure of my portfolio to each sector (sum of sector belongs to portfolio holdings is 100% normalized)"
          tooltipBoxCss={css`left: 7px;top: 8px;`} // prettier-ignore
        />
      </span>
      <TreemapChartSimple
        isLoading={false}
        rowData={treemapData}
        color={colorSet}
        containerCss={[css`margin-top:15px;`,chartContainerCss]} // prettier-ignore
      />
    </div>
  );
};

export default SectorAllocation;