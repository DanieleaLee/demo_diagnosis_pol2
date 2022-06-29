import React, { useState, useEffect, MouseEvent } from 'react';
import { css, Theme, useTheme } from '@emotion/react';
import Buttonable from '@components/atoms/Buttonable';
import CalendarTable from './CalendarTable';
import { AiFillCaretRight } from 'react-icons/ai';
import { AiFillCaretLeft } from 'react-icons/ai';
import * as Typography from '@styles/typography';
import { flexRowBetween } from '@styles';
import Colors from '@styles/colors';
import moment from 'moment';

export const flexRowAround = css`
  display: flex;
  justify-content: space-around;
`;

export interface Props {
  // subtractMonthHandler: () => void;
  // addMonthHandler: () => void;
  selectDateHandler?: (event: MouseEvent<HTMLButtonElement>) => void;
  selectedDate?: string;
  // today: moment.Moment;
  theme?: Theme;
  width?: number;
}

const calendarContainerWrap = (props: { width: number }) => css`
  display: inline-block;
  position: absolute;
  margin-top: 2.25px;
  min-width: 203px;
  width: ${props.width ? `${props.width}px` : '203px'};
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
  font-family: 'Inter';
  line-height: 12px;
  flex: 1;
  padding-top: 2px;
  text-align: center;
`;

const weekDaysContainer = (props: { theme: Theme }) => css`
  ${flexRowAround}
  margin: auto;
  background: ${props.theme.colors.button3};
  font-family: 'Inter';
  padding: 7px 0;
`;

const weekDayStyle = (props: { theme: Theme }) => css`
  color: ${props.theme.colors.primary4};
`;

const arrowWrapStyle = css`
  width: 100%;
  top: -8px;
  flex-direction: row;
  justify-content: flex-start;
  padding-top: 10px;
  padding-left: 38px;
  position: absolute;
  display: flex;
  /* background-color: #fff; */
  background-color: transparent;
  > div {
    transform: rotate(45deg);
  }
`;

const arrowStyle = css`
  width: 14px;
  height: 14px;
  position: absolute;
  border-top: 0.5px solid #ececec;
  border-left: 0.5px solid #ececec;
  box-shadow: inset 1px 1px 0px 0px rgba(122, 122, 122, 0.15);
  background-color: #fff;
`;

const Arrow = () => {
  return (
    <div css={arrowWrapStyle}>
      <div css={[arrowStyle]}></div>
    </div>
  );
};

const CalendarContents = ({
  width,
  // subtractMonthHandler,
  // addMonthHandler,
  selectedDate,
  selectDateHandler,
  // today,
  ...props
}: Props) => {
  const theme = useTheme();
  // const today = selectedDate ? moment(selectedDate) : moment();

  const [baseMonth, setBaseMonth] = useState(selectedDate ? moment(selectedDate) : moment().clone());

  const WeekDays: Array<string> = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const subtractMonthHandler = () => {
    setBaseMonth(baseMonth.clone().subtract(1,'months'))
  };

  // 다음 달로 이동하는 기능을 하는 handler
  const addMonthHandler = () => {
    setBaseMonth(baseMonth.clone().add(1,'months'))
  };

  return (
    <div css={[calendarContainerWrap({ width })]}>
      <Arrow />
      <div css={calendarInnerWrap}>
        <div css={calendarInnerContentsWrap}>
          <Buttonable onClick={subtractMonthHandler}>
            <AiFillCaretLeft size={9} />
          </Buttonable>
          <Typography.Base fontSize="10px" fontWeight="500" color={Colors.calendarTitle} css={calendarTitleStyle}>
            {baseMonth.format('MMMM, YYYY')}
          </Typography.Base>
          <Buttonable onClick={addMonthHandler}>
            <AiFillCaretRight size={9} />
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
        <CalendarTable baseMonth={baseMonth} selectDateHandler={selectDateHandler} selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default CalendarContents;
