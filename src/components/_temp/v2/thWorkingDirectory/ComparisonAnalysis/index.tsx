import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import * as Typography from "@styles/typography";
import BasicBox from "@components/atoms/BasicBox";
import SelectPortfolioInfo from "./SelectPortfolioInfo";
import MajorImpactScoreComp from "./MajorImpactScoreComp";
import ChangeDetails from "./ChangeDetails";
import {  testData } from "./ChangeDetails/data";
import DiagnosisComparison from "./DiagnosisComparison";

const SCORE_DATA = [
  { name: "My Portfolio", scores: { Inflation: -70, VIX: 10, Turnaround: -90 } },
  { name: "S&P 500", scores: { Inflation: -70, VIX: 25, Turnaround: 80 } },
  { name: "DJI", scores: { Inflation: 50, VIX: 65, Turnaround: -20 } },
  { name: "Russell 2000", scores: { Inflation: -50, VIX: 10, Turnaround: -90 } },
];
const MY_SCORE_DATA = { Inflation: -70, VIX: 10, Turnaround: -90 };
const ALL_DATA = [
  {
    id: "portfolio1",
    optionText: "Overlaid Portfolio1 (Asset Class Fixed)",
    description: {
      holings: 46,
      turnover: "65%",
      text: "The purpose of “Asset Class Fixed” is not only to overlay what you selected Layer also to minimize exposure change of sector between original Portfolio and Overlaid Portfolio.",
    },
    score: { Inflation: -70, VIX: 25, Turnaround: 80 },
  },
  {
    id: "portfolio2",
    optionText: "Overlaid Portfolio2 (Sector Fixed)",
    description: {
      holings: 36,
      turnover: "55%",
      text: "The purpose of “Sector Fixed” is not only to overlay what you selected Layer also to minimize exposure change of sector between original Portfolio and Overlaid Portfolio.",
    },
    score: { Inflation: 50, VIX: 15, Turnaround: -90 },
  },
  {
    id: "portfolio3",
    optionText: "Overlaid Portfolio3 (FactorFixed)",
    description: {
      holings: 26,
      turnover: "45%",
      text: 'The purpose of "Factor Fixed” is not only to overlay what you selected Layer also to minimize exposure change of sector between original Portfolio and Overlaid Portfolio.',
    },
    score: { Inflation: 70, VIX: 25, Turnaround: -80 },
  },
  {
    id: "portfolio4",
    optionText: "Overlaid Portfolio4",
    description: {
      holings: 16,
      turnover: "35%",
      text: "The purpose of “ZZZZZZ” is not only to overlay what you selected Layer also to minimize exposure change of sector between original Portfolio and Overlaid Portfolio.",
    },
    score: { Inflation: 30, VIX: 75, Turnaround: 20 },
  },
];

const titleStyle = css`margin-bottom:10px;` // prettier-ignore
const upperContainerStyle = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;
const lowerContainerStyle = css``;
const leftContainerStyle = css`width: 324px;margin-top: 28px;`; // prettier-ignore
const rightContainerStyle = css``; // prettier-ignore

const ComparisonAnalysis = () => {
  const [selected, setSelected] = useState("portfolio1");
  const [data, setData] = useState({});
  const [cdRowData, setCdRowData] = useState([]);

  const options = ALL_DATA.map((el) => ({ id: el.id, text: el.optionText }));

  useEffect(() => {
    const temp = {};
    ALL_DATA.forEach((el) => {
      temp[el.id] = { ...el };
    });
    setData(temp);
  }, []);

  const selectHandle = (name: string) => {
    setSelected(name);
  };
  useEffect(() => {
    const origin = testData.original;
    const selectPort = testData[selected];

    // data convert
    let temp = {};
    origin.forEach((d) => (temp[d.ticker] = { original: d.score }));
    selectPort.forEach((d) => (temp[d.ticker] = { ...temp[d.ticker], afterLayered: d.score }));

    const convertData = [];
    for (const ticker in temp) {
      const res = {
        ticker: ticker,
        original: temp[ticker].original ? temp[ticker].original : 0,
        afterLayered: temp[ticker].afterLayered ? temp[ticker].afterLayered : 0,
      };
      convertData.push(res);
    }
    setCdRowData(convertData);
  }, [selected]);

  // const cdRowData = changeDetailRowData.original.map((el, i) => {
  //   return { ...el, ...changeDetailRowData[selected][i] };
  // });
  // console.log(cdRowData);

  return (
    <>
      <Typography.Subtitle4 css={titleStyle} lineHeight={1}>
        Comparison Analysis
      </Typography.Subtitle4>
      {Object.keys(data).length > 0 && (
        <BasicBox
          width={865}
          height={719}
          borderColor="#CED9E1"
          paddingTop={14}
          paddingBottom={17}
          paddingLeft={24}
          paddingRight={24}
        >
          <div css={upperContainerStyle}>
            <div css={leftContainerStyle}>
              <SelectPortfolioInfo options={options} onChange={selectHandle} description={data[selected].description} />
              <MajorImpactScoreComp
                scoreData={SCORE_DATA}
                myScore={MY_SCORE_DATA}
                selectedScore={data[selected].score}
              />
            </div>
            <div css={rightContainerStyle}>
              <ChangeDetails rowData={cdRowData} />
            </div>
          </div>
          <div css={lowerContainerStyle}>
            <DiagnosisComparison />
          </div>
        </BasicBox>
      )}
    </>
  );
};
export default ComparisonAnalysis;
