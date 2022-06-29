export type CalendarShownDateType = {
  onClick: () => void;
  selectedDate: string;
};

export type CalendarTableType = {
  today: moment.Moment;
  selectDateHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  selectedDate: string;
};

export type UpperCalendarType = {
  subtractMonthHandler: () => void;
  addMonthHandler: () => void;
  today: moment.Moment;
};

export type WeekType = {
  week: Date[];
  generateDates: (date: number) => JSX.Element | undefined;
};

export type WeekDayType = {
  day: string;
};

export const Weekdays: Array<string> = [
  "Su",
  "Mo",
  "Tu",
  "We",
  "Th",
  "Fr",
  "Sa"
];

export type Date = {
  day: number;
};

export type Weekday = {
  letter: string;
};

export type GetCountryCodeApi = {
  result: boolean;
  ip: string;
  country_code: string;
  country_name: {};
};
