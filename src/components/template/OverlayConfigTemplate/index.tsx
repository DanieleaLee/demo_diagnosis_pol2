import { css } from "@emotion/react";
import React, { useState, useEffect } from "react";
import Colors from "@styles/colors";
import * as Typography from "@styles/typography";
import { flexRow } from "@styles";
import { BODY_BUTTONS_HEIGHT } from "src/config/constants";
import _layerCandidatesData from "src/data/overlay_demo/Demoport2_Layer_candidates.json";
import diagnosisData from "src/data/diagnosis";
import * as TextButton from "@components/atoms/TextButton";
import DiagnosisSummary from "@components/thWorkingDirectory/DiganosisSummary";
import OverlayConfigSidebar from "./customComponents/OverlayConfigSidebar";
import OverlayInflationLayer from "./customComponents/OverlayInflationLayer";
import NewTechLayer from "./customComponents/NewTechLayer";
import { useRouter } from "next/router";

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

export const bodyItem = css`
  /* margin-right: 11px; */
`;

const boxTitleStyle = css`
  position: absolute;
  z-index: 30;
  top: 43px;
`;

export const flexRowStyle = css`
  ${flexRow}
`;

export type SidebarDataType = {
  id: number;
  title: string;
  lists: Array<{
    id: number;
    name: string;
    value: number;
  }> | string ;
};



const OverlayConfigTemplate = ({
  dataDiagnosis,
  dataOverlayConfig,
  setDataOverlayConfig,
  dataOverlayResult,
  setDataOverlayResult,
  portfolioName,
  setSelectedPortfolioName,
}) => {
  const router = useRouter();
  const data = diagnosisData[portfolioName]?.summary;
  const { factor, sector, topScores } = data;
  console.log('OverlayConfigTemplate portfolioName : ', portfolioName)
  console.log('OverlayConfigTemplate data : ', data)

  const [layerCandidatesData, setLayerCandidatesData] = useState([]);
  const [clickedLayer, setClickedLayer] = useState("2");

  const layerImplementationList = [
    {id:2, component:<OverlayInflationLayer data={layerCandidatesData}/>},
    {id:12, component:<NewTechLayer/>}
 ]

  const onClickLayerHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = event.currentTarget;
    setClickedLayer(id);
  };

  useEffect(() => {
    setSelectedPortfolioName('portfolio2')
    setLayerCandidatesData(_layerCandidatesData);
  }, []);

  const runHandler = async () => {
    // dataOverlayConfig를 parameter로 보내서 result 받아서 DataOverlayResult 변경
    // setDataOverlayResult((prev) => prev + 1);

    router.push("/overlayresult");
  };


  return (
    <div css={bodyContainerWrap("100%", "100%", Colors.backgroundPrimary1, "green")}>
      <div css={[bodyHeadWrap("1852px")]}>
        <Typography.Subtitle4 color={"#838B8F"}>Overlay</Typography.Subtitle4>
        <div css={[bodyHeadIcon("540px")]}>
          <TextButton.Small
            title="Back to Diagnosis"
            disabled={false}
            bgTheme="common"
            onClick={() => router.push("/diagnosis")}
          />
          <TextButton.Small title="Reset Config" disabled={false} bgTheme="common" onClick={() => {}} />
          <TextButton.Small title="Run" disabled={false} bgTheme="accent" onClick={runHandler} />
        </div>
      </div>

      <div css={[bodyMainWrap("100%", "100%", "", "yellow")]}>
        <div css={[bodyMain("1852px")]}>
          <div css={[bodyItem]}>
            <Typography.Subtitle4 css={boxTitleStyle} lineHeight={1} color={"#2F3B43"}>
              Diagnosis Summary
            </Typography.Subtitle4>
            <DiagnosisSummary factorData={factor} sectorData={sector} scoreData={topScores} />
          </div>

          <div css={[bodyItem]}>
            <Typography.Subtitle4 css={boxTitleStyle} lineHeight={1}>
              Layer Candidates
            </Typography.Subtitle4>
            <OverlayConfigSidebar data={layerCandidatesData} clickedLayer={clickedLayer} onClickLayerHandler={onClickLayerHandler} />
          </div>
          <div css={[bodyItem]} >
            <Typography.Subtitle4 css={boxTitleStyle} lineHeight={1}>Layer Implementation</Typography.Subtitle4>
            {
              layerImplementationList.map((v,i)=>String(v.id)).includes(clickedLayer) 
              ?
              (
                layerImplementationList.map((el) => {
                  return (
                    String(el.id) == clickedLayer && el.component !== undefined && <div key={el.id}>{el.component}</div>
                  )
                })
              )
              :
              ( // Default Page Set
                <div>{layerImplementationList.filter((el)=>el.id==2)[0].component}</div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverlayConfigTemplate;
