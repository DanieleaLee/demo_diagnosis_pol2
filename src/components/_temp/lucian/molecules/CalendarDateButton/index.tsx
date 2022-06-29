import React from "react";
import { css, Theme, useTheme } from "@emotion/react";
import { flexRowBetween } from "src/styles";
import * as Typography from "@styles/typography";
import { BiCalendarAlt } from "react-icons/bi";

export interface Props {
  onClick?: () => void;
  selectedDate: string;
  theme?: Theme;
  width?: number;
  height?: number;
}

const calendarDateBtnContainer = (props: {
  theme: Theme;
  width: number;
  height: number;
}) => css`
  width: ${props.width ? `${props.width}px` : "100%"};
  height: ${props.height ? `${props.height}px` : "100%"};
  ${flexRowBetween}
  border: 1px solid ${props.theme.colors.hint};
  border-radius: 4px;
  padding: 0 12px 0 15px;
  cursor: pointer;
`;

const defaultTextStyle = () => css`
  font-family: "Inter";
`;

const caledarIconWrapStyle = () => css`
  padding-bottom: 4px;
`;

const CalendarDateButton = ({
  onClick,
  selectedDate,
  width,
  height,
  ...props
}: Props) => {
  const theme = useTheme();
  // date가 10 미만이면 0을 붙여서 보여줌
  const date = Number(selectedDate) < 10 ? `0${selectedDate}` : selectedDate;

  return (
    <div
      onClick={onClick}
      css={[calendarDateBtnContainer({ theme, width, height })]}
    >
      {!selectedDate && (
        <Typography.Base
          color={theme.colors.primary7}
          fontSize="11px"
          fontWeight="500"
          lineHeight="16px"
          css={defaultTextStyle}
        >
          YYYY-MM-DD
        </Typography.Base>
      )}
      {selectedDate && (
        <Typography.Base
          color={theme.colors.primary4}
          fontSize="13px"
          fontWeight="500"
          lineHeight="16px"
          css={defaultTextStyle}
        >{`${date}`}</Typography.Base>
      )}
      <div css={caledarIconWrapStyle}>
        <BiCalendarAlt color="#5b6266" />
      </div>
    </div>
  );
};

export default CalendarDateButton;
