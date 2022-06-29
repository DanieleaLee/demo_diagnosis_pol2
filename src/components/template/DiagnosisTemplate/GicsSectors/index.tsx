import React from "react";
import { css } from "@emotion/react";
import BasicBox from "@components/atoms/BasicBox";
import * as Typography from "@styles/typography";
import { BiFileFind } from "react-icons/bi";
import HelpTooltip from "@components/molecules/HelpTooltip";
import TreemapChartGradient, { isValidNumber } from "src/components/_temp/v2/customCharts/TreemapChartGradient";
import { convertData } from "src/components/_temp/v2/customCharts/TreemapChartGradient/convertData";
import StockDiagnosisBoxes from "@lucian2Components/molecules/StockDiagnosisBoxes";
import HorizontalBarChart from "src/components/_temp/v2/customCharts/HorizontalBarChart";
import { BiChip, BiDonateHeart, BiLineChart, BiPieChart, BiShuffle } from "react-icons/bi";

const StockDiagnosisBoxesData = [
  {
    id: 1,
    icon: <BiChip size={18.33} color="#484848" />,
    subject: "Momentum",
    subData: [
      {
        id: 1,
        title: "APPL",
        subTitle: "Apple Inc.",
      },
      {
        id: 2,
        title: "MSFT",
        subTitle: "Microsoft Corporation",
      },
      {
        id: 3,
        title: "NVDA",
        subTitle: "NVIDIA Corporation",
      },
    ],
  },
  {
    id: 2,
    icon: <BiLineChart size={18.33} color="#484848" />,
    subject: "Growth",
    subData: [
      {
        id: 1,
        title: "V",
        subTitle: "Visa Inc.",
      },
      {
        id: 2,
        title: "MA",
        subTitle: "Mastercard Incorporated",
      },
      {
        id: 3,
        title: "JPM",
        subTitle: "JPMorgan Chase & Co.",
      },
    ],
  },
  {
    id: 3,
    icon: <BiPieChart size={18.33} color="#484848" />,
    subject: "Dividend",
    subData: [
      {
        id: 1,
        title: "GOOG",
        subTitle: "Alphabet Inc.",
      },
      {
        id: 2,
        title: "FB",
        subTitle: "Meta Platforms, Inc",
      },
      {
        id: 3,
        title: "DIS",
        subTitle: "The Wwalt Disney Company",
      },
    ],
  },
  {
    id: 4,
    icon: <BiShuffle size={18.33} color="#484848" />,
    subject: "Volatility",
    subData: [
      {
        id: 1,
        title: "TICK1",
        subTitle: "Ticker1 Name",
      },
      {
        id: 2,
        title: "TICK2",
        subTitle: "Ticker2 Name",
      },
      {
        id: 3,
        title: "TICK3",
        subTitle: "Ticker3 Name",
      },
    ],
  },
  {
    id: 5,
    icon: <BiDonateHeart size={18.33} color="#484848" />,
    subject: "Value",
    subData: [
      {
        id: 1,
        title: "TICK1",
        subTitle: "Ticker1 Name",
      },
      {
        id: 2,
        title: "TICK2",
        subTitle: "Ticker2 Name",
      },
      {
        id: 3,
        title: "TICK3",
        subTitle: "Ticker3 Name",
      },
    ],
  },
];

const titleContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 7.17px;
  margin-bottom: 10px;
`;

const selectStyle = css`
  width: 238px;
  height: 26px;
  border: 1px solid #9da6ad;
  border-radius: 4px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #5b6266;
`;

const GigsSectors = ({ data }) => {
  const { top_exposure, bar, treemap } = data;
  const gradData = convertData(treemap, 3);

  const treemapformatter = function (info: any) {
    const { value } = info;

    const weight = isValidNumber(value[1]) ? value[1] + "%" : "-";
    const yearReturn = isValidNumber(value[3]) ? value[3] + "%" : "-";

    return [
      '<div class="tooltip-title">' + info.name + "</div>",
      "Weight: &nbsp;&nbsp;" + weight + "<br>",
      "1Y  Retrun: &nbsp;&nbsp;" + yearReturn,
    ].join("");
  };

  return (
    <div id="GICS® Sectors">
      <BasicBox borderColor="#CED9E1" paddingTop={28} paddingRight={35} paddingBottom={35} paddingLeft={35}>
        <Typography.Subtitle2 color="#2F3B43" lineHeight="18.15px">
          Stock Diagnosis - GICS® Sectors
          <BiFileFind
            size={17}
            css={css`
              margin-left: 7px;
            `}
          />
        </Typography.Subtitle2>
        <Typography.Body5
          color="#9DA6AD"
          lineHeight="13.31px"
          css={css`
            margin-top: 10px;
            margin-bottom: 20px;
            width: 1128px;
          `}
        >
          In 1999, MSCI and S&P Dow Jones Indices developed the Global Industry Classification Standard (GICS), seeking
          to offer an efficient investment tool to capture the breadth, depth and evolution of industry sectors. The
          GICS structure consists of 11 sectors - Energy, Materials, Industrials, Consumer Discretionary, Consumer
          Staples, Health Care, Financials, Information Technology, Communication Services, Utilities, Real Estate.
        </Typography.Body5>
        <div
          css={css`
            /* height: 560px; */
            width: 100%;
            padding-bottom: 27px;
            margin-bottom: 26px;
            border-bottom: 1px dashed #9fadb7;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          `}
        >
          <div
            css={css`
              width: 567px;
            `}
          >
            <span css={titleContainerStyle}>
              <Typography.Body2 color="#2F3B43" lineHeight="15.73px">
                Sector - Top Exposure
              </Typography.Body2>
              <HelpTooltip
                size={14}
                title="Top Exposure"
                description="Dummy"
                tooltipBoxCss={css`left: 7px;top: 8px;`} // prettier-ignore
              />
            </span>
            <StockDiagnosisBoxes data={top_exposure} height={99} />
          </div>

          <div
            css={css`
              width: 858px;
              height: 258px;
              padding-top: 26px;
            `}
          >
            <TreemapChartGradient
              isLoading={false}
              rowData={gradData}
              visualDimension={4}
              tooltipFormatter={treemapformatter}
              containerCss={css`width: 830px;height: 530px;`} // prettier-ignore
            />
          </div>
        </div>
        <div
          css={css`
            margin-bottom: 10px;
          `}
        >
          <select css={selectStyle} name="pets" id="pet-select">
            <option value="">Benchmark: S&P 500</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="hamster">Hamster</option>
            <option value="parrot">Parrot</option>
            <option value="spider">Spider</option>
            <option value="goldfish">Goldfish</option>
          </select>
        </div>
        <BasicBox height={494} borderColor="#CED9E1">
          <HorizontalBarChart
            isLoading={false}
            yAxisData={bar.yAxisData}
            rowData={bar.rowData}
            color={["#2D5885", "#3B77E6", "#82D2D9", "#3C89C5", "#4BADC4"]} // fixed horizontal bar chart color set
            containerCss={css`
              width: 100%;
              height: 100%;
              /* border: 1px solid black; */
              background-color: #fcfdfe;
              border-radius: 8px;
              padding-top: 20px;
              padding-bottom: 20px;
            `}
          />
        </BasicBox>
      </BasicBox>
    </div>
  );
};

export default GigsSectors;
