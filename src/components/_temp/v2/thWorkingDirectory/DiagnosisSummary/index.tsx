import { css } from '@emotion/react';
import * as Typography from '@styles/typography';
import BasicBox from '@components/atoms/BasicBox';
import MajorImpactScore from './MajorImpactScore';
import RiskFactorAnalysis from './RiskFactorAnalysis';
import SectorAllocation from './SectorAllocation';

const SCORE_DATA = [
  { name: 'My Portfolio', scores: { Inflation: -70, VIX: 10, Turnaround: -90 } },
  { name: 'S&P 500', scores: { Inflation: -70, VIX: 25, Turnaround: 80 } },
  { name: 'DJI', scores: { Inflation: 50, VIX: 65, Turnaround: -20 } },
  { name: 'Russell 2000', scores: { Inflation: -50, VIX: 10, Turnaround: -90 } },
];

const RADAR_DATA = {
  indicator: [
    { name: 'Value', max: 5 },
    { name: 'Dividend', max: 5 },
    { name: 'Momentum', max: 5 },
    { name: 'Volatility', max: 5 },
    { name: 'Growth', max: 5 },
  ],
  data: [
    {
      value: [3.2, 3, 4.5, 2.4, 4.7],
      name: 'Risk Factor Analysis',
    },
  ],
};

const TREEMAP_DATA = [
  { name: 'Energy', value: 100 },
  { name: 'Materials', value: 90 },
  { name: 'Industrials', value: 80 },
  { name: 'Consumer Discretionary', value: 70 },
  { name: 'Consumer Staples', value: 60 },
  { name: 'Healthcare', value: 50 },
  { name: 'Finacials', value: 40 },
  { name: 'Information Technology', value: 30 },
  { name: 'Communication Services', value: 20 },
  { name: 'Utilities', value: 10 },
  { name: 'Real Estate', value: 0 },
];

const titleStyle = css`margin-bottom:10px;` // prettier-ignore

const DiagnosisSummary = () => {
  return (
    <>
      <Typography.Subtitle4 css={titleStyle} lineHeight={1}>
        Diagnosis Summary
      </Typography.Subtitle4>
      <BasicBox
        width={364}
        height={719}
        borderColor="#CED9E1"
        paddingTop={16}
        paddingBottom={18}
        paddingLeft={19}
        paddingRight={20}
      >
        <MajorImpactScore scoreData={SCORE_DATA} />
        <RiskFactorAnalysis radarData={RADAR_DATA} />
        <SectorAllocation treemapData={TREEMAP_DATA} />
      </BasicBox>
    </>
  );
};

export default DiagnosisSummary;
