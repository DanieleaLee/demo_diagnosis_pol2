import { css } from "@emotion/react";
import Colors from "@styles/colors";

const GaugeBarContainerWrap = css`
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

const GaugeFooterStyle = css`
  display: flex;
  justify-content: end;
  padding-top: 6px;
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

export type GaugeBarProps = {
  value: number;
  total: number;
  progressVisible?: boolean;
  visibleType?: "percentage" | "value";
  toFixed?: number;
};

const GaugeBar = ({
  value,
  total,
  progressVisible = false,
  visibleType = "percentage",
  toFixed,
}: GaugeBarProps) => {
  const percentage = ((value / total) * 100).toFixed(toFixed || 0);
  const getProgressText = (visibleType: "percentage" | "value") => {
    if (visibleType === "percentage") {
      return `${percentage}%/100%`;
    }
    return `${value.toFixed(toFixed || 0)}/${total.toFixed(toFixed || 0)}`;
  };

  return (
    <div>
      <div css={GaugeBarContainerWrap}>
        <div css={() => ProgressStyle(percentage)}></div>
      </div>
      {progressVisible && (
        <div css={GaugeFooterStyle}>
          <span css={ProgressVisibleStyle}>{getProgressText(visibleType)}</span>
        </div>
      )}
    </div>
  );
};

export default GaugeBar;

// const ProgressVisible = ({ visibleType, value, total }) => {
//   const text = ``
//   return <span css={ProgressVisibleStyle}>{percentage}%/100%</span>;
// };
