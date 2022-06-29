import { ComponentStory, ComponentMeta } from "@storybook/react";
import SearchBarWithFilterButton from "./index";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "Lucian",
  "Molecules",
  "Filter",
  "SearchBarWithFilterButton"
);

export default {
  title: storyBookTitle,
  component: SearchBarWithFilterButton,
} as ComponentMeta<typeof SearchBarWithFilterButton>;

const Template: ComponentStory<typeof SearchBarWithFilterButton> = (args) => (
  <SearchBarWithFilterButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  inputVal: "1",
  openFilterContainer: false,
  showCategories: false,
  width: 300,
};
