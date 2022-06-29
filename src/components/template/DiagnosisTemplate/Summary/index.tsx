import React from "react";
import { css } from "@emotion/react";
import BasicBox from "src/components/atoms/BasicBox";
import * as Typography from "@styles/typography";
import SectorAllocation from "@pages/diagnosis/_temp/thWorkingDirectory/DiagnosisSummary/SectorAllocation";
import { BiFileFind } from "react-icons/bi";
import HelpTooltip from "@components/molecules/HelpTooltip";
import RadarChartSimple from "src/components/_temp/v2/customCharts/RadarChartSimple";
import RiskReturnScatterChart_v2 from "src/components/_temp/v2/customCharts/RiskReturnScatterChart_v2";
import SingleScoreChart from "src/components/_temp/v2/customCharts/SingleScoreChart";

import Image from "next/image";


const upperContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`;
const lowerContainerStyle = css`
  display: flex;
  margin-top: 32px;
  /* gap: 11px; */
  justify-content: space-between;
`;
const titleContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 7.17px;
`;

const treemapContainerCss = css`
  width: 696px;
  height: 290px;
  margin-top: 10px;
`;

const tableStyle = css`
  display: block;
  width: 100%;
  position: relative;
  border-collapse: separate;
  & th {
  }
  th:nth-of-type(1) {
    padding: 0; /* Required #2 */
    width: 92px;
  }

  /* Required #3 */
  th:nth-of-type(1)::after {
    display: block;
    content: " ";
    width: 100%;

    position: absolute;
    top: 38px;
    border-bottom: 1px dashed #9fadb7;
  }
  th > span {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    /* justify-content: center; */
  }
  th > p {
    padding-top: 7px;
    padding-bottom: 13px;
  }

  & tbody {
    display: block;
    height: 279px;
    overflow: auto;
    &::-webkit-scrollbar {
      background: #ececec;
      border-radius: 1.5px;
      width: 2px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 1.5px;
      background: #2f3b43;
    }
  }
  td {
    vertical-align: middle;
  }
  & th:nth-of-type(1),
  & td:nth-of-type(1) {
    width: 92px;
  }
  & th:nth-of-type(2),
  & td:nth-of-type(2) {
    width: 146px;
    text-align: center;
    border-right: 1px dashed #9fadb7;
  }
  & td:nth-of-type(2) {
    display: flex;
    justify-content: center;
  }
  & th:nth-of-type(3),
  & td:nth-of-type(3) {
    width: 133px;
    padding-left: 35px;
  }
  & th:last-child,
  & td:last-child {
    width: 104px;
    text-align: center;
    display: flex;
    justify-content: center;
  }
`;

const scoreWrapStyle = css`
  height: 55px;
  width: 55px;
`;

const Summary = ({ data, portfolioName }) => {
  return (
    <div id="Summary">
      <BasicBox borderColor="#CED9E1" paddingTop={28} paddingRight={35} paddingBottom={35} paddingLeft={35}>
        <Typography.Subtitle2 color="#2F3B43" lineHeight="18.15px">
          Stock Diagnosis - Summary
          <BiFileFind
            size={17}
            css={css`
              margin-left: 7px;
            `}
          />
        </Typography.Subtitle2>

        <div css={upperContainerStyle}>

          <SectorAllocation treemapData={data.sector} chartContainerCss={treemapContainerCss} />
          <div css={css`width: 686px; height: 309px;`}>
            <span css={titleContainerStyle}>
              <Typography.Body2
                color="#2F3B43"
                lineHeight="15.73px"
                css={css`
                  padding-left: 26px;
                `}
              >
                Risk Factor Analysis
              </Typography.Body2>
              <HelpTooltip
                size={14}
                title="Risk Factor Analysis"
                description="Factor impact score on my portfolio (0~5)"
                tooltipBoxCss={css`left: 7px;top: 8px;`} // prettier-ignore
              />
            </span>

            <RiskReturnScatterChart_v2
              animation={true}
              borderColor={"#546A78"} 
              pointColor={"#94C9EC"}
              data={data.riskreturn}
              height={260}
              width={633}
              top={7}
              right={4}
              isLoading={false}
              containerCss={css`
                height: 100%;
                width: 100%;
                background-color: transparent;
                margin-top: 10px;
              `}
            />
          </div>
        </div>


        <div css={lowerContainerStyle}>
          <TopScoreTable topScores={data.topScores} />
          <RadarView radarData={data.factor} />
          <BasicBox width={426} height={285} borderColor="#CED9E1" backgroundColor="#FCFDFE">
            <div css={[css`width: 100%; padding-top: 19px; padding-left: 23px; padding-bottom: 10px; display: flex; flex-direction: row; align-items: baseline;z-index: 3;`]}>
              <Typography.Body2 color="#2F3B43" lineHeight="15.73px" css={css``}>
                Word Cloud
              </Typography.Body2>
              <HelpTooltip 
                size={14}
                title="Word Cloud"
                description="Cloud creators are used to highlight popular words and phrases based on frequency and relevance"
                tooltipBoxCss={css`left: 7px;top: 8px;`} // prettier-ignore
              />
            </div>
            <div css={[css`width: 100%; display: flex; justify-content: center; align-items: center;`]}>
              <Image src={`/img/demo/${portfolioName}_wc.png`} alt="" width={414} height={215}/>
            </div>
          </BasicBox>
        </div>

      </BasicBox>
    </div>
  );
};

export default Summary;

const tdStyle = (index: number, last: number) => css`
  padding-top: ${index === 0 ? 21 : 0}px;
  padding-bottom: ${index === last ? 0 : 15}px;
`;
type TopScoreTableProps = {
  topScores: {
    Strengths: {
      [s: string]: number;
    };
    Weaknesses: {
      [s: string]: number;
    };
  };
};
const TopScoreTable = ({ topScores }: TopScoreTableProps) => {
  const { Strengths, Weaknesses } = topScores;
  const _strong = Object.entries(Strengths).sort(([, a], [, b]) => b - a);
  const _weak = Object.entries(Weaknesses).sort(([, a], [, b]) => b - a);

  return (
    <BasicBox
      width={547}
      height={285}
      borderColor="#CED9E1"
      paddingTop={14}
      paddingRight={35}
      paddingBottom={17}
      paddingLeft={35}
      backgroundColor="#FCFDFE"
    >
      <table css={tableStyle}>
        <thead>
          <tr>
            <th>
              <span>
                <Typography.Subtitle2 color="#2F3B43" lineHeight="18.15px">
                  Strengths
                </Typography.Subtitle2>
              </span>
            </th>
            <th>
              <Typography.Subtitle2 color="#2F3B43" lineHeight="18.15px">
                Score
              </Typography.Subtitle2>
            </th>
            <th>
              <Typography.Subtitle2 color="#2F3B43" lineHeight="18.15px">
                Weaknesses
              </Typography.Subtitle2>
            </th>
            <th>
              <Typography.Subtitle2 color="#2F3B43" lineHeight="18.15px">
                Score
              </Typography.Subtitle2>
            </th>
          </tr>
        </thead>
        <tbody>
          {_strong.map((_, i) => (
            <tr key={i}>
              <td css={tdStyle(i, 2)}>
                <Typography.Subtitle3 color="#2F3B43" lineHeight="18.15px">
                  {_strong[i][0]}
                </Typography.Subtitle3>
              </td>
              <td css={tdStyle(i, 2)}>
                <SingleScoreChart
                  isLoading={false}
                  value={_strong[i][1]}
                  fontSize={17}
                  lineWidth={4}
                  containerCss={scoreWrapStyle} // prettier-ignore
                />
              </td>
              <td css={tdStyle(i, 2)}>
                <Typography.Subtitle3 color="#2F3B43" lineHeight="18.15px">
                  {_weak[i][0]}
                </Typography.Subtitle3>
              </td>
              <td css={tdStyle(i, 2)}>
                <SingleScoreChart
                  isLoading={false}
                  value={_weak[i][1]}
                  fontSize={17}
                  lineWidth={4}
                  containerCss={scoreWrapStyle} // prettier-ignore
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </BasicBox>
  );
};
type RadarViewProps = {
  radarData: {
    data: {
      name: string;
      value: number[];
    }[];
    indicator: {
      name: string;
      max: number;
    }[];
  };
};
const RadarView = ({ radarData }: RadarViewProps) => {
  return (
    <BasicBox width={440} height={285} borderColor="#CED9E1" backgroundColor="#FCFDFE">
      <RadarChartSimple
        isLoading={false}
        rowData={radarData.data}
        indicatorOpt={radarData.indicator}
        containerCss={css`width: 100%;height: 95%;padding-top:24px;`} // prettier-ignore
      />
    </BasicBox>
  );
};
