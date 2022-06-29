import React, { FC, useState, useCallback, MouseEvent } from "react";
import moment from "moment";
import {
  CalendarContainer,
  CalendarWrap,
  CalendarInnerWrap,
  CalendarShownDateContainer,
  DefaultText,
  SelectedText,
  CalendarIcon,
  Control,
  CalendarTitle,
  Button,
  WeekDay,
  WeekDaysContainer
} from "./calendarStyle";
import Calendar from "./Calendar";
// import CalendarTable from "./CalendarTable";
import CalendarArrow from "./CalendarArrow";
import LeftIcon from "@lucianComponents/molecules/calendar/LeftIcon";
import RightIcon from "@lucianComponents/molecules/calendar/RightIcon";
import {
  CalendarShownDateType,
  UpperCalendarType,
  WeekDayType,
  Weekdays
} from "./calendarType";

const CombinedCalendar = () => {
  // 선택된 날짜 state
  const [selectedDate, setSelectedDate] = useState("");
  // 캘린더 open & close control state
  const [showCalendar, setShowCalendar] = useState(false);
  const [getMoment, setMoment] = useState(moment());
  // today == moment()
  const today = getMoment;

  // 현재 선택한 value 값으로 selectDate 상태 update
  // 날짜를 선택하면 달력 closed
  const selectDateHandler = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      setSelectedDate(event.currentTarget.value);
      setShowCalendar(false);
    },
    []
  );

  // 달력 open & close control하는 handler
  const showCalendarHandler = useCallback(() => {
    setShowCalendar((prevState) => !prevState);
  }, []);

  // 이전 달로 이동하는 기능을 하는 handler
  const subtractMonthHandler = useCallback(() => {
    setMoment(getMoment.clone().subtract(1, "month"));
  }, [getMoment]);

  // 다음 달로 이동하는 기능을 하는 handler
  const addMonthHandler = useCallback(() => {
    setMoment(getMoment.clone().add(1, "month"));
  }, [getMoment]);

  return (
    <CalendarContainer>
      {/* 캘린더 상부 날짜 보여주는 컴포넌트 */}
      <CalendarShownDate
        onClick={showCalendarHandler}
        selectedDate={selectedDate}
      />
      {/* 상부 컴포넌트를 클릭할 경우 보여지는 캘린더 contents */}
      {showCalendar && (
        <CalendarWrap>
          <CalendarArrow />
          <CalendarInnerWrap>
            {/* 캘린더 안의 연도 및 이전, 다음 버튼이 포함된 컴포넌트 */}
            <UpperCalendarContents
              subtractMonthHandler={subtractMonthHandler}
              addMonthHandler={addMonthHandler}
              today={today}
            />
            {/* 월화수목금토일을 표시해주는 컴포넌트 */}
            <WeekdaysContainer />
            {/* 캘린더 상세 구조 및 테이블, 상세 로직들이 들어가있는 컴포넌트 */}
            {/*<CalendarTable*/}
              {/*today={today}*/}
              {/*selectDateHandler={selectDateHandler}*/}
              {/*selectedDate={selectedDate}*/}
            {/*/>*/}
          </CalendarInnerWrap>
        </CalendarWrap>
      )}
    </CalendarContainer>
  );
};

//***********Calendar Shown date 컴포넌트 ********** */
const CalendarShownDate: FC<CalendarShownDateType> = ({
  onClick,
  selectedDate
}) => {
  // date가 10 미만이면 0을 붙여서 보여줌
  const date = Number(selectedDate) < 10 ? `0${selectedDate}` : selectedDate;

  return (
    // Date가 선택되기 전엔 'YYYY-MM-DD', 선택된 후에는 그 날짜를 보여주는 컴포넌트
    <CalendarShownDateContainer onClick={onClick}>
      {!selectedDate && <DefaultText>YYYY-MM-DD</DefaultText>}
      {selectedDate && <SelectedText>{`${date}`}</SelectedText>}
      <CalendarIcon>
        <Calendar />
      </CalendarIcon>
    </CalendarShownDateContainer>
  );
};

//***********Upper Calendar Contents 컴포넌트 ********** */
const UpperCalendarContents: FC<UpperCalendarType> = ({
  subtractMonthHandler,
  addMonthHandler,
  today
}) => {
  return (
    <Control>
      {/* Go to Prev Month */}
      <Button onClick={subtractMonthHandler}>
        <RightIcon />
      </Button>
      <CalendarTitle>{today.format("MMMM, YYYY")}</CalendarTitle>
      {/* Go to Next Month */}
      <Button onClick={addMonthHandler}>
        <LeftIcon />
      </Button>
    </Control>
  );
};

export default CombinedCalendar;

//***********Weekdays 컴포넌트 ********** */
const WeekdaysContainer = () => {
  return (
    <WeekDaysContainer>
      {Weekdays.map((day, idx) => (
        <WeekDayAtom key={idx} day={day} />
      ))}
    </WeekDaysContainer>
  );
};

//***********Week 컴포넌트 ********** */
const WeekDayAtom: FC<WeekDayType> = ({ day }) => {
  return <WeekDay>{day}</WeekDay>;
};
