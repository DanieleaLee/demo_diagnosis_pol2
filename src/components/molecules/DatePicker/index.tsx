import React, { useState, useCallback, MouseEvent } from 'react';
import { css } from '@emotion/react';
import moment from 'moment';
import CalendarDateButton from '@components/atoms/CalendarDateButton';
import Calendar from '../Calendar/index';

interface DatePickerProps {
  width?: number;
  height?: number;
  selectedDate: string;
  selectDateHandler: (event: MouseEvent<HTMLButtonElement>) => void;
  showCalendar: boolean;
  showCalendarHandler: () => void;
}

const calendarCompContainer = () =>
  css`
    position: relative;
  `;

const DatePicker = ({
  width,
  height,
  selectedDate,
  selectDateHandler,
  showCalendar,
  showCalendarHandler,
}: DatePickerProps) => {
  
  const [getMoment, setMoment] = useState(selectedDate ? moment(selectedDate) : moment());
  // today == moment()
  // const today = getMoment;
  // 현재 선택한 value 값으로 selectDate 상태 update
  // 날짜를 선택하면 달력 closed

  // 이전 달로 이동하는 기능을 하는 handler
  const subtractMonthHandler = useCallback(() => {
    setMoment(getMoment.clone().subtract(1, 'month'));
  }, [getMoment]);

  // 다음 달로 이동하는 기능을 하는 handler
  const addMonthHandler = useCallback(() => {
    setMoment(getMoment.clone().add(1, 'month'));
  }, [getMoment]);

  return (
    <div css={calendarCompContainer}>
      <CalendarDateButton width={width} height={height} onClick={showCalendarHandler} selectedDate={selectedDate} />
      {showCalendar && (
        <Calendar
          // subtractMonthHandler={subtractMonthHandler}
          // addMonthHandler={addMonthHandler}
          selectDateHandler={selectDateHandler}
          selectedDate={selectedDate}
          // today={today}
        />
      )}
    </div>
  );
};

export default DatePicker;
