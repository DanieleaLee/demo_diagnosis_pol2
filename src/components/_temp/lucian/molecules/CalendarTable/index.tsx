import React, { useCallback, useState, useEffect } from "react";
import Holidays from "date-holidays";
import axios from "axios";
import classNames from "classnames";
import { useTheme, Theme, css } from "@emotion/react";
import { flexCenter } from "src/styles";
import Colors from "src/styles/colors";

export interface Props {
  today: moment.Moment;
  selectedDate: string;
  selectDateHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export type GetCountryCodeApi = {
  result: boolean;
  ip: string;
  country_code: string;
  country_name: {};
};

const calendarTableWrap = () => css`
  width: 100%;
  height: auto;
`;

const dateBtnStyle = (props: { theme: Theme }) => css`
  width: 2.5em;
  height: 2em;
  font-size: 10px;
  font-weight: 400;
  font-family: "Inter", sans-serif;
  line-height: 12px;
  color: ${props.theme.colors.primary4};
  ${flexCenter}
  background: transparent;
  border: none;
  &:hover {
    background: ${Colors.calendarDateHover};
    border-radius: 2px;
  }
  &:focus {
    background: ${props.theme.colors.primary2};
    color: ${props.theme.colors.backgroundWhite};
  }
  &.select {
    background: ${props.theme.colors.primary2};
    color: ${props.theme.colors.backgroundWhite};
  }
  &.selectHoliday {
    background: ${props.theme.colors.primary2};
    color: red;
  }
`;

const CalendarTable = ({
  today,
  selectDateHandler,
  selectedDate,
  ...props
}: Props) => {
  const theme = useTheme();
  // 국가 코드 담는 state
  const [countryCode, setCountryCode] = useState("");

  // 국가 코드에 따른 해당 국가에 따른 공휴일
  const hd = new Holidays(countryCode);

  // 해당 년도의 공휴일
  const getSpecificYearHolidays = hd.getHolidays(today.year());

  // 해당 년도의 공휴일의 월일
  const holidayDateArr = getSpecificYearHolidays.map((el) =>
    el.date.split(" ")[0].slice(5)
  );

  // 그 달의 시작하는 주
  const firstWeek = today.clone().startOf("month").week();

  // 1년 = 52주 + 몇 일
  // moment.js에서는 내년의 첫 주인 1로 표시..
  // 마지막 주가 1이면 53
  const lastWeek =
    today.clone().endOf("month").week() === 1
      ? 53
      : today.clone().endOf("month").week();

  const datesArray = useCallback(() => {
    let result: any = [];
    let week = firstWeek;
    // 해당 달의 총 주의 수만큼 반복.
    for (week; week <= lastWeek; week++) {
      result = result.concat(
        // week 하나안에 7일이 있으니 그 수만큼 새로운 배열을 만들어 집어넣는다.
        <tr key={week}>
          {Array(7)
            .fill(0)
            .map((data, index) => {
              let days = today
                .clone()
                .startOf("year")
                .week(week)
                .startOf("week")
                .add(index, "day");

              // DAY가 해당 월의 DAY가 아닐 경우.
              if (days.format("MM") !== today.format("MM")) {
                return (
                  <td key={index}>
                    <button
                      css={[dateBtnStyle({ theme })]}
                      disabled
                      style={{
                        color: "#dadcdd",
                      }}
                    >
                      {days.format("D")}
                    </button>
                  </td>
                );
                // 해당 연도의 공휴일의 월과 일을 포함하고 특히,
                // 일(Day)이 10미만이라면 앞에 0을 붙여서 그게 아니면 그대로
              } else if (
                holidayDateArr.includes(
                  `${days.format("MM")}-${
                    +days.format("D") < 10
                      ? `0${days.format("D")}`
                      : days.format("D")
                  }`
                )
              ) {
                return (
                  <td key={index}>
                    <button
                      css={[dateBtnStyle({ theme })]}
                      className={classNames({
                        selectHoliday:
                          selectedDate === days.format("YYYY-MM-DD"),
                      })}
                      onClick={selectDateHandler}
                      value={days.format("YYYY-MM-DD")}
                      style={{
                        color: "red",
                      }}
                    >
                      {days.format("D")}
                    </button>
                  </td>
                );
              } else {
                // DAY가 해당 월의 DAY일 경우.
                return (
                  <td key={index}>
                    <button
                      css={[dateBtnStyle({ theme })]}
                      onClick={selectDateHandler}
                      value={days.format("YYYY-MM-DD")}
                      className={classNames({
                        select: selectedDate === days.format("YYYY-MM-DD"),
                      })}
                    >
                      {days.format("D")}
                    </button>
                  </td>
                );
              }
            })}
        </tr>
      );
    }
    return result;
  }, [
    today,
    firstWeek,
    lastWeek,
    holidayDateArr,
    selectedDate,
    selectDateHandler,
    theme,
  ]);

  useEffect(() => {
    //국가코드를 받아오는 api 호출 및 countrycode state 업데이트
    async function getCountryCode() {
      const res = await axios.get<GetCountryCodeApi>(
        "https://api.ip.pe.kr/json"
      );
      setCountryCode(res.data.country_code);
    }
    getCountryCode();
  }, []);

  return (
    <table css={calendarTableWrap}>
      <tbody>{datesArray()}</tbody>
    </table>
  );
};

export default CalendarTable;
