import styled from "@emotion/styled";

// Combined calendar style
const CalendarContainer = styled.div``;

const CalendarWrap = styled.div`
  display: inline-block;
  position: relative;
  margin-top: 2.25px;
`;

const CalendarInnerWrap = styled.div`
  margin-top: 10px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 0 16px 18px 13px;
  width: 203px;
  height: auto;
`;

// Calendar shown date style
const CalendarShownDateContainer = styled.div`
  width: 173px;
  height: 35px;
  border: 1px solid #9da6ad;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px 0 15px;
  cursor: pointer;
`;

const DefaultText = styled.p`
  color: #cecece;
  font-family: "Inter", sans-serif;
  font-weight: 500;
`;

const SelectedText = styled.p`
  color: #5b6266;
  font-family: "Inter", sans-serif;
  font-weight: 500;
  color: #5b6266;
`;

const CalendarIcon = styled.div`
  padding-bottom: 4px;
`;

// Upper Calendar contents style
const Control = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid #dadcdd;
  padding: 4px 0;
`;

const CalendarTitle = styled.span`
  font-size: 10px;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  color: #5b6266;
  line-height: 12px;
  flex: 1;
  padding-top: 2px;
  text-align: center;
`;

const Button = styled.button`
  border: none;
  background: transparent;
`;

// Week style
const Week = styled.div`
  display: inline-flex;
  align-items: flex-start;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  background: white;

  &:last-of-type {
    justify-content: flex-start;
    display: flex;
  }
`;

// Week day style
const WeekDay = styled.div`
  color: #5b6266;
`;

// WeekDays style
const WeekDaysContainer = styled.div`
  display: flex;
  margin: auto;
  justify-content: space-around;
  background: white;
  font-weight: 600;
  font-family: "Inter", sans-serif;
  font-size: 10px;
  line-height: 12px;
  color: #5b6266;
  padding: 7px 0;
`;

// Calendar Table Style

const Table = styled.table`
  width: 100%;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr``;

const TableData = styled.td``;

const Dates = styled.button`
  width: 19px;
  height: 18px;
  font-size: 10px;
  font-weight: 400;
  font-family: "Inter", sans-serif;
  line-height: 12px;
  color: #5b6266;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;

  &:hover {
    background: #efefef;
    border-radius: 2px;
  }

  &:focus {
    background: #546a78;
    color: #fff;
  }

  &.select {
    background: #546a78;
    color: #fff;
  }

  &.selectHoliday {
    background: #546a78;
    color: red;
  }
`;

export {
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
  Week,
  WeekDay,
  WeekDaysContainer,
  Table,
  TableBody,
  TableRow,
  TableData,
  Dates,
};
