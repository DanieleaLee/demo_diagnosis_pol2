import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import FilledArrowDownIcon from "./FilledArrowDownIcon";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "Lucian",
  "Molecules",
  "Filter",
  "FilledArrowDownIcon"
);

export default {
  title: storyBookTitle,
  component: FilledArrowDownIcon,
} as ComponentMeta<typeof FilledArrowDownIcon>;

const Template: ComponentStory<typeof FilledArrowDownIcon> = (args) => (
  <FilledArrowDownIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {};
