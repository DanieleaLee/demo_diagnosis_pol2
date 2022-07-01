import { css } from "@emotion/react";
import { useRef, useState } from "react";
import Colors from "@styles/colors";
import { BODY_BUTTONS_HEIGHT } from "src/config/constants";
import * as Typography from "@styles/typography";
import { HiServer } from "react-icons/hi";
import * as TextButton from "@components/atoms/TextButton";
import LinkToIndex from "@components/template/DiagnosisTemplate/customComponents/LinkToIndex";
import Summary from "@components/template/DiagnosisTemplate/customComponents/Summary";
import StockInfo from "@components/template/DiagnosisTemplate/customComponents/StockInfo";
import GicsSectors from "@components/template/DiagnosisTemplate/customComponents/GicsSectors";
import QraftFactors from "@components/template/DiagnosisTemplate/customComponents/QraftFactors";
import Inflation from "@components/template/DiagnosisTemplate/customComponents/Inflation";
import diagnosisData from "src/data/diagnosis";
import { useRouter } from "next/router";


// 알맹이 wrap 그린
export const bodyContainerWrap = (width, height, bgColor, blColor) => css`
  width: ${width};
  height: ${height};
  background-color: ${bgColor};
  /* border: 1px solid ${blColor}; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  overflow-x: scroll;
  @media (max-width: 1852px) {
    align-items: flex-start;
    /* background-color: blue; */
  }
`;

export const bodyHeadWrap = (width) => css`
  width: ${width};
  height: ${BODY_BUTTONS_HEIGHT};
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  > p {
    padding-bottom: 30px; // SubTitle : Overlay
  }
`;

export const bodyHeadIcon = (width) => css`
  width: ${width};
  /* background-color: red; */
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  padding-bottom: 3px; // 버튼들 살짝 띄우기
`;

// 옐로 - 스크롤
export const bodyMainWrap = (
  width = "100%",
  height = "100%",
  bgColor,
  blColor,
  paddingTop = "0px",
  paddingRight = "0px",
  paddingBottom = "0px",
  paddingLeft = "0px"
) => css`
  width: ${width};
  height: ${height};
  min-width: 1504px;
  background-color: ${bgColor};
  /* border: 1px solid ${blColor}; */
  padding-top: ${paddingTop};
  padding-right: ${paddingRight};
  padding-bottom: ${paddingBottom};
  padding-left: ${paddingLeft};
  padding-left: ${paddingLeft};
  display: flex;
  flex-direction: row;
  justify-content: center; // 이놈이 문제
  overflow-y: scroll;
  overflow-x: hidden;
  @media (max-width: 1852px) {
    justify-content: flex-start;
    /* background-color: blue; */
  }
  /* overflow-x: scroll; */
`;

export const bodyMain = (width) => css`
  width: ${width};
  display: flex;
  flex-direction: row;
  /* border: 1px solid purple; */
  height: 500px;
`;

export const bodyItem = (width) => css`
  width: ${width};
  height: 100%;
  position: relative;
`;

const verticalFlexGap = (gap: number) => css`
  display: flex;
  flex-direction: column;
  gap: ${gap ? gap : 0}px;
`;

const selectStyle = css`
  width: 140px;
  height: 26px;
  border: 1px solid #9da6ad;
  border-radius: 4px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #5b6266;
`;

// 추후 Mode선택 시 CATEGORIES 만 변경 해주면 됨 basic(all), others(piecse)
// const CATEGORIES = ["Summary", "Stock Info", "GICS® Sectors", "QRAFT Factors", "Inflation"];
const CATEGORIES = {
  basic: ["Summary", "Stock Info", "GICS® Sectors", "QRAFT Factors", "Inflation"],
  minimum: ["Summary", "Stock Info"],
};

const DiagnosisTemplate = ({ dataDiagnosis, portfolioName,setSelectedPortfolioName }) => {
  const [mode, setMode] = useState("basic");
  const scrollBodyRef = useRef<HTMLDivElement>();
  const router = useRouter();

  const blockByCategory = {
    Summary: <Summary key="summary" data={diagnosisData[portfolioName]?.summary} portfolioName={portfolioName}/>,
    "Stock Info": <StockInfo key="info" data={diagnosisData[portfolioName]?.info} />,
    "GICS® Sectors": <GicsSectors key="sector" data={diagnosisData[portfolioName]?.sector} />,
    "QRAFT Factors": <QraftFactors key="factor" data={diagnosisData[portfolioName]?.factor} />,
    Inflation: <Inflation key="inflation" data={diagnosisData[portfolioName]?.inflation} />,
  };

  return (
    <div css={bodyContainerWrap("100%", "100%", Colors.backgroundPrimary1, "green")}>
      <div css={[bodyHeadWrap("1504px")]}>
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 33px;
            margin-bottom: 9px;
          `}
        >
          <Typography.Subtitle2 color="#2F3B43" lineHeight="18.15px">
            {`[${portfolioName}] Inflation Enhancing Version 1`}
          </Typography.Subtitle2>
          <select
            css={selectStyle}
            name="mode"
            id="mode-select"
            onChange={(e) => {
              setMode(e.target.value);
              scrollBodyRef.current.scrollTo(0, 0);
              router.push("/diagnosis");
            }}
          >
            <option value="basic">Mode : Basic</option>
            <option value="minimum">Mode : Minimum</option>
          </select>
        </div>
        <div
          css={[
            bodyHeadIcon("440px"),
            css`
              gap: 7px;
            `,
          ]}
        >
          <TextButton.Small
            title="Prev"
            disabled={false}
            bgTheme="primary"
            onClick={() => router.push("/archive")}
          />
          <TextButton.Small
            icon={(props) => <HiServer {...props} />}
            title="Overlay"
            disabled={false}
            bgTheme="accent"
            onClick={() => {
              setSelectedPortfolioName('portfolio2')
              router.push("/overlayconfig")
            }}
          />
        </div>
      </div>

      <div ref={scrollBodyRef} css={[bodyMainWrap("100%", "100%", "", "yellow"), css``]}>
        <div css={[bodyMain("1504px")]}>
          <div css={[bodyItem("1504px"), verticalFlexGap(9)]}>
            <LinkToIndex categories={CATEGORIES[mode]} />
            {CATEGORIES[mode].map((c) => blockByCategory[c])}
            <div css={css`width: 100%; padding: 30px 0;`}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisTemplate;
