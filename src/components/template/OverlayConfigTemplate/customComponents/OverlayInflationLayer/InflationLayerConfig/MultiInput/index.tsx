import React, { useState, useEffect, ChangeEvent } from "react";
import { css } from "@emotion/react";
import Colors from "@styles/colors";
import * as Typography from "@styles/typography";
import { flexRow, flexRowBetween } from "@styles";
import PfOverlayInput from "@lucian2Components/atoms/PfOverlayInput";
import { LayerConfigDataType } from "@components/template/OverlayConfigTemplate/customComponents/OverlayInflationLayer/InflationLayerConfig";

const PfOlMultiInputContainerCss = css``;

const PfOlMultiInputWeightCss = css`
  ${flexRowBetween}
  padding: 0 0 7px 20px;
`;

const PfOlMultiInputHoldingsCss = css`
  ${flexRowBetween};
  padding-left: 20px;
  input {
    margin-right: 13px;
  }
`;

interface Props {
  type: "all" | "impact";
  setLayerConfigData: React.Dispatch<React.SetStateAction<LayerConfigDataType>>;
  selectedModel: string;
  selectedOption: string;
  tiltingValue: string;
  turnoverValue: string;
}

// Overlay => Layer Configuration쪽에 Option내에 멀티 input관리하는 컴포넌트
const MultiInput = ({
  type,
  setLayerConfigData,
  selectedModel,
  selectedOption,
  tiltingValue,
  turnoverValue
}: Props) => {
  const [values, setValues] = useState({
    weight: "",
    holdings: ""
  });
  const [impactValues, setImpactValues] = useState({
    weight: "",
    holdings: ""
  });

  // All Possible vs Impact score 항목의 멀티 인풋 분기처리 ( 선택된 값들 넣어주는 로직)
  const onSelectOtherHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    switch (type) {
      case "all":
        if (name === "weight") {
          setValues({ ...values, weight: value });
        }
        if (name === "holdings") {
          setValues({ ...values, holdings: value });
        }
        break;

      case "impact":
        if (name === "weight") {
          setImpactValues({ ...impactValues, weight: value });
        }
        if (name === "holdings") {
          setImpactValues({ ...impactValues, holdings: value });
        }
        break;
    }
  };

  // PfOverlayHoldingConfig에 있던 layerConfgData에 데이터를 넣어주는 로직
  useEffect(() => {
    setLayerConfigData({
      model: selectedModel,
      tilting: tiltingValue,
      option: {
        name: selectedOption,
        weight:
          selectedOption === "None"
            ? ""
            : type === "all"
            ? values.weight
            : impactValues.weight,
        holdings:
          selectedOption === "None"
            ? ""
            : type === "all"
            ? values.holdings
            : impactValues.holdings
      },
      turnover: turnoverValue
    });
  }, [
    selectedModel,
    selectedOption,
    tiltingValue,
    turnoverValue,
    values,
    impactValues
  ]);

  return (
    <div css={PfOlMultiInputContainerCss}>
      <div css={PfOlMultiInputWeightCss}>
        <Typography.Body5 color={Colors.buttonSubmit}>
          Maximum Weight
        </Typography.Body5>
        {/* prettier-ignore */}
        <div css={css`${flexRow}`}>
          <PfOverlayInput
            name="weight"
            value={type === "all" ? values.weight : impactValues.weight}
            onChange={onSelectOtherHandler}
          />
          <Typography.Body4 css={css`padding-left:4px`} color={Colors.button3Text}>%</Typography.Body4>
        </div>
      </div>
      <div css={PfOlMultiInputHoldingsCss}>
        <Typography.Body5 color={Colors.buttonSubmit}>
          Maximum Number of Holdings
        </Typography.Body5>
        <PfOverlayInput
          name="holdings"
          value={type === "all" ? values.holdings : impactValues.holdings}
          onChange={onSelectOtherHandler}
        />
      </div>
    </div>
  );
};

export default MultiInput;
