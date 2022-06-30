import React from "react";
import { css } from "@emotion/react";
import BasicBox from "@components/atoms/BasicBox";
import * as Typography from "@styles/typography";
import { BiFileFind } from "react-icons/bi";
import HelpTooltip from "@components/molecules/HelpTooltip";
import RadarChartSimple from "@components/customCharts/RadarChartSimple";
import StockDiagnosisBoxes from "@components/template/DiagnosisTemplate/customComponents/GicsSectors/StockDiagnosisBoxes";
import HorizontalBarChart from "@components/customCharts/HorizontalBarChart";

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
  const { bar, top_exposure, radar } = data;

  return (
    <div id="QRAFT Factors">
      <BasicBox borderColor="#CED9E1" paddingTop={28} paddingRight={35} paddingBottom={35} paddingLeft={35}>
        <Typography.Subtitle2 color="#2F3B43" lineHeight="18.15px">
          Stock Diagnosis - QRAFT Factors
          <BiFileFind
            size={17}
            css={css`
              margin-left: 7px;
            `}
          />
        </Typography.Subtitle2>
        <Typography.Body5
          color="#9DA6AD"
          lineHeight="12.89px"
          css={css`
            margin-top: 10px;
            margin-bottom: 20px;
            width: 750px;
          `}
        >
          QRAFT Factors have historically demonstrated excess market returns over the long run. The higher score is
          better than lower score . (Range: 0 ~ 5) Factors - Momentum, Value, Volatility, Growth, Profitability
        </Typography.Body5>
        <span css={titleContainerStyle}>
          <Typography.Body2 color="#2F3B43" lineHeight="15.73px">
            Factor - Top Exposure
          </Typography.Body2>
          <HelpTooltip
            size={14}
            title="Top Exposure"
            description="Dummy"
            tooltipBoxCss={css`left: 7px;top: 8px;`} // prettier-ignore
          />
        </span>
        <div
          css={css`
            height: 560px;
            width: 100%;
            margin-bottom: 27px;
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
            <StockDiagnosisBoxes data={top_exposure} height={99} />
          </div>

          <BasicBox borderColor="#CED9E1" width={858} height={532} borderRadius={4}>
            <RadarChartSimple
              isLoading={false}
              rowData={radar.data}
              indicatorOpt={radar.indicator}
              // // color={['#41829E', '#6E308B', '#C69DD9','#AF947A','#9E1A81']}
              containerCss={css`width: 100%;height: 100%;padding-top:26px;`} // prettier-ignore
            />
          </BasicBox>
        </div>
        <div
          css={css`
            margin-bottom: 10px;
          `}
        >
          <select css={selectStyle} name="pets" id="pet-select">
            <option value="">Benchmark: S&P 500</option>
            {/* <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="hamster">Hamster</option>
            <option value="parrot">Parrot</option>
            <option value="spider">Spider</option>
            <option value="goldfish">Goldfish</option> */}
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
