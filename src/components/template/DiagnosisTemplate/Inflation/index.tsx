import React from "react";
import { css } from "@emotion/react";
import BasicBox from "src/components/atoms/BasicBox";
import * as Typography from "@styles/typography";
import { BiFileFind } from "react-icons/bi";
import { convertData } from "src/components/_temp/v2/customCharts/TreemapChartGradient/convertData";
import SingleScoreChart from "src/components/_temp/v2/customCharts/SingleScoreChart";
import TreemapChartGradient, { isValidNumber } from "@components/_temp/v2/customCharts/TreemapChartGradient";

const selectStyle = css`
  width: 238px;
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

const Inflation = ({ data }) => {
  const { score, treemap } = data;
  const gradData = convertData(treemap, 3, 50);

  const treemapformatter = function (info: any) {
    const { value } = info;

    const weight = isValidNumber(value[1]) ? value[1] + "%" : "-";
    const inflationScore = isValidNumber(value[3]) ? value[3] : "-";

    return [
      '<div class="tooltip-title">' + info.name + "</div>",
      "Weight: &nbsp;&nbsp;" + weight + "<br>",
      "Inflation Score: &nbsp;&nbsp;" + inflationScore,
    ].join("");
  };

  return (
    <div id="Inflation">
      <BasicBox borderColor="#CED9E1" paddingTop={28} paddingRight={35} paddingBottom={35} paddingLeft={35}>
        <Typography.Subtitle2 color="#2F3B43" lineHeight="18.15px">
          Stock Diagnosis - Inflation
          <BiFileFind
            size={17}
            css={css`
              margin-left: 7px;
            `}
          />
        </Typography.Subtitle2>
        <Typography.Body5
          color="#9DA6AD"
          lineHeight="12.89px"
          css={css`
            margin-top: 10px;
            margin-bottom: 20px;
          `}
        >
          The score represents how much your portfolio is exposed to Inflation movement. When the score is positive, The
          higher Inflation score is, The better your portfolio performs and vice versa. (Score range : -100 ~ +100)
        </Typography.Body5>
        <div>
          <Typography.Subtitle2 color="#2F3B43" lineHeight="18.15px">
            Inflation Score
          </Typography.Subtitle2>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <div>
              <div
                css={css`
                  width: 490px;
                  height: 229px;
                  position: relative;
                  border-bottom: 1px dashed #9fadb7;
                  padding-top: 10px;
                `}
              >
                <Typography.Body4 color="#9DA6AD" lineHeight="14.52px">
                  My Portfolio
                </Typography.Body4>
                <SingleScoreChart
                  isLoading={false}
                  value={score[0].scores.Inflation}
                  name={score[0].name}
                  fontSize={60}
                  lineWidth={13}
                  containerCss={css`height: 181px;width: 181px; position: absolute;right:0;top:10px;`} // prettier-ignore
                />
              </div>
              <div
                css={css`
                  width: 490px;
                  height: 229px;
                  position: relative;
                  padding-top: 37px;
                `}
              >
                <select css={selectStyle} name="pets" id="pet-select">
                  <option value="">Benchmark: S&P 500</option>
                  {/* <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="hamster">Hamster</option>
                  <option value="parrot">Parrot</option>
                  <option value="spider">Spider</option>
                  <option value="goldfish">Goldfish</option> */}
                </select>
                <SingleScoreChart
                  isLoading={false}
                  value={score[1].scores.Inflation}
                  name={score[1].name}
                  fontSize={60}
                  lineWidth={13}
                  containerCss={css`height: 181px;width: 181px; position: absolute;right:0;top:37px;`} // prettier-ignore
                />
              </div>
            </div>
            <TreemapChartGradient
              isLoading={false}
              rowData={gradData}
              // rowData={treemap}
              visualDimension={4}
              tooltipFormatter={treemapformatter}
              containerCss={css`width: 864px;height: 460px;`} // prettier-ignore
            />
          </div>
        </div>
      </BasicBox>
    </div>
  );
};

export default Inflation;
