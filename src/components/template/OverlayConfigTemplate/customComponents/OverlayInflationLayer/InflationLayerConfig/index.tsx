import React, { ChangeEvent, useState, useEffect, useCallback } from "react";
import { css } from "@emotion/react";
import * as Typography from "@styles/typography";
import Colors from "@styles/colors";
import { flexColumn, flexRow, flexRowBetween } from "@styles";
import RadioSelection from "@components/template/OverlayConfigTemplate/customComponents/OverlayConfigSidebar/RadioSelection";
import TiltingRangebar from "./TiltingRangebar";
import Input from "./Input";
import MultiInput from "./MultiInput";
import BasicBox from "@components/atoms/BasicBox";
import HelpTooltip from "@components/molecules/HelpTooltip";

const PfOlLayerConfigModelCss = css`
  padding-bottom: 24px;
  border-bottom: 1px dashed ${Colors.diagnosisThemeTableBorder};
`;

const PfOlRadioSelectionWrapCss = css`
  ${flexRow};
  padding: 13px 0 0 21px;
  & > div:first-of-type {
    padding-right: 35px;
  }
`;

const PfOlLayerConfigTiltingCss = css`
  ${flexColumn};
  padding: 16px 0 20px 0;
  border-bottom: 1px dashed ${Colors.diagnosisThemeTableBorder};
`;

const PfOlLayerConfigTiltingWrapCss = css`
  ${flexRow};
  padding: 17px 0 0 24px;
`;

const PfOlLayerConfigOtherCss = css`
  padding: 19px 0 21px 0;
`;

const PfOlLayerConfigRadioWrapCss = css`
  padding: 15px 56px 14px 19px;
  border-bottom: 1px dashed ${Colors.diagnosisThemeTableBorder};
  & > div {
    padding-bottom: 7px;
  }
  & > div:first-of-type {
    padding-bottom:14px;
  }
  & > div:nth-of-type(4){
    padding-top:13px;
  }
`;

const PfOlLayerConfigTurnoverCss = css`
  ${flexRowBetween}
  padding-right:56px;
`;

export type LayerConfigDataType = {
  model: string;
  tilting: string;
  option: {
    name: string;
    weight: string;
    holdings: string;
  };
  turnover: string;
};

// Overlay => Layer configuration 관련된 컴포넌트
const PfOverlayLayerConfig = ({}) => {
  // 첫번째 라인 -> 모델 셀렉션하는 state
  const [selectedModel, setSelectedModel] = useState("QRAFT ML Model");
  // Other investment universe에서 옵션 선택하는 state
  const [selectedOption, setSelectedOption] = useState("");
  const [tiltingValue, setTiltingValue] = useState("");
  const [turnoverValue, setTurnoverValue] = useState("");
  // 모든 데이터들을 가지고 있는 객체
  const [layerConfigData, setLayerConfigData] = useState<LayerConfigDataType>(

    {
      model: "QRAFT ML Model",
      tilting: "",
      option: {
        name: "",
        weight: "",
        holdings: "",
      },
      turnover: "",
    }

  );

  const onSelectModelHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedModel(value);
  };

  const onSelectOptionHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedOption(value);
  };

  const onValChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setTiltingValue(value);
  };

  const onTurnOverChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setTurnoverValue(value);
  };

  // 나중에 백에 해당 데이터 선택 후 post 요청
  useEffect(() => {
    // const apiHandler = async () =>
    //   await fetch("/api", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(layerConfigData),
    //   });
    // apiHandler();
  }, [layerConfigData]);


  useEffect(() => {
    // console.log('LC PAGE layerConfigData INIT : ', layerConfigData)
  }, []);



  return (
    <BasicBox
      width={451}
      height={662}
      borderColor={Colors.borderPrimary}
      paddingTop={20}
      paddingBottom={163}
      paddingLeft={18}
      paddingRight={21}
    >
      <div css={PfOlLayerConfigModelCss}>
        <Typography.Body2 color={Colors.buttonSubmit}>
          Inflation Overlay Model
        </Typography.Body2>
        <div css={PfOlRadioSelectionWrapCss}>
          <RadioSelection
            id="QRAFT ML Model"
            name="overlay-model"
            value="QRAFT ML Model"
            checked={selectedModel === "QRAFT ML Model"}
            handleChange={onSelectModelHandler}
            label="QRAFT ML Model"
            fontSize={11}
            fontWeight={500}
          />
          <RadioSelection
            id="Historical Method"
            name="overlay-model"
            value="Historical Method"
            checked={selectedModel === "Historical Method"}
            handleChange={onSelectModelHandler}
            label="Historical Method"
            fontSize={11}
            fontWeight={500}
          />
        </div>
      </div>
      <div css={PfOlLayerConfigTiltingCss}>
        <div css={css`display: flex; flex-direction: row; align-items: flex-start;`}>
          <Typography.Body2 color={Colors.buttonSubmit} css={css`display:flex;align-items:center; padding-right: 3px;`}>
            Overlay Titling Strength
          </Typography.Body2>
          <HelpTooltip
            size={14}
            title="Overlay Titling Strength"
            description="As the strength higher, holdings with higher impact scores are overweighted"
            tooltipBoxCss={css`left: 7px;top: 8px;`} // prettier-ignore
          />
        </div>
        <div css={PfOlLayerConfigTiltingWrapCss}>
          <TiltingRangebar
            min={0}
            max={10}
            onTiltingValChangeHandler={onValChange}
            value={tiltingValue}
          />
          <Input
            name="tilting"
            value={tiltingValue}
            onChange={onValChange}
          />
        </div>
      </div>
      <div css={PfOlLayerConfigOtherCss}>
        <Typography.Body2 color={Colors.buttonSubmit}>
          Add Other Investment Universe Option
        </Typography.Body2>
        <div css={PfOlLayerConfigRadioWrapCss}>
          <RadioSelection
            id="None"
            name="universe_option"
            value="None"
            checked={selectedOption === "None"}
            handleChange={onSelectOptionHandler}
            label="None (Only My Portfolio Universe)"
            fontSize={11}
            fontWeight={500}
          />
          <RadioSelection
            id="All Possible"
            name="universe_option"
            value="All Possible"
            checked={selectedOption === "All Possible"}
            handleChange={onSelectOptionHandler}
            label="All Possible (SNP 500 index)"
            fontSize={11}
            fontWeight={500}
          />
          <MultiInput
            type="all"
            setLayerConfigData={setLayerConfigData}
            selectedModel={selectedModel}
            selectedOption={selectedOption}
            tiltingValue={tiltingValue}
            turnoverValue={turnoverValue}
          />
          <RadioSelection
            id="Impact Score"
            name="universe_option"
            value="Impact Score"
            checked={selectedOption === "Impact Score"}
            handleChange={onSelectOptionHandler}
            label="Impact Score based Recommended Universe"
            fontSize={11}
            fontWeight={500}
          />
          <MultiInput
            type="impact"
            setLayerConfigData={setLayerConfigData}
            selectedModel={selectedModel}
            selectedOption={selectedOption}
            tiltingValue={tiltingValue}
            turnoverValue={turnoverValue}
          />
        </div>
      </div>
      <div css={PfOlLayerConfigTurnoverCss}>
        <Typography.Body2 color={Colors.buttonSubmit}>
          Turnover Ratio Limit
        </Typography.Body2>
        {/* prettier-ignore */}
        <div css={css`${flexRow}`}>
          <Input
            name="turnover"
            value={turnoverValue}
            onChange={onTurnOverChange}
          />
          <Typography.Body4 css={css`padding-left:4px;`} color={Colors.button3Text}>%</Typography.Body4>
        </div>
      </div>
    </BasicBox>
  );
};

export default PfOverlayLayerConfig;