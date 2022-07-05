import React, { useState } from "react";
import { BiFileFind, BiHelpCircle } from "react-icons/bi";
import { css } from "@emotion/react";
import * as Typography from "@styles/typography";
import Colors from "@styles/colors";
import { flexCenter, flexRow } from "@styles";
import { newTech_keyword } from "src/data/newTech_keyword";
import Tag from "./Tag";
import Checkbox from "./Checkbox";
import NewTechBox from "./NewTechBox";
import NewTechKeywordTable from "./NewTechKeywordTable";
import NewTechSearchbar from "./NewTechSearchbar";
import OverlayBalloon from "./OverlayBalloon";
import RangeBar from "./Rangebar";
import RadioSelection from "@components/template/OverlayConfigTemplate/customComponents/OverlayConfigSidebar/RadioSelection";
import { flexRowStyle } from "@components/template/OverlayConfigTemplate";
import ClusterChart from "@components/customCharts/ClusterChart";

const containerWrap = (width, height) => css`
  width: ${width}; // 추후에 100%로 변경 예정
  height: ${height}; // 추후에 100%로 변경 예정
  position: relative;
  ${flexRow};
  border: 1px solid ${Colors.primary6};
  border-radius: 8px;
  padding: 17px 0 0 28px;
  background: ${Colors.backgroundWhite};
`;

const bodyWrap = (width) => css`
  width: ${width};
  height: 100%;
`;

const bodyContentsWrap = (
  height,
  borderColor = "#fff",
  borderRadius = "0px",
  bgColor = "#fff",
  margin,
  padding
) => css`
  width: 100%;
  height: ${height};
  border: 1px solid ${borderColor};
  border-radius: ${borderRadius};
  background-color: ${bgColor};
  margin: ${margin};
  padding: ${padding};
`;

const innerContentsWrap = (borderSize) => css`
  width: 100%;
  height: auto;
  border-bottom: ${borderSize} dashed ${Colors.diagnosisThemeTableBorder};
`;
const checkboxTxtStyle = css`
  color: ${Colors.buttonSubmit};
  font-family: "Inter";
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  padding-top: 7px;
`;

const tbUpperStyle = css`
  display: flex;
  justify-content: space-between;

  input {
    &::placeholder {
      font-family: "Inter";
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      color: ${Colors.primary7};
    }
  }
`;

const chartWrapStyle = css`
  width: 100%;
  ${flexCenter};
  padding-top: 26px;
`;

const checkboxWrap = css`
  & > div {
    display: inline-block;
    padding-right: 23px;
  }
`;

const tagWrap = css`
  padding-left: 16px;
  padding-bottom: 9px;
  position: relative;
  cursor: pointer;

  .tooltip {
    position: absolute;
    display: none;
  }

  & > div {
    margin-right: 6px;
    margin-bottom: 9px;
  }
`;

const tooltipWrap = css`
  display: inline-flex;
  text-align: center;
  color: #fff;
  white-space: pre-wrap;
  cursor: pointer;
  position: relative;

  &:hover .tooltip {
    visibility: visible;
    display: inline-block;
    bottom: 32px;
    right: -30px;
    font-size: 10px;
    font-weight: 400;
    line-height: 12px;
    z-index: 999;
  }
`;

const searchbarWrap = css``;

const dummy = [
  { id: 1, title: "Yours", subTilte: ["Sensor", "Contactless", "Awareness"] },
  {
    id: 2,
    title: "Market Overall",
    subTilte: ["Sensor", "Contactless", "Awareness"]
  },
  {
    id: 3,
    title: "Big Techs",
    subTilte: ["Sensor", "Contactless", "Awareness"]
  }
];

const TAG_DUMMY = [
  { id: 1, title: "Portfoilo Type", element: "Asset Allocations" },
  { id: 2, title: "Source", element: "Porftolio Generation" },
  { id: 3, title: "# of Holdings", element: "8" },
  { id: 4, title: "Underlaying Assets", element: "Indices" },
  { id: 5, title: "# of Holdings", element: "8" },
  { id: 6, title: "# of Holdings", element: "8" }
];

export type NewTechDataType = {
  id: number;
  keyword: string;
  trending: number;
  ratio: string;
  constraints?: string;
};

const NewTechLayer = () => {
  const [_data, setData] = useState<NewTechDataType[]>(newTech_keyword);
  const [_value, setValue] = useState("");

  const FILTERED_DATA = _data.filter((d) =>
    d.keyword.toString().toLowerCase().includes(_value.toString().toLowerCase())
  );

  const handleChange = (value: string) => {
    setValue(value);
  };

  const removeTbData = (id: number) => {
    setData((prev) => {
      const temp = [...prev];
      temp.splice(id, 1);
      return temp;
    });
  };

  return (
    <div css={[containerWrap("1108px", "719px")]}>
      <div css={[bodyWrap("433px")]}>
        <div
          css={[
            bodyContentsWrap(
              "24px",
              Colors.backgroundWhite,
              "0px",
              Colors.backgroundWhite,
              "0 0 4px 0",
              "0px"
            ),
            flexRowStyle
          ]}
        >
          <Typography.Body2
            css={css`
              padding-right: 5px;
            `}
            color={Colors.buttonSubmit}
          >
            New Tech & Value Overlay
          </Typography.Body2>
          <BiFileFind color="#484848" />
        </div>
        <div
          css={[
            bodyContentsWrap(
              "80px",
              "#fff",
              "4px",
              "#fff",
              "0 0 4px 0",
              "5px 0 0 0"
            )
          ]}
        >
          <Typography.Body5 color={Colors.hint}>
            This layer implements
          </Typography.Body5>
        </div>
        <div
          css={[
            bodyContentsWrap(
              "221px",
              Colors.primary6,
              "4px",
              Colors.diagnosisSummaryBg,
              "0 0 14px 0",
              ""
            )
          ]}
        >
          <div
            css={[
              flexRowStyle,
              css`
                padding: 14px 5px 15px 15px;
              `
            ]}
          >
            <Typography.Body2
              css={css`
                padding-right: 4px;
              `}
              color={Colors.buttonSubmit}
            >
              Top 3 Tech Feature
            </Typography.Body2>
            <BiHelpCircle size={11.67} color={Colors.buttonSubmit} />
          </div>
          <div
            css={css`
              display: flex;
              justify-content: space-around;
            `}
          >
            {dummy.map((i) => (
              <NewTechBox key={i.id} title={i.title} subTitle={i.subTilte} />
            ))}
          </div>
        </div>
        <div
          css={[
            bodyContentsWrap(
              "341px",
              Colors.primary6,
              "4px",
              Colors.diagnosisSummaryBg,
              "",
              ""
            )
          ]}
        >
          <div
            css={[
              flexRowStyle,
              css`
                padding: 14px 0 0 15px;
              `
            ]}
          >
            <Typography.Body2
              css={css`
                padding-right: 4px;
              `}
              color={Colors.buttonSubmit}
            >
              New Tech Cluster Map
            </Typography.Body2>
            <BiHelpCircle size={11.67} color={Colors.buttonSubmit} />
          </div>
          <div css={[chartWrapStyle]}>
            <div
              css={css`
                width: 431px;
                height: 270px;
              `}
            >
              <ClusterChart
                isLoading={false}
                animation={true}
                data={[]}
                top={7}
                right={20}
                containerCss={css`
                  height: 100%;
                  width: 100%;
                  background-color: transparent;
                `}
              />
            </div>
          </div>
        </div>
      </div>
      <div css={[bodyWrap("605px")]}>
        <Typography.Body1
          css={css`
            padding-left: 15px;
          `}
          color={Colors.buttonSubmit}
        >
          Layer Configuration
        </Typography.Body1>
        <div
          css={[
            bodyContentsWrap(
              "662px",
              Colors.borderPrimary,
              "6px",
              Colors.diagnosisSummaryBg,
              "9px 0 0 15px",
              "16px 23px 22px 15px"
            )
          ]}
        >
          <div css={[innerContentsWrap("1px")]}>
            <div css={[flexRowStyle]}>
              <Typography.Body2
                css={css`
                  padding-right: 5px;
                `}
                color={Colors.buttonSubmit}
              >
                New Tech Overlay Model
              </Typography.Body2>
              <BiFileFind color="#484848" />
            </div>
            <div
              css={[
                flexRowStyle,
                css`
                  padding: 12px 0 20px 20px;
                  & > div:first-of-type {
                    min-width: 230px;
                  }
                `
              ]}
            >
              <RadioSelection
                id="cluster"
                name="model"
                value="cluster"
                label="Qraft NewTech Stock Cluster"
                fontSize={11}
                fontWeight={500}
                width={15}
                height={15}
              />
              <RadioSelection
                id="keyword"
                name="model"
                value="keyword"
                label="Qraft New Tech Keyword Model"
                fontSize={11}
                fontWeight={500}
                width={15}
                height={15}
              />
            </div>
          </div>
          <div css={[innerContentsWrap("1px")]}>
            <div
              css={[
                flexRowStyle,
                css`
                  padding: 14px 0 0 0;
                `
              ]}
            >
              <Typography.Body2 color={Colors.buttonSubmit}>
                Optimization Scheme
              </Typography.Body2>
            </div>
            <div
              css={[
                flexRowStyle,
                css`
                  padding: 15px 0 0 16px;
                  & > div:first-of-type {
                    min-width: 230px;
                  }
                `
              ]}
            >
              <RadioSelection
                id="tech"
                name="scheme"
                value="tech"
                label="Tech"
                fontSize={11}
                fontWeight={500}
                width={15}
                height={15}
              />
              <RadioSelection
                id="method"
                name="scheme"
                value="method"
                label="Historical Method"
                fontSize={11}
                fontWeight={500}
                width={15}
                height={15}
              />
            </div>
            <div
              css={css`
                padding: 10px 0 20px 14px;
              `}
            >
              <div css={[checkboxWrap]}>
                <Checkbox
                  width={18}
                  height={18}
                  label="Turnover restriction"
                  containerCss={checkboxTxtStyle}
                />
                <div
                  css={css`
                    position: relative;
                    top: -5px;
                    .balloon {
                      right: -15px;
                    }
                  `}
                >
                  <RangeBar rowData={[{ id: "1" }]} rowId="1" value={50}/>
                </div>
              </div>
              <Checkbox
                width={18}
                height={18}
                label="Exclude small cap stocks"
                containerCss={checkboxTxtStyle}
              />
            </div>
          </div>
          <div css={[innerContentsWrap("1px")]}>
            <div css={[flexRowStyle]}>
              <Typography.Body2
                css={css`
                  padding-bottom: 10px;
                  padding-top: 14px;
                `}
                color={Colors.buttonSubmit}
              >
                Smart Keyword Recommendation
              </Typography.Body2>
            </div>
            <div css={[tagWrap]}>
              {TAG_DUMMY.map((t) => (
                <div key={t.id} css={tooltipWrap}>
                  <OverlayBalloon
                    className="tooltip"
                    width={121}
                    height={56}
                    triangleSize={13}
                  >{`${t.title} is\nrecommended\nbecause`}</OverlayBalloon>
                  <Tag
                    title={t.title}
                    element={t.element}
                    fontSize={11}
                    fontWeight={500}
                    lineHeight={13}
                  />
                </div>
              ))}
            </div>
          </div>
          <div css={[innerContentsWrap("0px")]}>
            <div
              css={[
                tbUpperStyle,
                css`
                  padding: 14px 0 23px 0;
                `
              ]}
            >
              <Typography.Body2 color={Colors.buttonSubmit}>
                Keyword Selection
              </Typography.Body2>
              <div css={[searchbarWrap]}>
                <NewTechSearchbar
                  width={402}
                  height={32}
                  value={_value}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div css={[innerContentsWrap("0px")]}>
            <NewTechKeywordTable data={FILTERED_DATA} onRemove={removeTbData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTechLayer;
