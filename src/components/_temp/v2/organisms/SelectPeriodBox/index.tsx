import React, { useState } from "react";
import { css } from "@emotion/react";
import { BiHelpCircle, BiChevronRight } from "react-icons/bi";
import BasicBox from "@components/atoms/BasicBox";
import DatePicker from "@components/molecules/DatePicker";
import * as Typography from "@styles/typography";

const SelectPeriodBox = () => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [endDate, setEndDate] = useState("");

  const selectStart = (event: React.MouseEvent<HTMLButtonElement>) => {
    setStartDate(event.currentTarget.value);
    setShowStartPicker(false);
  };
  const showStart = () => {
    setShowStartPicker((prevState) => !prevState);
  };

  const selectEnd = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEndDate(event.currentTarget.value);
    setShowEndPicker(false);
  };
  const showEnd = () => {
    setShowEndPicker((prevState) => !prevState);
  };
  return (
    <BasicBox width={503} height={54} borderColor="#CED9E1">
      <div
        css={css`
          height: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        `}
      >
        <Typography.Subtitle2 lineHeight="18px">In Sample</Typography.Subtitle2>
        <BiHelpCircle
          size={16}
          color="#2F3B43"
          css={css`
            margin: 0 21px 0 6px;
          `}
        />
        <Typography.Subtitle2 lineHeight="18px">Period</Typography.Subtitle2>
        <div
          css={css`
            margin-left: 11px;
          `}
        >
          <DatePicker
            width={130}
            height={26}
            selectedDate={startDate}
            selectDateHandler={selectStart}
            showCalendar={showStartPicker}
            showCalendarHandler={showStart}
          />
        </div>

        <BiChevronRight size={24} color="#858585" />

        <div>
          <DatePicker
            width={130}
            height={26}
            selectedDate={endDate}
            selectDateHandler={selectEnd}
            showCalendar={showEndPicker}
            showCalendarHandler={showEnd}
          />
        </div>
      </div>
    </BasicBox>
  );
};

export default SelectPeriodBox;
