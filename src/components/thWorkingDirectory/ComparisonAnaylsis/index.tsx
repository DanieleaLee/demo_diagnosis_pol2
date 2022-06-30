import React, { useState } from "react";
import { css } from "@emotion/react";
import BasicBox from "@components/atoms/BasicBox";
import SelectPortfolioInfo from "./SelectPortfolioInfo";
import MajorImpactScoreComp from "./MajorImpactScoreComp";
import ChangeDetails from "./ChangeDetails";
import DiagnosisComparison from "./DiagnosisComparison";
import overlayresults_summary from "../../../data/overlay_demo/Demoport2_tilit8_overlayresults_summary.json"; //
import portfolio1_table_data from "../../../data/overlay_demo/Demoport2_tilit8_changedetailtable_portfolio1.json";
import portfolio4_table_data from "../../../data/overlay_demo/Demoport2_tilit8_changedetailtable_portfolio4.json";
import portfolio1_pie_sector_data from "../../../data/overlay_demo/Demoport2_tilit8_portfolio1_piechart_sector.json";
import portfolio4_pie_sector_data from "../../../data/overlay_demo/Demoport2_tilit8_portfolio4_piechart_sector.json";
import portfolio1_score_data from "../../../data/overlay_demo/Demoport2_tilit8_portfolio1_score chart.json";
import portfolio4_score_data from "../../../data/overlay_demo/Demoport2_tilit8_portfolio4_score chart.json";

const TABLE_DATA = {
  portfolio1: portfolio1_table_data,
  portfolio2: portfolio4_table_data,
  portfolio3: portfolio1_table_data,
  portfolio4: portfolio4_table_data,
};
const SECTOR_PIE_DATA = {
  portfolio1: portfolio1_pie_sector_data,
  portfolio2: portfolio4_pie_sector_data,
  portfolio3: portfolio1_pie_sector_data,
  portfolio4: portfolio4_pie_sector_data,
};
const SCORE_DATA = {
  portfolio1: portfolio1_score_data,
  portfolio2: portfolio4_score_data,
  portfolio3: portfolio1_score_data,
  portfolio4: portfolio4_score_data,
};

const upperContainerStyle = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;
const lowerContainerStyle = css``;
const leftContainerStyle = css`width: 324px;margin-top: 28px;`; // prettier-ignore
const rightContainerStyle = css``; // prettier-ignore

const ComparisonAnalysis = ({ myTopScoreData, mySectorData }) => {
  const [selected, setSelected] = useState("portfolio1");

  const { Strengths, Weaknesses } = myTopScoreData;
  const _strengths = Object.entries(Strengths as { [s: string]: number }).sort(([, a], [, b]) => b - a);
  const _weaknesses = Object.entries(Weaknesses as { [s: string]: number }).sort(([, a], [, b]) => b - a);
  const myStrengthTop2 = _strengths.slice(0, 2);
  const myWeaknessTop1 = _weaknesses.slice(-1);
  const myTreeScores = [...myStrengthTop2, ...myWeaknessTop1]; // 최고 2개 최저 1개

  const selectOptions = overlayresults_summary.map((el) => ({ id: el.id, text: el.optionText }));
  const selectedData = overlayresults_summary.filter((d) => d.id === selected)[0];

  console.log('overlayresults_summary :', overlayresults_summary)

  const selectHandle = (name: string) => {
    console.log('name : ', name)
    setSelected(name);
  };

  return (
    <>
      <div>
        <BasicBox
          width={865}
          height={719}
          borderColor="#ECECEC"
          paddingTop={14}
          paddingBottom={17}
          paddingLeft={24}
          paddingRight={24}
        >
          <div css={upperContainerStyle}>
            <div css={leftContainerStyle}>
              <SelectPortfolioInfo
                options={selectOptions}
                onChange={selectHandle}
                description={selectedData.description}
              />
              <MajorImpactScoreComp myScore={myTreeScores} selectedScore={selectedData.score} />
            </div>
            <div css={rightContainerStyle}>
              <ChangeDetails rowData={TABLE_DATA[selected]} />
            </div>
          </div>
          <div css={lowerContainerStyle}>
            <DiagnosisComparison
              myData={{ mySectorData, myScores: myTreeScores }}
              selectedData={{ sector: SECTOR_PIE_DATA[selected], score: SCORE_DATA[selected] }}
            />
          </div>
        </BasicBox>
      </div>
    </>
  );
};
export default ComparisonAnalysis;