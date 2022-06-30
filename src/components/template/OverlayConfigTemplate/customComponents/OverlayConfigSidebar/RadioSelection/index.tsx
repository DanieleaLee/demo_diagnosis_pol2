import React from "react";
import { css } from "@emotion/react";
import { flexRow } from "@styles";
import Colors from "@styles/colors";

const PfRadioSelectionBodyCss = (fontSize = 15, fontWeight = 400,width = 13,height = 13) => css`
  ${flexRow};
  input[type="radio"] {
    accent-color: #546a78;
    width: ${width}px;
    height:${height}px;
    cursor: pointer;
  }

  label {
    padding-left: 6px;
    font-size: ${fontSize}px;
    font-weight: ${fontWeight};
    font-family: "Inter";
    color: ${Colors.buttonSubmit};
  }
`;

interface Props {
  id: string;
  name: string;
  value?: string;
  defaultValue?: string;
  checked?: boolean;
  defualtChecked?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  display?: "none" | "";
  fontSize?: number;
  fontWeight?: number;
  width?: number;
  height?: number;
}

// Radio Button 컴포넌트
const RadioSelection = ({
  id,
  name,
  value,
  checked,
  handleChange,
  label,
  display,
  fontSize,
  fontWeight,
  width,
  height,
}: Props) => {
  return (
    <div css={[PfRadioSelectionBodyCss(fontSize, fontWeight, width, height)]}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
      />
      {display !== "none" && <label htmlFor={id}>{label}</label>}
    </div>
  );
};

export default RadioSelection;
