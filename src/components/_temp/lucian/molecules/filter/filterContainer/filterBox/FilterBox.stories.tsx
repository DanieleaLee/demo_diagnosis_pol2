import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import FilterBox from "./FilterBox";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "Lucian",
  "Molecules",
  "Filter",
  "FilterBox"
);

export default {
  title: storyBookTitle,
  component: FilterBox,
} as ComponentMeta<typeof FilterBox>;

const Template: ComponentStory<typeof FilterBox> = (args) => (
  <FilterBox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  checkedItems: ["전체1", "전체2", "전체3"],
  title: "카테고리",
  data: [
    {
      id: "1",
      name: "전체1",
    },
    {
      id: "2",
      name: "전체2",
    },
    {
      id: "3",
      name: "전체3",
    },
    {
      id: "4",
      name: "전체4",
    },
  ],
};
