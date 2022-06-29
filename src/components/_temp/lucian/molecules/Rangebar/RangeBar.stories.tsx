import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RangeBar from "./RangeBar";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "Lucian",
  "Molecules",
  "rangebar",
  "RangeBar"
);

export default {
  title: storyBookTitle,
  component: RangeBar,
} as ComponentMeta<typeof RangeBar>;

const Template: ComponentStory<typeof RangeBar> = (args) => (
  <RangeBar {...args} />
);

export const Default = Template.bind({});
Default.args = {};
