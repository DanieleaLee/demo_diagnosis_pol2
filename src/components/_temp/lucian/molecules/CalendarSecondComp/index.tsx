import React, { useState, useCallback, MouseEvent } from "react";
import { css } from "@emotion/react";
import moment from "moment";
import CalendarDateButton from "@lucianComponents/molecules/CalendarDateButton";
import CalendarContents from "@lucianComponents/molecules/CalendarContents";

interface Props {
  width?: number;
  height?: number;
  selectedSecondDate: string;
  selectSecondDateHandler: (event: MouseEvent<HTMLButtonElement>) => void;
  showSecondCalendar: boolean;
  showSecondCalendarHandler: () => void;
}

const calendarCompContainer = () =>
  css`
    position: relative;
  `;

const CalendarSecondComp = ({
  width,
  height,
  selectedSecondDate,
  selectSecondDateHandler,
  showSecondCalendar,
  showSecondCalendarHandler,
}: Props) => {
  const [getMoment, setMoment] = useState(moment());
  // today == moment()
  const today = getMoment;
  // 현재 선택한 value 값으로 selectDate 상태 update
  // 날짜를 선택하면 달력 closed

  // 이전 달로 이동하는 기능을 하는 handler
  const subtractMonthHandler = useCallback(() => {
    setMoment(getMoment.clone().subtract(1, "month"));
  }, [getMoment]);

  // 다음 달로 이동하는 기능을 하는 handler
  const addMonthHandler = useCallback(() => {
    setMoment(getMoment.clone().add(1, "month"));
  }, [getMoment]);

  return (
    <div css={calendarCompContainer}>
      <CalendarDateButton
        width={width}
        height={height}
        onClick={showSecondCalendarHandler}
        selectedDate={selectedSecondDate}
      />
      {showSecondCalendar && (
        <CalendarContents
          subtractMonthHandler={subtractMonthHandler}
          addMonthHandler={addMonthHandler}
          selectDateHandler={selectSecondDateHandler}
          selectedDate={selectedSecondDate}
          today={today}
        />
      )}
    </div>
  );
};

export default CalendarSecondComp;
