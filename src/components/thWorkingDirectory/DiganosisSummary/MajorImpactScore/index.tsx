import { css } from "@emotion/react";
import { useState } from "react";
import HelpTooltip from "@components/molecules/HelpTooltip";
import SingleScoreChart from "@components/customCharts/SingleScoreChart";
import * as Typography from "@styles/typography";
import shortNameList from "../../../../data/short_full_layer_name.json";

const MajorImpactScoreContainerStyle = css`
  height: 167px;
  border-bottom: 1px dashed #9fadb7;
`;
const titleContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 7.17px;
`;

const contentsContainerStyle = css`
  display: flex;
`;
const leftContainerStyle = css`
  padding-top: 48px;
`;
const leftTextStyle = css`
  margin-bottom: 34px;
`;

const rightContainerStyle = css`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`;

const scoreContainerStyle = css`
  width: 59px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 13px;
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

// benchmark socres mock data
const BENCHMARK_SCORES = {
  "S&P 500": {
    Goldilocks: 12,
    "Monetary Policy": 32,
    "New Tech & Value": 53,
    Inflation: 76,
    Profitability: 72,
    "Earnings Quality": 92,
    "Yield Curve Steepening": 36,
    Leverage: 24,
    Metaverse: 31,
    Momentum: 12,
  },
  DJI: {
    Goldilocks: 43,
    "Monetary Policy": 62,
    "New Tech & Value": 12,
    Inflation: 41,
    Profitability: 76,
    "Earnings Quality": 23,
    "Yield Curve Steepening": 76,
    Leverage: 49,
    Metaverse: 12,
    Momentum: 8,
  },
  "Russell 2000": {
    Goldilocks: 13,
    "Monetary Policy": 43,
    "New Tech & Value": 45,
    Inflation: 56,
    Profitability: 67,
    "Earnings Quality": 42,
    "Yield Curve Steepening": 98,
    Leverage: 87,
    Metaverse: 79,
    Momentum: 37,
  },
};

type MajorImpactScoreProps = {
  treeScores: [string, number][];
};

const MajorImpactScore = ({ treeScores }: MajorImpactScoreProps) => {
  const [selected, setSelected] = useState("S&P 500");
  const benchmarkNames = Object.keys(BENCHMARK_SCORES);

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
    <div css={MajorImpactScoreContainerStyle}>
      <span css={titleContainerStyle}>
        <Typography.Body2 color="#2F3B43" lineHeight="15.73px">
          Major Impact Score
        </Typography.Body2>
        <HelpTooltip
          size={14}
          title="Major Impact Score"
          description="Top 3 Diagnositc results, the most impact on my portfolio (range: -100 ~ +100)"
          tooltipBoxCss={css`left: 7px;top: 8px;`} // prettier-ignore
        />
      </span>
      <span css={contentsContainerStyle}>
        <span css={leftContainerStyle}>
          <Typography.Body4 css={leftTextStyle} color="#2f3b43" lineHeight={1}>
            My Portfolio
          </Typography.Body4>
          <select
            css={css`
              width: 137px;
              height: 26px;
              font-family: "Inter";
              font-size: 13px;
              font-weight: 400;
            `}
            name="benchmarks"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {benchmarkNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </span>
        <div css={rightContainerStyle}>
          {treeScores.map((my) => renderScoreBox(my[0], my[1], BENCHMARK_SCORES[selected][my[0]], my[0]))}
        </div>
      </span>
    </div>
  );
};

export default MajorImpactScore;