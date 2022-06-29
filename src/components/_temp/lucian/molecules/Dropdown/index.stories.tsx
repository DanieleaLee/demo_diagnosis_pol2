import Dropdown from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "Lucian",
  "Molecules",
  "filter",
  "Dropdown"
);

export default {
  title: storyBookTitle,
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "1",
  checkedItems: ["1", "2"],
  filteredData: [
    {
      id: 1,
      name: "1",
    },
    {
      id: 2,
      name: "2",
    },
  ],
  show: false,
};
