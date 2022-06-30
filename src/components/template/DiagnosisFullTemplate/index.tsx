import React, { useState } from "react";
import DiagnosisTemplate from "@components/template/DiagnosisTemplate"; // 0512
import OverlayConfigTemplate from "@components/template/OverlayConfigTemplate"; // 0512
import OverlayResultTemplate from "@components/template/OverlayResultTemplate"; // 0512
import ArchiveTemplate from '@components/template/ArchiveTemplate';
import { BODY_BUTTONS_HEIGHT } from "src/config/constants";
import { css } from "@emotion/react";
import Colors from "@styles/colors";
import { useRouter } from "next/router";


export const bodyMainWrap = css`
  background-color: ${Colors.backgroundPrimary1};
  /* height: calc(100% - ${BODY_BUTTONS_HEIGHT.split("px")[0]}px); */
  height: 100%;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  overflow: hidden;
  /* border: 3px solid red; */
`;


function DiagnosisFullTemplate() {
    const router = useRouter();
    const [dataDiagnosis, setDataDiagnosis] = useState("prev");
    const [dataOverlayConfig, setDataOverlayConfig] = useState(1);
    const [selectedPortfolioName, setSelectedPortfolioName] = useState("portfolio2");
    const [dataOverlayResult, setDataOverlayResult] = useState(1);

    return (
    <>
    <div
        css={css`
          position: absolute;
          top: 0px;
          z-index: 99;
        `}
      >
        <button onClick={() => router.push("/archive")}>Archive</button>
        <button onClick={() => router.push("/diagnosis")}>Diagnosis</button>
        <button onClick={() => router.push("/overlayconfig")}>Overlay Cofing</button>
        <button onClick={() => router.push("/overlayresult")}>Overlay Result</button>
      </div>

      {router.asPath === "/archive" && (
        <main css={[bodyMainWrap]}>
          <ArchiveTemplate 
            dataDiagnosis={dataDiagnosis} 
            setDataDiagnosis={setDataDiagnosis}
            selectedPortfolioName={selectedPortfolioName}
            setSelectedPortfolioName={setSelectedPortfolioName}
          />
        </main>
      )}
      {router.asPath === "/diagnosis" && (
        <main css={[bodyMainWrap]}>
          <DiagnosisTemplate 
            dataDiagnosis={dataDiagnosis} 
            portfolioName={selectedPortfolioName} 
            setSelectedPortfolioName={setSelectedPortfolioName} 
          />
        </main>
      )}
      {router.asPath === "/overlayconfig" && (
        <main css={[bodyMainWrap]}>
          <OverlayConfigTemplate
            dataDiagnosis={dataDiagnosis}
            dataOverlayConfig={dataOverlayConfig}
            setDataOverlayConfig={setDataOverlayConfig}
            dataOverlayResult={dataOverlayResult}
            setDataOverlayResult={setDataOverlayResult}
            portfolioName={selectedPortfolioName}
            setSelectedPortfolioName={setSelectedPortfolioName}
          />
        </main>
      )}
      {router.asPath === "/overlayresult" && (
        <main css={[bodyMainWrap]}>
          <OverlayResultTemplate
            portfolioName={selectedPortfolioName}
          />
        </main>
      )}
    </>
  )
}

export default DiagnosisFullTemplate