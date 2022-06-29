import FilterBox from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "Lucian",
  "Molecules",
  "filter",
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
  title: "111",
  data: [
    {
      id: 1,
      name: "1",
    },
    {
      id: 2,
      name: "2",
    },
  ],
  checkedItems: ["1", "2"],
};
