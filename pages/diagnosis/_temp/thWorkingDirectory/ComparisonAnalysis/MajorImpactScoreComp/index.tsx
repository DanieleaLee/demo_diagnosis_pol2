import { css } from "@emotion/react";
import SingleScoreChart from "@components/_temp/v2/customCharts/SingleScoreChart";
import * as Typography from "@styles/typography";
import { BiChevronsDown } from "react-icons/bi";
import shortNameList from "../../../data/short_full_layer_name.json";

const MajorImpactScoreCompContainerStyle = css``;
const titleContainerStyle = css`margin-bottom: 12px;`; // prettier-ignore
const contentsContainerStyle = css`
  display: flex;
  height: 148px;
  border: 0.5px solid #ced9e1;
  border-radius: 6px;
`;
const leftContainerStyle = css`
  padding-top: 51px;
  padding-left: 14px;
  padding-bottom: 29px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const rightContainerStyle = css`
  display: flex;
  justify-content: flex-end;
`;

const scoreContainerStyle = css`
  width: 59px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
`;

const topScoreWrapStyle = css`
  height: 39px;
  width: 39px;
  margin: 12px 0 14px 0;
`;
const scoreWrapStyle = css`
  height: 39px;
  width: 39px;
`;
const shortNameCss = css`
  width: 54px;
  text-align: center;
  position: relative;
  &:hover > span {
    visibility: visible;
  }
`;
const hoverSpanCss = css`
  position: absolute;
  left: 0;
  top: -20px;
  visibility: hidden;
  background: #ececec;
  padding: 2px 10px;
  z-index: 2;
  white-space: nowrap;
  border-radius: 4px;
`;

type MajorImpactScoreCompProps = {
  myScore?: [string, number][];
  selectedScore?: { [name: string]: number };
};
const MajorImpactScoreComp = ({ myScore, selectedScore }: MajorImpactScoreCompProps) => {
  const renderScoreBox = (name: string, score1: number, score2: number, key: string) => {
    return (
      <div key={key} css={scoreContainerStyle}>
        <Typography.Body6 color="#2f3b43" lineHeight={1} css={shortNameCss}>
          {shortNameList[name]}
          <span css={hoverSpanCss}>{name}</span>
        </Typography.Body6>
        <SingleScoreChart
          isLoading={false}
          value={score1}
          fontSize={13}
          lineWidth={3}
          containerCss={topScoreWrapStyle} // prettier-ignore
        />
        <SingleScoreChart
          isLoading={false}
          value={score2}
          fontSize={13}
          lineWidth={3}
          containerCss={scoreWrapStyle} // prettier-ignore
        />
      </div>
    );
  };

  return (
    <div css={MajorImpactScoreCompContainerStyle}>
      <Typography.Body2 color="#2F3B43" css={titleContainerStyle} lineHeight="15.73px">
        Major Impact Score
      </Typography.Body2>
      <div css={contentsContainerStyle}>
        <div css={leftContainerStyle}>
          <Typography.Body4 color="#2f3b43" lineHeight="14.52px">
            Original Portfolio
          </Typography.Body4>
          <BiChevronsDown size={27.84} color="#94A1A9" />
          <Typography.Body4 color="#2f3b43" lineHeight="14.52px">
            Overlaid Portfolio
          </Typography.Body4>
        </div>
        <div css={rightContainerStyle}>
          {myScore.map((my) => renderScoreBox(my[0], my[1], selectedScore[my[0]], my[0]))}
        </div>
      </div>
    </div>
  );
};

export default MajorImpactScoreComp;
