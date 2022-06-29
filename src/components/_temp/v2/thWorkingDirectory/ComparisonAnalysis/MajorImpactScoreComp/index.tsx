import { css } from '@emotion/react';
import SingleScoreChart from '../../../customCharts/SingleScoreChart';
import * as Typography from '@styles/typography';
import { BiChevronsDown } from 'react-icons/bi';

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

type MajorImpactScoreCompProps = {
  scoreData: {
    name: string;
    scores: { [name: string]: number };
  }[];
  myScore?: { [name: string]: number };
  selectedScore?: { [name: string]: number };
};
const MajorImpactScoreComp = ({ myScore, selectedScore }: MajorImpactScoreCompProps) => {
  const names = Object.keys(myScore);

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
          {names.map((name) => renderScoreBox(name, myScore[name], selectedScore[name]))}
        </div>
      </div>
    </div>
  );
};

export default MajorImpactScoreComp;
