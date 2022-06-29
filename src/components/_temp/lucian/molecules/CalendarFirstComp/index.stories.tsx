import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CalendarFirstComp from "./index";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "Lucian",
  "Molecules",
  "calendar",
  "CalendarFirstComp"
);

export default {
  title: storyBookTitle,
  component: CalendarFirstComp,
} as ComponentMeta<typeof CalendarFirstComp>;

const Template: ComponentStory<typeof CalendarFirstComp> = (args) => (
  <CalendarFirstComp {...args} />
);

export const Default = Template.bind({});
Default.args = {
  width: 300,
  height: 50,
  selectedDate: "2020-03-14",
  showCalendar: false,
};
