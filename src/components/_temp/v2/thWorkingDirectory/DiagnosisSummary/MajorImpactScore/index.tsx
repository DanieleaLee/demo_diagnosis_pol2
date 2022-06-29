import { css } from '@emotion/react';
import { useState } from 'react';
import HelpTooltip from '@components/molecules/HelpTooltip';
import SingleScoreChart from '../../../customCharts/SingleScoreChart';
import * as Typography from '@styles/typography';

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

type MajorImpactScoreProps = {
  scoreData: {
    name: string;
    scores: { [name: string]: number };
  }[];
};
const MajorImpactScore = ({ scoreData }: MajorImpactScoreProps) => {
  const [selected, setSelected] = useState(0);
  const myScores = scoreData[0].scores;
  const benchmarks = scoreData.slice(1);
  const selectedScores = scoreData.slice(1).map((bm) => bm.scores)[selected];

  const renderScoreBox = (name: string, score1: number, score2: number) => {
    return (
      <div css={scoreContainerStyle}>
        <Typography.Body6 color="#2f3b43" lineHeight={1}>
          {name}
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
      <p css={titleContainerStyle}>
        <Typography.Body2 color='#2F3B43' lineHeight="15.73px">Major Impact Score</Typography.Body2>
        <HelpTooltip
          size={14}
          title="Major Impact Score"
          description="Top 3 Diagnositc results, the most impact on my portfolio (range: -100 ~ +100)"
          tooltipBoxCss={css`left: 7px;top: 8px;`} // prettier-ignore
        />
      </p>
      <div css={contentsContainerStyle}>
        <div css={leftContainerStyle}>
          <Typography.Body4 css={leftTextStyle} color="#2f3b43" lineHeight={1}>
            My Portfolio
          </Typography.Body4>
          {/* TODO: select Design System component로 변경 */}
          <select
            css={css`
              width: 137px;
              height: 26px;
              font-family: 'Inter';
              font-size: 13px;
              font-weight: 400;
            `}
            name="benchmarks"
            value={selected}
            onChange={(e) => setSelected(Number(e.target.value))}
          >
            {benchmarks.map((b, i) => (
              <option value={i} selected={i === selected}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
        <div css={rightContainerStyle}>
          {Object.keys(myScores).map((name) => renderScoreBox(name, myScores[name], selectedScores[name]))}
        </div>
      </div>
    </div>
  );
};

export default MajorImpactScore;
