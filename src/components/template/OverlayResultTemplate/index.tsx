import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import React from "react";
import * as TextButton from "@components/atoms/TextButton";
import Colors from "@styles/colors";
import ComparisonAnalysis from "@components/thWorkingDirectory/ComparisonAnaylsis";
import * as Typography from "@styles/typography";
import PfOverlayChartPerformance from "@lucian2Components/organisms/PfOverlayChartPerformance";
import PfOverlayFilterBox from "@lucian2Components/organisms/PfOverlayFilterBox/index";
import { ContentsType } from "@lucian2Components/organisms/PfOverlayFilterBox/index";
import { PFOVERLAY_DUMMAY_DATA } from "@lucian2Components/Dummy";
import { BODY_BUTTONS_HEIGHT } from "src/config/constants";
import diagnosisData from "../../../data/diagnosis";
import linechartData from "../../../data/Demoport2_tilit8_line_chart.json";
import tableData from "../../../data/overlay_demo/Demoport2_tilit8_performance_table.json";
import { useRouter } from "next/router";

const UniverseInfo = {
  title: "Investment Universe",
  label: ["Number of Index", 4],
  assetClass: {
    Equity: 10,
    "Fixled Income": 20,
    Commodity: 10,
  },
  economicDev: {
    "Blended Development": 60,
    "Developed Markets": 20,
    "Emerging Markets": 10,
    "Frintier Markets": 10,
  },
};

export type AAPortfolioPipelinePageProps = {
  portfolioName: string;
  initialStep: string;
};

// 알맹이 wrap 그린
export const bodyContainerWrap = (width, height, bgColor, blColor) => css`
  width: ${width};
  height: ${height};
  background-color: ${bgColor};
  /* border: 1px solid ${blColor}; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  overflow-x: scroll;
  @media (max-width: 1852px) {
    align-items: flex-start;
    /* background-color: blue; */
  }
`;

export const bodyHeadWrap = (width) => css`
  width: ${width};
  height: ${BODY_BUTTONS_HEIGHT};
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  > p {
    padding-bottom: 30px; // SubTitle : Overlay
  }
`;

export const bodyHeadIcon = (width) => css`
  width: ${width};
  /* background-color: red; */
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  padding-bottom: 3px; // 버튼들 살짝 띄우기
`;

// 옐로 - 스크롤
export const bodyMainWrap = (
  width = "100%",
  height = "100%",
  bgColor,
  blColor,
  paddingTop = "0px",
  paddingRight = "0px",
  paddingBottom = "0px",
  paddingLeft = "0px"
) => css`
  width: ${width};
  min-width: 1852px;
  height: ${height};
  background-color: ${bgColor};
  /* border: 1px solid ${blColor}; */
  padding-top: ${paddingTop};
  padding-right: ${paddingRight};
  padding-bottom: ${paddingBottom};
  padding-left: ${paddingLeft};
  padding-left: ${paddingLeft};
  display: flex;
  flex-direction: row;
  justify-content: center; // 이놈이 문제
  overflow-y: scroll;
  overflow-x: hidden;
  /* overflow-x: scroll; */
  @media (max-width: 1852px) {
    justify-content: flex-start;
    /* background-color: blue; */
  }
  /* overflow-x: scroll; */
`;

export const bodyMain = (width) => css`
  width: ${width};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* border: 1px solid purple; */
`;

export const bodyItem = css``;

const OverlayConfigTemplate = ({ portfolioName }) => {
  console.log('OverlayResultTemplate portfolioName : ', portfolioName)
  const router = useRouter();
  const myTopScoreData = diagnosisData['portfolio2']?.summary.topScores;
  const mySectorData = diagnosisData['portfolio2']?.summary.sector;
  
  const [data, setData] = useState([]);
  // simulate 버튼 눌렀을 때 show handling state
  const [showChart, setShowChart] = useState(true);

  const [contents, setContents] = useState<ContentsType>({
    period: {
      startDate: "",
      endDate: "",
    },
    cost: "",
    benchmark: "Benchmark",
    rebalancing: "",
  });
  
  const showChartHandler = () => {
    setShowChart(true);
  };

  useEffect(() => {
    setData(PFOVERLAY_DUMMAY_DATA);
  }, []);

  const boxTitleStyle = css`
    position: absolute;
    z-index: 30;
    top: 43px;
  `;

  return (
    <div css={bodyContainerWrap("100%", "100%", Colors.backgroundPrimary1, "")}>
      <div css={[bodyHeadWrap("1852px")]}>
        <Typography.Subtitle4 color={"#838B8F"}>Overlay Result</Typography.Subtitle4>
        <div css={[bodyHeadIcon("540px")]}>
          <TextButton.Small title="Prev" disabled={false} bgTheme="accent" onClick={() => router.push("/overlayconfig")} />
          <TextButton.Small title="Save My Portfolio" disabled={false} bgTheme="common" onClick={() => {}} />
        </div>
      </div>

      <div css={[bodyMainWrap("100%", "100%", "", "yellow")]}>
        <div css={[bodyMain("1852px")]}>
          <div css={[bodyItem]}>
            <Typography.Subtitle4 css={boxTitleStyle} lineHeight={1}>
              Comparison Analysis
            </Typography.Subtitle4>
            { myTopScoreData && mySectorData &&
              <ComparisonAnalysis myTopScoreData={myTopScoreData} mySectorData={mySectorData}/>
            }
          </div>

          <div css={[bodyItem]}>
            <PfOverlayFilterBox
              data={data}
              contents={contents}
              setContents={setContents}
              showChart={showChart}
              showChartHandler={showChartHandler}
            />
            <span
              css={css`
                margin-top: 13px;
              `}
            ></span>
            <PfOverlayChartPerformance 
              data={data} 
              linechartData={linechartData} 
              tableData_={tableData} 
              contents={contents} 
              showChart={showChart} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverlayConfigTemplate;
