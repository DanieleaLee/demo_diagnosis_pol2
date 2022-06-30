import { css } from "@emotion/react";
import BasicBox from "@components/atoms/BasicBox";
import MajorImpactScore from "./MajorImpactScore";
import RiskFactorAnalysis from "./RiskFactorAnalysis";
import SectorAllocation from "./SectorAllocation";

const DiagnosisSummary = ({ factorData, sectorData, scoreData }) => {
  const { Strengths, Weaknesses } = scoreData;
  const _strengths = Object.entries(Strengths as { [s: string]: number }).sort(([, a], [, b]) => b - a);
  const _weaknesses = Object.entries(Weaknesses as { [s: string]: number }).sort(([, a], [, b]) => b - a);
  const myStrengthTop2 = _strengths.slice(0, 2);
  const myWeaknessTop1 = _weaknesses.slice(-1);
  const treeScores = [...myStrengthTop2, ...myWeaknessTop1]; // 최고 2개 최저 1개

  return (
    <div>
      <BasicBox
        width={364}
        height={719}
        borderColor="#ECECEC"
        paddingTop={16}
        paddingBottom={18}
        paddingLeft={19}
        paddingRight={20}
      >
        <MajorImpactScore treeScores={treeScores} />
        <RiskFactorAnalysis radarData={factorData} />
        <div
          css={css`
            margin-top: 22px;
          `}
        >
          <SectorAllocation
            treemapData={sectorData}
            chartContainerCss={css`
              width: 326px;
              height: 159px;
            `}
          />
        </div>
      </BasicBox>
    </div>
  );
};

export default DiagnosisSummary;