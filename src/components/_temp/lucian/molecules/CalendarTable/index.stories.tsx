import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CalendarTable from "./index";
import { makeStorybookTitle } from "@lucianComponents/helper";
import moment from "moment";

const storyBookTitle = makeStorybookTitle(
  "Lucian",
  "Molecules",
  "calendar",
  "CalendarTable"
);

export default {
  title: storyBookTitle,
  component: CalendarTable,
} as ComponentMeta<typeof CalendarTable>;

const Template: ComponentStory<typeof CalendarTable> = (args) => (
  <CalendarTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  selectedDate: "2020-03-14",
  today: moment(),
};
