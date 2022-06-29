import { css } from "@emotion/react";
import Colors from "@styles/colors";

const ProgressBarBodyContainerWrap = css`
  width: 100%;
  height: 8px;
  background-color: #ffffff;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
  /* box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25); */
  border-radius: 100px;
  overflow: hidden;
`;

const ProgressStyle = (percentage: string) => css`
  width: ${percentage}%;
  background-color: ${Colors.primary2};
  height: inherit;
`;

const GaugeFooterStyle = (visibleType: string) => css`
  display: flex;
  justify-content: end;
  padding: ${visibleType === "min" ? "0 0 6px 0" : "6px 0 0 0"};
`;
const ProgressVisibleStyle = css`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 9px;
  line-height: 11px;
  letter-spacing: -0.03em;
  color: ${Colors.primary4};
`;

export type ProgressBarBodyProps = {
  value: number;
  total: number;
  progressVisible?: boolean;
  visibleType?: "percentage" | "value" | "min";
  toFixed?: number;
};

// ASD 392 모델 런 실행 전에 사용되는 최소 시간 텍스트 보여주는 타입 추가
const ProgressBarBody = ({
  value,
  total,
  progressVisible = false,
  visibleType = "percentage",
  toFixed,
}: ProgressBarBodyProps) => {
  const percentage = ((value / total) * 100).toFixed(toFixed || 0);
  const getProgressText = (visibleType: "percentage" | "value" | "min") => {
    if (visibleType === "percentage") {
      return `${percentage}%/100%`;
    } else if (visibleType === "value") {
      return `${value.toFixed(toFixed || 0)}/${total.toFixed(toFixed || 0)}`;
    }
    return `Remaining Estimated / ${value.toFixed(toFixed || 0)} min`;
  };

  return (
    <div>
      {progressVisible && visibleType === "min" && (
        <div css={[GaugeFooterStyle(visibleType)]}>
          <span css={ProgressVisibleStyle}>{getProgressText(visibleType)}</span>
        </div>
      )}
      <div css={ProgressBarBodyContainerWrap}>
        <div css={() => ProgressStyle(percentage)}></div>
      </div>
      {progressVisible && visibleType !== "min" && (
        <div css={[GaugeFooterStyle(visibleType)]}>
          <span css={ProgressVisibleStyle}>{getProgressText(visibleType)}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBarBody;
