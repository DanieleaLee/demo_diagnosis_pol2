import React, { useState } from "react";
import { css } from "@emotion/react";
import * as Typography from "@styles/typography";
import BasicBox from "@components/atoms/BasicBox";
import SingleScoreChart from "@components/customCharts/SingleScoreChart";
import { BiChevronsRight } from "react-icons/bi";
import DiagnosisPieChart from "./DiagnosisPieChart";

const titleContainerStyle = css`margin-bottom: 12px;`; // prettier-ignore
const boxContainerStyle = css`display:flex; justify-content:space-between;` // prettier-ignore

const selectStyle = css`
  width: 153px;
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

const pieContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
`;
const pieLableContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 18px;
`;
const pieLabelStyle = css`
  width: 144px;
  text-align: center;
`;

const scoreContainerStyle = css`
  display: flex;
  padding: 0 18px;
  justify-content: space-between;
  align-items: center;
  margin-top: 38px;
  margin-bottom: 17px;
`;

const scoreWrapStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 해당 컴포넌트는 select portfolio에 의한 동작 미적용
// 내부 select에 의한 동작 미적용
// TODO
// 1. 파이차트 만들어야 함
// 2. overlaid portfolio 선택시 바뀌는 데이터 적용
// 3. 좌측 select 변경 시 동작 정의(secotr-pie chart/facotr-radar chart/ assetclass - piechart)
// 4. 우측 select option list 정의(현재 inflation, vix, Turnaround 3개만 추개 해놓음)
const DiagnosisComparison = ({ myData, selectedData }) => {
  const [selectedOption, setselectedOption] = useState(0);

  const selectedLayer = myData.myScores[selectedOption][0];
  const selectedLayerScore = selectedData.score.filter((s) => s.name === selectedLayer)[0].value;

  return (
    <div>
      <Typography.Body2 color="#2F3B43" css={titleContainerStyle} lineHeight="15.73px">
        Diagnosis Comparison
      </Typography.Body2>
      <div css={boxContainerStyle}>
        <BasicBox
          width={405}
          height={271}
          borderColor="#CED9E1"
          paddingTop={10}
          paddingBottom={20}
          paddingLeft={11}
          paddingRight={11}
        >
          <select css={selectStyle} name="diagnosis common">
            <option value="Sector">Sector</option>
            <option value="Factor">Factor</option>
            <option value="Asset-Class">Asset-Class</option>
          </select>

          <div css={pieContainerStyle}>
            <DiagnosisPieChart
              isLoading={false}
              name={"My Sector"}
              data={myData.mySectorData}
              containerCss={css`width: 180px;height: 180px;`} // prettier-ignore
            />
            <BiChevronsRight
              css={css`
                position: absolute;
                left: 184px;
              `}
              size={40}
              color={"#94A1A9"}
            />
            <DiagnosisPieChart
              isLoading={false}
              name={"Inflation"}
              data={selectedData.sector}
              containerCss={css`width: 180px;height: 180px; `} // prettier-ignore
            />
          </div>
          <div css={pieLableContainerStyle}>
            <Typography.Body2 color="#3478BC" css={pieLabelStyle} lineHeight="15.73px">
              Before Layered
            </Typography.Body2>

            <Typography.Body2 color="#3478BC" css={pieLabelStyle} lineHeight="15.73px">
              After Layered
            </Typography.Body2>
          </div>
        </BasicBox>
        <BasicBox
          width={405}
          height={271}
          borderColor="#CED9E1"
          paddingTop={10}
          paddingBottom={20}
          paddingLeft={11}
          paddingRight={11}
        >
          {/* layer 목록 받아야 할듯 */}
          <select css={selectStyle} name="diagnosis layer" onChange={(e) => setselectedOption(Number(e.target.value))}>
            {myData.myScores.map((s, i) => (
              <option key={s[0]} value={i}>
                {s[0]}
              </option>
            ))}
          </select>
          <div css={scoreContainerStyle}>
            <div css={scoreWrapStyle}>
              <SingleScoreChart
                isLoading={false}
                value={myData.myScores[selectedOption][1]}
                name={"Before Layered"}
                fontSize={40}
                lineWidth={10.5}
                containerCss={css`height: 144px;width: 144px;`} // prettier-ignore
              />
            </div>
            <BiChevronsRight size={40} color={"#94A1A9"} />

            <div css={scoreWrapStyle}>
              <SingleScoreChart
                isLoading={false}
                value={selectedLayerScore}
                name={"After Layered"}
                fontSize={40}
                lineWidth={10.5}
                containerCss={css`height: 144px;width: 144px;`} // prettier-ignore
              />
            </div>
          </div>
          <div css={pieLableContainerStyle}>
            <Typography.Body2 color="#3478BC" css={pieLabelStyle} lineHeight="15.73px">
              Before Layered
            </Typography.Body2>

            <Typography.Body2 color="#3478BC" css={pieLabelStyle} lineHeight="15.73px">
              After Layered
            </Typography.Body2>
          </div>
        </BasicBox>
      </div>
    </div>
  );
};

export default DiagnosisComparison;