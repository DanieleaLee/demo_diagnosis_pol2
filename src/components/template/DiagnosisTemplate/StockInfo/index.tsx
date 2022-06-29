import React from "react";
import { css } from "@emotion/react";
import BasicBox from "@components/atoms/BasicBox";
import * as Typography from "@styles/typography";
import { BiFileFind } from "react-icons/bi";
import CummulativeRetrunLineChart from "./CummulativeRetrunLineChart";;
import LINE_DATA from "@pages/diagnosis/_temp/data/Demoport2_tilit8_line_chart.json";

const tableStyle = css`
  display: block;
  width: 100%;

  & th {
    border-bottom: 0.3px solid #9da6ad;
    height: 28px;
    text-align: center;
    vertical-align: middle;
  }
  & td {
    border-bottom: 0.5px solid #ced9e1;
    height: 58px;
    vertical-align: middle;
    text-align: center;
  }
  & tbody {
    display: block;
    height: 500px;
    overflow: auto;

    &::-webkit-scrollbar {
      background: #ececec;
      border-radius: 1.5px;
      width: 2px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 1.5px;
      background: #2f3b43;
    }
  }
  & th:nth-of-type(1),
  & td:nth-of-type(1) {
    width: 46px;
    max-width: 46px;
    text-align: left;
  }
  & th:nth-of-type(2),
  & td:nth-of-type(2) {
    width: 120px;
    max-width: 120px;
    padding: 0 10px;
  }
  & th:nth-of-type(3),
  & td:nth-of-type(3) {
    width: 61px;
    max-width: 61px;
  }
  & th:nth-of-type(4),
  & td:nth-of-type(4) {
    width: 75px;
    max-width: 75px;
  }
  & th:nth-of-type(5),
  & td:nth-of-type(5) {
    width: 70px;
    max-width: 70px;
  }
  & th:nth-of-type(6),
  & td:nth-of-type(6) {
    width: 98px;
    max-width: 98px;
  }
  & th:nth-of-type(7),
  & td:nth-of-type(7) {
    width: 84px;
    max-width: 84px;
  }
  & th:nth-of-type(8),
  & td:nth-of-type(8) {
    width: 101px;
    max-width: 101px;
  }
  & th:nth-of-type(9),
  & td:nth-of-type(9) {
    width: 94px;
    max-width: 94px;
  }
  & th:nth-of-type(10),
  & td:nth-of-type(10) {
    width: 49px;
    max-width: 49px;
  }
  & th:nth-of-type(11),
  & td:nth-of-type(11) {
    width: 99px;
    max-width: 99px;
  }
  & th:nth-of-type(12),
  & td:nth-of-type(12) {
    width: 101px;
    max-width: 101px;
  }
  & th:nth-of-type(13),
  & td:nth-of-type(13) {
    width: 104px;
    max-width: 104px;
  }
  & th:nth-of-type(14),
  & td:nth-of-type(14) {
    width: 40px;
    max-width: 40px;
  }
  & th:nth-of-type(15),
  & td:nth-of-type(15) {
    width: 85px;
    max-width: 85px;
  }
  & th:nth-of-type(16),
  & td:nth-of-type(16) {
    width: 52px;
    max-width: 52px;
  }
  & th:nth-of-type(17),
  & td:nth-of-type(17) {
    width: 92px;
    max-width: 92px;
  }
  & th:last-child,
  & td:last-child {
    /* width: 10px;
    max-width: 10px;
    border:none; */
  }
`;
const cellTextStyle = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

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
const StockInfo = ({ data }) => {
  const headers = Object.keys(data.table[0]).filter((h) => h !== "id");

  return (
    <div id="Stock Info">
      <BasicBox
        height={1036}
        borderColor="#CED9E1"
        paddingTop={28}
        paddingRight={35}
        paddingBottom={35}
        paddingLeft={35}
      >
        <Typography.Subtitle2 color="#2F3B43" lineHeight="18.15px">
          Stock Diagnosis - Stock Info
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
            margin-bottom: 25px;
          `}
        >
          Stock info is summary information of individual stocks in a portfolio. You can view the 1y historical risk
          return profile.
        </Typography.Body5>
        <div
          css={css`
            height: 289px;
            width: 100%;
            margin-bottom: 18px;
          `}
        >
          <Typography.Subtitle2 color="#2F3B43" lineHeight="18.15px">
            Cumulative return
          </Typography.Subtitle2>
          <CummulativeRetrunLineChart
            animation={false}
            colorSet={[
              ["#0A79C1", 0.1],
              ["#D47878", 0.1],
              ["#18A3FD", 0.1],
              ["#18A3FD", 0.05],
            ]}
            rowData={[
              { name: "origin", data: LINE_DATA["Original Portfolio"] },
              { name: "bm", data: LINE_DATA.Benchmark },
              { name: "over1", data: LINE_DATA["Overlaid Portfolio1"] },
              { name: "over2", data: LINE_DATA["Overlaid Portfolio2"] },
            ]}
            isLoading={false}
            containerCss={css`height: 288px;width: 100%;`} // prettier-ignore
          />
          {/* <RiskReturnScatterChart_v2
              animation={true}
              borderColor={"#546A78"}
              pointColor={"#94C9EC"}
              data={data.riskreturn}
              height={230}
              width={524}
              top={7}
              right={20}
              isLoading={false}
              containerCss={css`
                height: 100%;
                width: 100%;
                background-color: transparent;
              `}
            /> */}
        </div>
        <div
          css={css`
            margin-bottom: 10px;
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
        </div>
        <BasicBox
          height={566}
          borderColor="#CED9E1"
          paddingTop={22}
          paddingRight={17}
          paddingBottom={9}
          paddingLeft={24}
        >
          <table css={tableStyle}>
            <thead>
              <tr>
                {headers.map((header, i) => (
                  <th key={i}>
                    <Typography.Subtitle4 color="#2F3B43" lineHeight="18.15px">
                      {header.replace(" %", "")}
                    </Typography.Subtitle4>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.table.map((row, i) => (
                <tr key={i}>
                  {headers.map((h, j) => (
                    <td
                      css={css`
                        position: relative;
                        &:hover > span {
                          visibility: visible;
                        }
                      `}
                      key={j}
                    >
                      <Typography.Body3 css={cellTextStyle} color="#2F3B43" lineHeight="18.15px">
                        {row[h]}
                      </Typography.Body3>
                      <span
                        css={css`
                          position: absolute;
                          visibility: hidden;
                          background: #ececec;
                          padding: 2px 10px;
                          z-index: 2;
                          white-space: nowrap;
                          border-radius: 4px;
                        `}
                      >
                        <Typography.Body3 css={cellTextStyle} color="#2F3B43" lineHeight="18.15px">
                          {row[h]}
                        </Typography.Body3>
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </BasicBox>
      </BasicBox>
    </div>
  );
};

export default StockInfo;
