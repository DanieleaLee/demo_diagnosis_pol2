import React, { useState, useEffect } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { BiHelpCircle, BiChevronRight } from 'react-icons/bi';
import { RiErrorWarningFill } from 'react-icons/ri';
import BasicBox from '@components/atoms/BasicBox';
import DatePicker from '@components/molecules/DatePicker';
import * as Typography from '@styles/typography';
import HelpTooltip from '@components/molecules/HelpTooltip';

type SelectPeriodBoxProps = {
  containerCss?: SerializedStyles;
  start?: string;
  end?: string;
  onSubmit?: (start: string, end: string) => void;
};
const SelectPeriodBox = ({ containerCss, start, end, onSubmit }: SelectPeriodBoxProps) => {
  const [startDate, setStartDate] = useState(start || '');
  const [endDate, setEndDate] = useState(end || '');
  const [selected, setSelected] = useState(null);
  const isError = new Date(endDate).valueOf() - new Date(startDate).valueOf() < 0;

  useEffect(() => {
    if (startDate && endDate) {
      if (isError) {
        console.log('endeDate가 startDate보다 빠를수없습니다.');
        return;
      }
      onSubmit && onSubmit(startDate, endDate);
    }
  }, [startDate, endDate]);

  const selectStart = (event: React.MouseEvent<HTMLButtonElement>) => {
    setStartDate(event.currentTarget.value);
    setSelected(null);
  };
  const showStart = () => {
    if (selected === 'start') {
      setSelected(null);
      return;
    }
    setSelected('start');
  };

  const selectEnd = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEndDate(event.currentTarget.value);
    setSelected(null);
  };
  const showEnd = () => {
    if (selected === 'end') {
      setSelected(null);
      return;
    }
    setSelected('end');
  };
  return (
    <div css={containerCss}>
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
          {isError && (
            <div
              css={css`
                position: absolute;
                bottom: -5px;
                right: 0;
                display: flex;
                align-items: center;
                gap: 3.17px;
              `}
            >
              <RiErrorWarningFill size={10.83} color="#D47878" />
              <Typography.Body4
                css={css`
                  letter-spacing: 0.03em;
                `}
                color="#D47878"
                lineHeight="18px"
              >
                The start date must be earlier than the end date
              </Typography.Body4>
            </div>
          )}
          <Typography.Subtitle2 lineHeight="18px">In Sample</Typography.Subtitle2>
          <HelpTooltip
            size={14}
            title="In Sample"
            description="In Sample refers to the data to use for model optimization."
            containerCss={css`margin: 0 21px 0 6px;`} // prettier-ignore
            tooltipBoxCss={css`left: 7px;top: 8px;`} // prettier-ignore
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
              showCalendar={selected === 'start'}
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
              showCalendar={selected === 'end'}
              showCalendarHandler={showEnd}
            />
          </div>
        </div>
      </BasicBox>
    </div>
  );
};

export default SelectPeriodBox;
