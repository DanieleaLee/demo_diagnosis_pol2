import React from "react";
import { css } from "@emotion/react";
import Colors from "@styles/colors";

const PfOverlayInputCss = css`
  width: 50px;
  height: 20px;
  outline: none;
  color: ${Colors.button2};
  background: ${Colors.diagnosisSummaryBg};
  border: 1px solid ${Colors.borderPrimary};
  border-radius: 4px;
  font-family: "Inter";
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  margin-left: 22px;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;

interface Props {
  value: string;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Overlay Page -> Layer Configuration 쪽 공통된 INPUT 컴포넌트
const PfOverlayInput = ({ value, name, onChange }: Props) => {

  return (
    <input
      type="number"
      max={10}
      css={PfOverlayInputCss}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default PfOverlayInput;
