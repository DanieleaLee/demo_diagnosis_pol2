import { css } from '@emotion/react';
import HelpTooltip from 'src/components/molecules/HelpTooltip';
import RadarChartSimple from '../../../customCharts/RadarChartSimple';
import * as Typography from '@styles/typography';

const RiskFactorAnalysisContainerStyle = css`
  height: 307px;
  border-bottom: 1px dashed #9fadb7;
  padding-top: 22px;
`;
const titleContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 7.17px;
`;
type RiskFactorAnalysisProps = {
  radarData: {
    indicator: {
      name: string;
      max: number;
    }[];
    data: {
      value: number[];
      name: string;
    }[];
  };
};
const RiskFactorAnalysis = ({ radarData }: RiskFactorAnalysisProps) => {
  return (
    <div css={RiskFactorAnalysisContainerStyle}>
      <p css={titleContainerStyle}>
        <Typography.Body2 color='#2F3B43' lineHeight="15.73px">RiskFactorAnalysis</Typography.Body2>
        <HelpTooltip
          size={14}
          title="RiskFactorAnalysis"
          description="Factor impact score on my portfolio (0~5)"
          tooltipBoxCss={css`left: 7px;top: 8px;`} // prettier-ignore
        />
      </p>
      <RadarChartSimple
        isLoading={false}
        rowData={radarData.data}
        indicatorOpt={radarData.indicator}
        containerCss={css`width: 325px;height: 225px;margin-bottom:40px;margin-top:12px;`} // prettier-ignore
      />
    </div>
  );
};
export default RiskFactorAnalysis;
