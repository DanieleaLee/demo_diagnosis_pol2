import React from "react";
import { css } from "@emotion/react";
import {flexColumn } from "@styles";
import * as Typography from "@styles/typography";
import Colors from "@styles/colors";
import {ContentsType} from "@components/template/OverlayResultTemplate/customComponents/FilterBox";
import OverlayBalloon from "@components/template/OverlayConfigTemplate/customComponents/NewTechLayer/OverlayBalloon";
import {DataType, PeriodData} from "@components/template/OverlayResultTemplate/customComponents/ChartPerformance";

const PfOlDateBarBodyCss = (width: number = 805) => css`
  width: ${width}px;
  height: auto;
  position: relative;
  cursor: pointer;
  .tooltip {
    position: absolute;
    display: none;
  }
`;

const PfOlDateBarCss = (
  background: string,
  height: number = 20,
  left,
  width
) => css`
  background: ${background};
  height: ${height}px;
  width: ${width}px;
  border-radius: 0 0 100px 100px;
  position: absolute;
  left: ${left}px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;

  &:hover .tooltip {
    visibility: visible;
    display: inline-block;
    top: -47px;
  }

  &:hover {
    border: 1px solid rgba(81, 255, 221, 0.57);
  }
`;

const PfOverlayBalloonTxtStyle = css`
  ${flexColumn};
  text-align: center;
  padding: 4px 0;
`;

interface Props {
  background: string;
  name: string;
  id: number;
  start?: string;
  end?: string;
  contents: ContentsType;
  onSelectDatebar?: (selected: number | string) => void;
  selectedDatebarId?: DataType[];
  selectedDatebarDate?: PeriodData[];
  selectedDatebar?: number | string;
}

const getDateIndex = (obj_, yearMonthList) => {
  const startDateIndex = yearMonthList.indexOf(
    obj_.start_date.replaceAll("-", ".").slice(0, -3)
  );
  const endDateIndex = yearMonthList.indexOf(
    obj_.end_date.replaceAll("-", ".").slice(0, -3)
  );
  let background, height;
  switch (obj_.name) {
    case "Whole":
      background = "#0e136978";
      height = 6;
      break;
    case "High Inflation":
      background = "rgba(68, 100, 216, 0.8);";
      height = 9;
      break;
    case "Mid Inflation":
      background = "rgba(68, 74, 216, 0.5);";
      height = 9;
      break;
    case "Low Inflation":
      background = "rgba(115, 68, 216, 0.2);";
      height = 9;
      break;
  }
  const result = {
    ...obj_,
    startDateIndex: startDateIndex,
    endDateIndex: endDateIndex,
    background: background,
    height: height
  };
  return result;
};

const DateBar = ({
  axisList,
  name,
  data,
  wholeMonths,
  wholeWidth,
  onSelectDatebar
}) => {
  const yearMonthList = axisList
    .map((el, i) => {
      const year = el;
      const months =
        i < axisList.length - 1
          ? [...Array(12).keys()].map((v, i) =>
              String(i).length < 2 ? "0" + (i + 1) : i + 1
            )
          : [...Array((wholeMonths % 12) + 2).keys()].map((v, i) =>
              String(i).length < 2 ? "0" + (i + 1) : i + 1
            );
      const yearMonth = months.map((month, i) =>
        [String(year), String(month)].join(".")
      );
      return yearMonth;
    })
    .flat();

  const totalMonths = yearMonthList.length;
  const unit = Number(wholeWidth / totalMonths);

  const barList =
    data &&
    data.map((el, i) => {
      return getDateIndex(el, yearMonthList);
    });

  return (
    <div css={[PfOlDateBarBodyCss(wholeWidth)]}>
      {barList &&
        barList.map((el, i) => {
          return (
            <div
              key={i}
              css={[
                PfOlDateBarCss(
                  el.background,
                  el.height,
                  el.startDateIndex * unit,
                  (el.endDateIndex - el.startDateIndex) * unit
                )
              ]}
              onClick={() => {
                onSelectDatebar(el.id);
              }}
            >
              <OverlayBalloon
                className="tooltip"
                triangleSize={5}
                width={105}
              >
                <div css={PfOverlayBalloonTxtStyle}>
                  <Typography.Body5 color={Colors.backgroundWhite}>
                    {el.name}
                  </Typography.Body5>
                  <Typography.Body6 color={Colors.backgroundWhite}>
                    {el.start_date.replaceAll("-", ".").slice(0, -3) + " "}~
                    {" " + el.end_date.replaceAll("-", ".").slice(0, -3)}
                  </Typography.Body6>
                </div>
              </OverlayBalloon>
            </div>
          );
        })}
    </div>
  );
};

export default DateBar;
