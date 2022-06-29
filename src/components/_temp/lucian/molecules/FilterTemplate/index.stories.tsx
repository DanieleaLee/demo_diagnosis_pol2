import FilterTemplate from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "Lucian",
  "Molecules",
  "filter",
  "FilterTemplate"
);

export default {
  title: storyBookTitle,
  component: FilterTemplate,
} as ComponentMeta<typeof FilterTemplate>;

const Template: ComponentStory<typeof FilterTemplate> = (args) => (
  <FilterTemplate {...args} />
);

export const Default = Template.bind({});
Default.args = {
  showCategories: false,
  filterData: ["1", "2"],
  filtersResult: ["1", "2"],
};
