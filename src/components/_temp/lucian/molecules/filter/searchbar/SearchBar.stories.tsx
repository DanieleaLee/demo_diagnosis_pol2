import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SearchBar from "./SearchBar";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "Lucian",
  "Molecules",
  "Filter",
  "SearchBar"
);

export default {
  title: storyBookTitle,
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args) => (
  <SearchBar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  inputVal: "aaaa",
};
