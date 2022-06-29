import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CombinedCalendar from "./CombinedCalendar";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "Lucian",
  "Molecules",
  "Calendar",
  "CombinedCalendar"
);

export default {
  title: storyBookTitle,
  component: CombinedCalendar,
} as ComponentMeta<typeof CombinedCalendar>;

const Template: ComponentStory<typeof CombinedCalendar> = (args) => (
  <CombinedCalendar {...args} />
);

export const Default = Template.bind({});
Default.args = {};
