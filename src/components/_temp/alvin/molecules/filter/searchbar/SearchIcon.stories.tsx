import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SearchIcon from "./SearchIcon";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "Lucian",
  "Molecules",
  "Filter",
  "SearchIcon"
);

export default {
  title: storyBookTitle,
  component: SearchIcon,
} as ComponentMeta<typeof SearchIcon>;

const Template: ComponentStory<typeof SearchIcon> = (args) => (
  <SearchIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {};
