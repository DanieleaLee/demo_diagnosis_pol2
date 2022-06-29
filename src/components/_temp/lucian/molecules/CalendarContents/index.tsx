import React, { MouseEvent } from "react";
import { css, Theme, useTheme } from "@emotion/react";
import CalendarArrow from "@lucianComponents/atoms/Icon/CalendarArrow";
import CalendarTable from "@lucianComponents/molecules/CalendarTable";
import RightIcon from "@lucianComponents/atoms/Icon/RightIcon";
import LeftIcon from "@lucianComponents/atoms/Icon/LeftIcon";
import Buttonable from "src/components/atoms/Buttonable";
import * as Typography from "@styles/typography";
import { flexRowBetween } from "src/styles";
import Colors from "src/styles/colors";

export const flexRowAround = css`
  display: flex;
  justify-content: space-around;
`;

export interface Props {
  subtractMonthHandler: () => void;
  addMonthHandler: () => void;
  selectDateHandler: (event: MouseEvent<HTMLButtonElement>) => void;
  selectedDate: string;
  today: moment.Moment;
  theme?: Theme;
  width?: number;
}

const calendarContainerWrap = (props: { width: number }) => css`
  display: inline-block;
  position: absolute;
  margin-top: 2.25px;
  min-width: 203px;
  width: ${props.width ? `${props.width}px` : "203px"};
  z-index: 10;
`;

const calendarInnerWrap = () => css`
  margin-top: 10px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 0 16px 18px 13px;
  width: 100%;
  height: auto;
  background: ${Colors.backgroundWhite};
`;

const calendarInnerContentsWrap = () => css`
  ${flexRowBetween};
  border-bottom: 0.5px solid ${Colors.calendarInnerContentsBorder};
  padding: 4px 0;
`;

const calendarTitleStyle = () => css`
  font-family: "Inter";
  line-height: 12px;
  flex: 1;
  padding-top: 2px;
  text-align: center;
`;

const weekDaysContainer = (props: { theme: Theme }) => css`
  ${flexRowAround}
  margin: auto;
  background: ${props.theme.colors.button3};
  font-family: "Inter";
  padding: 7px 0;
`;

const weekDayStyle = (props: { theme: Theme }) => css`
  color: ${props.theme.colors.primary4};
`;

const CalendarContents = ({
  width,
  subtractMonthHandler,
  addMonthHandler,
  selectedDate,
  selectDateHandler,
  today,
  ...props
}: Props) => {
  const theme = useTheme();

  const WeekDays: Array<string> = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div css={[calendarContainerWrap({ width })]}>
      <CalendarArrow />
      <div css={calendarInnerWrap}>
        <div css={calendarInnerContentsWrap}>
          <Buttonable onClick={subtractMonthHandler}>
            <RightIcon />
          </Buttonable>
          <Typography.Base
            fontSize="10px"
            fontWeight="500"
            color={Colors.calendarTitle}
            css={calendarTitleStyle}
          >
            {today.format("MMMM, YYYY")}
          </Typography.Base>
          <Buttonable onClick={addMonthHandler}>
            <LeftIcon />
          </Buttonable>
        </div>
        <div css={[weekDaysContainer({ theme })]}>
          {WeekDays.map((day, index) => (
            <Typography.Base
              fontSize="10px"
              fontWeight="600"
              lineHeight="12px"
              color={Colors.calendarTitle}
              key={index}
              css={[weekDayStyle({ theme })]}
            >
              {day}
            </Typography.Base>
          ))}
        </div>
        <CalendarTable
          today={today}
          selectDateHandler={selectDateHandler}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
};

export default CalendarContents;
