import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import FilterResultBox from "./FilterResultBox";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "Lucian",
  "Molecules",
  "Filter",
  "FilterResultBox"
);

export default {
  title: storyBookTitle,
  component: FilterResultBox,
} as ComponentMeta<typeof FilterResultBox>;

const Template: ComponentStory<typeof FilterResultBox> = (args) => (
  <FilterResultBox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  checkedElements: ["전체1", "전체2", "전체3"],
  title: "카테고리",
  showCategories: true,
};
