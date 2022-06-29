import React, { useState, useEffect, useRef } from "react";
import { BiChevronRight } from "react-icons/bi";
import { css } from "@emotion/react";
import Colors from "@styles/colors";
import * as Typography from "@styles/typography";
import { flexColumn } from "@styles";
import DatePicker from "@components/molecules/DatePicker";
import { flexRowStyle } from "@lucian2Components/templates/PfOverlayTemplate";
import { errorMessage } from "@lucian2Components/templates/PfTemplate";

const datePickerWrapCss = css`
  padding-left: 24px;
  position: relative;
  ${flexColumn}
`;

interface Props {
  updateDate: (startDate: string, endDate: string) => void;
}

const PfDiagnosisSelectPeriod = ({ updateDate }: Props) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [startDate, setStartDate] = useState("2020-01-01");
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [endDate, setEndDate] = useState("2022-05-23");

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

  const dateComparisonCondition = new Date(startDate) > new Date(endDate);

  useEffect(() => {
    updateDate(startDate, endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    let handler = (event: any) => {
      if (nodeRef.current && !nodeRef.current.contains(event.target)) {
        setShowEndPicker(false);
        setShowStartPicker(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div css={flexRowStyle} ref={nodeRef}>
      <Typography.Subtitle2 color={Colors.buttonSubmit}>
        Back Testing Period
      </Typography.Subtitle2>
      {/* prettier-ignore */}
      <div css={css`${flexColumn}`}>
        <div css={[datePickerWrapCss]}>
          <div css={flexRowStyle}>
            <DatePicker
              width={130}
              height={26}
              selectedDate={startDate}
              selectDateHandler={selectStart}
              showCalendar={showStartPicker}
              showCalendarHandler={showStart}
            />
            <BiChevronRight size={30} color="#858585" />
            <DatePicker
              width={130}
              height={26}
              selectedDate={endDate}
              selectDateHandler={selectEnd}
              showCalendar={showEndPicker}
              showCalendarHandler={showEnd}
            />
          </div>
          {dateComparisonCondition && (
            <Typography.Body4
              css={css`
                position: absolute;
                bottom: -14px;
              `}
            >
              {errorMessage("The start date must be earlier than the end date")}
            </Typography.Body4>
          )}
        </div>
      </div>
    </div>
  );
};

export default PfDiagnosisSelectPeriod;
