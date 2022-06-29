import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CalendarSecondComp from "./index";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "Lucian",
  "Molecules",
  "calendar",
  "CalendarSecondComp"
);

export default {
  title: storyBookTitle,
  component: CalendarSecondComp,
} as ComponentMeta<typeof CalendarSecondComp>;

const Template: ComponentStory<typeof CalendarSecondComp> = (args) => (
  <CalendarSecondComp {...args} />
);

export const Default = Template.bind({});
Default.args = {
  width: 300,
  height: 50,
  selectedSecondDate: "2020-03-14",
  showSecondCalendar: false,
};
