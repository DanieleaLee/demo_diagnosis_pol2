import React, { useState } from "react";
import PfTemplate from "./templates/PfTemplate";
import { getData } from "@components/customCharts/PHLineChart/getData";
import MRTemplate from "./templates/MRTemplate";
import { css } from "@emotion/react";
import * as TextButton from "@components/atoms/TextButton";
import PfOverlayTemplate from "./templates/PfOverlayTemplate";
import PfOverlayResultTemplate from "./templates/PfOverlayResultTemplate/index";

const slcData = getData();
const slcData2 = getData();
const slcData3 = getData();

const TestTemplate = () => {
  const [step, setStep] = useState(0);

  const DOUBLE_ARRAY = [
    [5000, 1500, 900, 550, 400, 300, 400],
    [5000, 500, 180, 130, 90, 70, 80],
    [5000, 400, 110, 70, 40, 30, 30],
  ];

  return (
    <>
      <div
        css={css`
          display: flex;
          position: absolute;
          top: 10px;
          z-index: 999;
          left: 400px;
        `}
      >
        <TextButton.Small
          title="ASD-491/492"
          onClick={() => setStep(0)}
          css={css`
            background: #fff;
            border: 1px solid black;
          `}
        ></TextButton.Small>
        <TextButton.Small
          title="ASD-392"
          onClick={() => setStep(1)}
          css={css`
            background: #fff;
            border: 1px solid black;
          `}
        ></TextButton.Small>
        <TextButton.Small
          title="ASD-Overlay"
          onClick={() => setStep(2)}
          css={css`
            background: #fff;
            border: 1px solid black;
          `}
        ></TextButton.Small>
        <TextButton.Small
          title="ASD-Overlay2"
          onClick={() => setStep(3)}
          css={css`
            background: #fff;
            border: 1px solid black;
          `}
        ></TextButton.Small>
      </div>
      {/* <PfTemplate />
      <br />
      <br />
      <div
        css={css`
          width: 1411px;
          height: 321px;
        `}
      >
        <MSLogChart
          isLoading={false}
          data={DOUBLE_ARRAY}
          animation={false}
          color={["#5CC9BB", "#3B77E6", "#3476B7"]}
          title={["valid", "test", "train"]}
          containerCss={css`
            height: 100%;
            width: 100%;
          `}
        />
      </div> */}
      {step === 0 && <PfTemplate />}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {step === 1 && <MRTemplate />}
      <br />
      <br />
      <br />
      {step === 2 && <PfOverlayResultTemplate />}
      <br />
      <br />
      <br />
      {step === 3 && <PfOverlayTemplate />}
    </>
  );
};

export default TestTemplate;
