import React, { useCallback, useState, useRef, useEffect } from "react";
import Buttonable, { ButtonableProps } from "@components/atoms/Buttonable";
import { SerializedStyles } from "@emotion/react";
import { css } from "@emotion/react";
import Colors from "@styles/colors";
import { flexRowBetween } from "src/styles";
import { BsCheckCircleFill } from "react-icons/bs";
import Image from "next/image";
import RightMenuBody from "@alvinComponents/molecules/RightMenu/RightMenuBody";
import TechTreeItem from "@components/molecules/TechTree/TechTreeItem_v1/TechTreeItem";
import TechTreeItemRow from "@components/molecules/TechTree/TechTreeItem_v1/TechTreeItemRow";
import { obc } from "@alvinComponents/helper";
import { CgCardClubs } from "react-icons/cg";
import { version } from "os";
import AssetClassPieChart from "@components/organisms/AssetClassPieChart";
import RegionPieChart from "@components/organisms/RegionPieChart";
import { useSelectedModelValue } from "@recoil/hooks/useSelectedModel";

import HeatmapChart from "@components/_temp/v2/customCharts/HeatmapChart";
import * as heatmapChartData from "@components/_temp/v2/customCharts/HeatmapChart/getHeatmapData";
import RiskReturnScatterChart from "@components/_temp/v2/customCharts/RiskReturnScatterChart";
import * as graphQlData from "@components/_temp/v2/customCharts/EfScatterChart/getEfScatterData";
import { useMPTdata, useMPTdataValue } from "@recoil/hooks/useMPTdata";
import { useModelConfigValue } from "@recoil/hooks/useModelConfig";


export const TECHTREE_HEIGHT = "200px";

// HEATMAP
const heatmapColorSet = [
  "#294B70",
  "#2D5885",
  "#34628B",
  "#336BA0",
  "#3476B7",
  "#3A83C7",
  "#3C89C5",
  "#497EB9",
  "#4A74BE",
  "#4A76D7",
  "#3B77E6",
  "#4C86E7",
  "#548DEC",
  "#4895DB",
  "#4BADC4",
  "#5CC9BB",
  "#82D2D9",
  "#A9E3EF",
  "#C1E6FF",
  "#E0F3FF",
].reverse();
const heatmapXaxisName = heatmapChartData.xAxisName;
const heatmapYaxisName = heatmapXaxisName.reverse();
const heatmapData = heatmapChartData.heatmapData;

// RiskReturnScatterData
const miniPointX = "";
const miniPointY = "";
const tickersXYvalues = "";

const RiskReturnScatterData = {
  miniPointX,
  miniPointY,
  tickersXYvalues,
};

const bottomContainerCss = css`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  z-index: 0;
  background-color: #b5dbff;
`;

const TechTreeContainerCss = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  background: #2e3b43;
  height: ${TECHTREE_HEIGHT};
`;

const TechTree = ({ UniverseInfo, step }) => {
  const [UniverseInfoState, setUniverseInfo] = useState(UniverseInfo);
  console.log("step : ", step);
  const [data, setData] = useState(false);
  const [isFetched, setFetched] = useState(false);
  const { setMPTdata } = useMPTdata();
  const MPTdata = useMPTdataValue();

  useEffect(() => {
    setFetched(false);
    console.log("MPTdata 1: ", MPTdata);
    setData(MPTdata);
  }, [MPTdata]);

  useEffect(() => {
    setFetched(true);
    console.log("다시바뀜!!!");
    console.log("바뀐 DATA :", data);
  }, [data]);

  // const [economicDevInfoState, setEconomicDevInfo] = useState(economicDevInfo)
  // const [assetClassInfoState, setAssetClassInfo] = useState(assetClassInfo)

  // console.log('UniverseInfoState : ', UniverseInfoState)

  const { modelName } = useSelectedModelValue(); // recoil 추가 0502
  // const { modelName } = useSelectedModelValue(); // recoil 추가 0502

  const updateUniverseInfoState = () => {
    const newUniverseInfoState = { ...UniverseInfoState };
    newUniverseInfoState["label"][1] += 1;
    newUniverseInfoState["assetClass"]["Equity"] += 1;
    newUniverseInfoState["economicDev"]["Blended Development"] += 1;
    setUniverseInfo(newUniverseInfoState);
  };

  const modelConfigValue = useModelConfigValue(); // recoil state 0505

  const getSpaceWidths = (leftSpace, middleSpace, rightSpace) => {
    return [leftSpace, middleSpace, rightSpace];
  };

  return (
    <div css={[bottomContainerCss]}>
      <div css={[TechTreeContainerCss]} onClick={updateUniverseInfoState}>
        {[1, 2].includes(step) && (
          <>
            <TechTreeItem>
              <TechTreeItemRow
                type={"title"}
                value={"Economic Development"}
                spaceWidth={getSpaceWidths(10, 100, 10)}
                onClick={updateUniverseInfoState}
              />
              <TechTreeItemRow
                type={"weight"}
                value={UniverseInfoState["economicDev"]}
                spaceWidth={getSpaceWidths(10, 100, 10)}
                onClick={updateUniverseInfoState}
              />
            </TechTreeItem>

            <div
              css={[
                css`
                  padding-left: 5px;
                  padding-right: 8px;
                `,
              ]}
            >
              <TechTreeItem>
                <div
                  css={css`
                    height: 100%;
                    padding-bottom: 1rem;
                  `}
                >
                  <div
                    css={css`
                      height: 100%;
                      border: 1px solid white;
                      border-radius: 0.25rem;
                      background-color: ${Colors.primary2};
                    `}
                  >
                    <AssetClassPieChart
                      data={[]}
                      isLoading={false}
                      containerCss={css`
                        height: 100%;
                        width: 100%;
                        margin: auto;
                      `}
                    />
                  </div>
                </div>
                {/*<Image width={257} height={174} src={`/img/alvin/minimap_assetClass.png`} alt={'assetClass'}/>*/}
              </TechTreeItem>
            </div>

            <div
              css={[
                css`
                  padding-left: 5px;
                  padding-right: 15px;
                `,
              ]}
            >
              <TechTreeItem>
                <div
                  css={css`
                    height: 100%;
                    padding-bottom: 1rem;
                  `}
                >
                  <div
                    css={css`
                      height: 100%;
                      border: 1px solid white;
                      border-radius: 0.25rem;
                      background-color: ${Colors.primary2};
                    `}
                  >
                    <RegionPieChart
                      data={[]}
                      isLoading={false}
                      containerCss={css`
                        height: 100%;
                        width: 100%;
                        margin: auto;
                      `}
                    />
                  </div>
                </div>
              </TechTreeItem>
            </div>
          </>
        )}

        {[3, 4].includes(step) && (
          <>
            <div
              css={[
                css`
                  margin-left: 5px;
                  margin-right: 8px;
                  width: 329px;
                  height: 166px;
                  background-color: #2e3b43;
                  /* border: 1px solid red; */
                `,
              ]}
            >
              <TechTreeItem>
                <div
                  css={css`
                    width: 329px;
                    height: 166px;
                  `}
                >
                  {isFetched && (
                    <RiskReturnScatterChart
                      animation={false}
                      borderColor={"#CED9E1"} // '#546A78
                      pointColor={"#94C9EC"} // 일반 point color는 같음. 강조할 점 '#546A78'
                      data={data}
                      isLoading={false}
                      containerCss={css`
                        height: 100%;
                        width: 100%;
                        /* border: 1px solid black; */
                        background-color: #2e3b43;
                      `}
                    />
                  )}
                </div>
              </TechTreeItem>
            </div>

            <div
              css={[
                css`
                  margin-left: 5px;
                  margin-right: 8px;
                  width: 329px;
                  height: 173px;
                `,
              ]}
            >
              <TechTreeItem>
                <div
                  css={css`
                    width: 329px;
                    height: 173px;
                  `}
                >
                  {isFetched && (
                    <HeatmapChart
                      animation={false}
                      colorSet={heatmapColorSet}
                      visualMapBorderColor={"#2E3B43"}
                      // xAxisName={heatmapXaxisName}
                      // yAxisName={heatmapYaxisName}
                      data={data}
                      isLoading={false}
                      // prettier-ignore
                      containerCss={css`height: 100%;width: 100%; background-color: #2E3B43;`}
                    />
                  )}
                </div>
              </TechTreeItem>
            </div>
          </>
        )}

        <TechTreeItem>
          <TechTreeItemRow
            type={"title"}
            value={"Investment Universe"}
            spaceWidth={getSpaceWidths(0, 100, 0)}
            onClick={updateUniverseInfoState}
          />
          <TechTreeItemRow
            type={"label"}
            value={UniverseInfoState["label"]}
            spaceWidth={getSpaceWidths(0, 100, 30)}
            onClick={updateUniverseInfoState}
          />
          <TechTreeItemRow
            type={"weightTitle"}
            value={"Asset Class"}
            spaceWidth={getSpaceWidths(0, 100, 0)}
            onClick={updateUniverseInfoState}
          />
          <TechTreeItemRow
            type={"weight"}
            value={UniverseInfoState["assetClass"]}
            spaceWidth={getSpaceWidths(0, 100, 10)}
            onClick={updateUniverseInfoState}
          />
        </TechTreeItem>
        {step >= 2 && (
          <TechTreeItem bgCol={'#212D34'}>
            <TechTreeItemRow
              type={"title"}
              value={"Model Selection"}
              spaceWidth={getSpaceWidths(10, 100, 0)}
              onClick={updateUniverseInfoState}
            />
            <TechTreeItemRow
              type={"label"}
              value={[modelName]}
              spaceWidth={getSpaceWidths(10, 100, 10)}
              onClick={updateUniverseInfoState}
            />
            <TechTreeItemRow
              type={"img"}
              value={["/img/alvin/techtree_mpt.png", 183, 124]}
              spaceWidth={getSpaceWidths(10, 100, 10)}
              onClick={updateUniverseInfoState}
            />
          </TechTreeItem>
        )}
        {[3].includes(step) && (
          <TechTreeItem bgCol={"#212D34"}>
            <TechTreeItemRow
              type={"title"}
              value={"Model Config"}
              spaceWidth={getSpaceWidths(10, 100, 0)}
              onClick={updateUniverseInfoState}
            />
            <TechTreeItemRow
              type={"config"}
              value={modelConfigValue}
              spaceWidth={getSpaceWidths(10, 100, 0)}
              onClick={updateUniverseInfoState}
            />
          </TechTreeItem>
        )}
      </div>
    </div>
  );
};

export default TechTree;
