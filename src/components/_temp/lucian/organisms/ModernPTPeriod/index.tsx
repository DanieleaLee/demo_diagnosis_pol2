import React, { useCallback, useEffect, useState } from "react";
import { css } from "@emotion/react";
import Colors from "src/styles/colors";
import * as Typography from "@styles/typography";
import { flexRow } from "src/styles";
import ModernPTPeriodBox from "@lucianComponents/atoms/ModernPTPeriod/index";
import LeftChevron from "@lucianComponents/atoms/Icon/LeftChevron";
import CalendarFirstComp from "@lucianComponents/molecules/CalendarFirstComp";
import CalendarSecondComp from "@lucianComponents/molecules/CalendarSecondComp";
import { BiHelpCircle } from "react-icons/bi";

const modernPTPeriodContainerWrap = () => css`
  ${flexRow};
  width: 100%;
  height: 100%;
`;

const modernPTTextWithIconStyle = () => css`
  ${flexRow};
  padding: 0 22.17px 0 24px;
`;

const modernPTTextWithCalendarStyle = () => css`
  ${flexRow};
`;

const textStyle = () => css`
  font-family: "Inter";
`;

const questionIconWrap = () => css`
  padding-left: 7.17px;
  padding-bottom: 3px;
`;

const calendarWrap = () => css`
  ${flexRow};
  padding-left: 11px;
`;

const leftChevronStyle = () => css`
  padding: 0 7.75px 0 10.17px;
`;

const ModernPTPeriodWithContents = () => {
  // 선택된 날짜 state
  const [selectedFirstDate, setSelectedFirstDate] = useState("");
  const [selectedSecondDate, setSelectedSecondDate] = useState("");
  // 캘린더 open & close control state
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSecondCalendar, setShowSecondCalendar] = useState(false);

  const selectDateHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedFirstDate(event.currentTarget.value);
    setShowCalendar(false);
  };

  const selectSecondDateHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setSelectedSecondDate(event.currentTarget.value);
    setShowSecondCalendar(false);
  };

  // 달력 open & close control하는 handler
  const showCalendarHandler = useCallback(() => {
    setShowCalendar((prevState) => !prevState);
  }, []);

  const showSecondCalendarHandler = useCallback(() => {
    setShowSecondCalendar((prevState) => !prevState);
  }, []);

  useEffect(() => {
    if (
      new Date(selectedSecondDate).getTime() <
      new Date(selectedFirstDate).getTime()
    ) {
      alert("First Period must be earlier than Second Period");
      setSelectedSecondDate(selectedFirstDate);
    }
  }, [selectedFirstDate, selectedSecondDate]);

  return (
    <ModernPTPeriodBox width={503} height={54}>
      <div css={modernPTPeriodContainerWrap}>
        <div css={modernPTTextWithIconStyle}>
          <Typography.Base
            fontSize="15px"
            fontWeight="600"
            lineHeight="18px"
            color={Colors.selectCategoryAmountBg}
            css={textStyle}
          >
            In Sample
          </Typography.Base>
          <p css={questionIconWrap}>
            <BiHelpCircle color="#2F3B43" />
          </p>
        </div>
        <div css={modernPTTextWithCalendarStyle}>
          <Typography.Base
            fontSize="15px"
            fontWeight="600"
            lineHeight="18px"
            color={Colors.selectCategoryAmountBg}
            css={textStyle}
          >
            Period
          </Typography.Base>
          <div css={calendarWrap}>
            <CalendarFirstComp
              width={130}
              height={30}
              selectedDate={selectedFirstDate}
              selectDateHandler={selectDateHandler}
              showCalendar={showCalendar}
              showCalendarHandler={showCalendarHandler}
            />
            <span css={leftChevronStyle}>
              <LeftChevron />
            </span>
            <CalendarSecondComp
              width={130}
              height={30}
              selectedSecondDate={selectedSecondDate}
              selectSecondDateHandler={selectSecondDateHandler}
              showSecondCalendar={showSecondCalendar}
              showSecondCalendarHandler={showSecondCalendarHandler}
            />
          </div>
        </div>
      </div>
    </ModernPTPeriodBox>
  );
};

export default ModernPTPeriodWithContents;
