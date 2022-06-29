import React from "react";
import { css } from "@emotion/react";
import Colors from "@styles/colors";
import { flexRow } from "@styles";
import PfDiagnosisLayerBox from "@lucian2Components/atoms/PfDiagnosisLayerBox";
import { PFDGLAYERBOX_DUMMY_DATA } from "@lucian2Components/Dummy";

const triangleArrowCss = css`
  width: 0;
  height: 0;
  border-bottom: 8.75px solid transparent;
  border-top: 8.75px solid transparent;
  border-left: 8.75px solid ${Colors.diagnosisLayerArrowColor};
  border-right: 8.75px solid transparent;
  margin: 0 13.75px 0 16.25px;
`;

const PfDgLayerBoxesContainerCss = css`
  display: inline-flex;
`;

const PfDgLayerBoxesWithArrowCss = css`
  ${flexRow}
`;

// Diagnosis Layer 박스 모음
const PfDiagnosisLayerBoxes = () => {
  return (
    <div css={PfDgLayerBoxesContainerCss}>
      {PFDGLAYERBOX_DUMMY_DATA.map((item, idx) => (
        <div key={idx} css={PfDgLayerBoxesWithArrowCss}>
          {/* prettier-ignore */}
          <PfDiagnosisLayerBox
            layerNumberTxt={`Layer ${idx + 1}`}
            headlineColor={idx === 1 ? Colors.semanticGraph1 : Colors.diagnosisLayerBoxColor}
            scoreTxt={item.scoreTxt}
            themeName={item.themeName}
          />
          {idx !== PFDGLAYERBOX_DUMMY_DATA.length - 1 && (
            <div css={triangleArrowCss} />
          )}
        </div>
      ))}
    </div>
  );
};

export default PfDiagnosisLayerBoxes;
