import React from "react";
import { css } from "@emotion/react";
import StockDiagnosisBox from "@components/template/DiagnosisTemplate/customComponents/GicsSectors/StockDiagnosisBox";

const containerCss = css`
  display: inline-block;
  width: 100%;
  
  & > div:not(:last-of-type) {
    margin-bottom: 9px;
  }
`;

export type SubDataType = {
  id: number;
  title: string;
  subTitle: string;
};

export interface StockDiagnosisProps {
  width?: number;
  height?: number;
  data: Array<{
    id: number;
    subject?: string;
    subData: Array<SubDataType>;
  }>;
}

const StockDiagnosisBoxes = ({
  width,
  height,
  data
}: StockDiagnosisProps) => {
  return (
    <div css={containerCss}>
      {data.map((d) => (
        <StockDiagnosisBox
          width={width}
          height={height}
          key={d.id}
          subData={d.subData}
          subject={d.subject}
        />
      ))}
    </div>
  );
};

export default StockDiagnosisBoxes;
