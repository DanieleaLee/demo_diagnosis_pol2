import React, { useState } from "react";
import { css, useTheme } from "@emotion/react";
import * as TextButton from "@components/atoms/TextButton";
import CheckBox from "@components/atoms/CheckBox";
import MRSummary from "@lucian2Components/molecules/MRSummary";
import MRTimeBar from "@lucian2Components/molecules/MRTimeBar";
import * as Typography from "@styles/typography";
import { flexCenter, flexColumn, flexRow } from "@styles";
import Colors from "@styles/colors";
import axios from "axios";
import { useLoadingCallback } from "../../../../../../lib/hooks/useLoadingCallback";
import { ClipLoader } from "react-spinners";
import MRPfWeightTable from "../../molecules/MRPfWeightTable/index";
import MRIndexPieChart from "../../../customCharts/MRIndexPieChart/index";
import MRRegionPieChart from "../../../customCharts/MRRegionPieChart";

const MRTemplateBodyCss = css`
  width: 100%;
  height: 100%;
  padding: 24px 39px 24px 59px;
  background-color: ${Colors.backgroundPrimary1};
  position: relative;
`;

const MRTemplateUpperBodyCss = css`
  ${flexRow}
`;

const MRTemplateUpperRightBodyCss = css`
  padding-left: 31px;
`;

const MRTemplateCheckboxWrapCss = css`
  ${flexRow}
`;

const MRTemplateSummaryTxtCss = css`
  padding: 17px 0 9px 0;
`;

const MRTemplateSummaryContainerCss = css`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 18px 25px;
  width: 100%;
  height: 563px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 93px;
`;

const MRTemplateSummaryScrollBarCss = css`
  &::-webkit-scrollbar {
    background: #ececec;
    border-radius: 1.5px;
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1.5px;
    background: ${Colors.selectCategoryAmountBg};
  }
`;

const MRTemplateStep2WrapCss = css`
  ${flexRow};
  padding-top: 9px;
`;

const MRTemplatePieChartsCss = css`
  padding-left: 7px;
`;

const MRTemplatePieChartContainerCss = css`
  width: 320px;
  height: 227px;
  border: 0.5px solid ${Colors.borderPrimary};
  border-radius: 6px;
  background-color: ${Colors.backgroundWhite};

  &:last-of-type {
    margin-top: 6px;
  }
`;

const MRTemplateButtonWrapCss = css`
  position: absolute;
  bottom: 32px;
  right: 143px;
  display: flex;
  gap: 15px;
  & button {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 1.25);
  }
`;

const MRTemplateLoadingSpinnerCss = css`
  height: 100vh;
  ${flexCenter}
`;

const MRTemplate = () => {
  const [step, setStep] = useState(0);
  const [checked, setChecked] = useState(false);
  const theme = useTheme();

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const { callback, isLoading } = useLoadingCallback(
    async (data: any) => {
      if (checked === true) {
        try {
          const res = await axios.get("");
          console.log("res", res); // 서버에서 시간 데이터 가져온다.
          setStep(1);
        } catch (err) {
          console.error(err.message);
        }
      } else {
        alert("Please click the checkbox to be checked");
      }
    },
    [checked]
  );

  const goToPrevPageHandler = () => {
    if (step === 1) setStep((prev) => prev - 1);
  };

  return (
    <div css={MRTemplateBodyCss}>
      <div css={MRTemplateUpperBodyCss}>
        {/* prettier-ignore */}
        <MRTimeBar  clickStartBtnHandler={callback} value={40} total={100} />
        <div css={MRTemplateUpperRightBodyCss}>
          <Typography.Body2 color={Colors.selectCategoryAmountBg}>
            Confirm your decision
          </Typography.Body2>
          <div css={MRTemplateCheckboxWrapCss}>
            <CheckBox checked={checked} onChange={handleChange} />
            <Typography.Body3 color={Colors.selectCategoryAmountBg}>
              I understand that this action will run with this configuration.
            </Typography.Body3>
          </div>
        </div>
      </div>
      {step === 0 && (
        <>
          <Typography.Subtitle2
            color={Colors.modelRunSummaryTextColor}
            css={MRTemplateSummaryTxtCss}
          >
            Summary
          </Typography.Subtitle2>
          {/* prettier-ignore */}
          <div css={[MRTemplateSummaryContainerCss, MRTemplateSummaryScrollBarCss]}>
            <MRSummary />
          </div>
        </>
      )}
      {step === 1 && (
        <div css={MRTemplateStep2WrapCss}>
          <MRPfWeightTable />
          <div css={MRTemplatePieChartsCss}>
            <div css={MRTemplatePieChartContainerCss}>
              <MRIndexPieChart
                data={[]}
                isLoading={false}
                containerCss={css`
                  height: 100%;
                  width: 100%;
                  margin: auto;
                `}
              />
            </div>
            <div css={MRTemplatePieChartContainerCss}>
              <MRRegionPieChart
                data={[]}
                isLoading={false}
                containerCss={css`
                  height: 100%;
                  width: 100%;
                  margin: auto;
                `}
              />
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div css={MRTemplateLoadingSpinnerCss}>
          <ClipLoader color={theme.colors.primary2} size={50} />
        </div>
      )}
      <div css={MRTemplateButtonWrapCss}>
        {/* prettier-ignore */}
        <div css={css`border-radius: 8px;`}>
          <TextButton.Normal title="Prev" bgTheme="common" onClick={goToPrevPageHandler} />
        </div>
        {/* prettier-ignore */}
        <div css={css`border-radius:8px;`}>
              <TextButton.Normal title="Next" bgTheme="accent" disabled onClick={() => {}} />
            </div>
      </div>
    </div>
  );
};

export default MRTemplate;
