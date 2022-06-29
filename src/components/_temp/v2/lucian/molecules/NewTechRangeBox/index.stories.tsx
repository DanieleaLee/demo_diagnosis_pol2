import NewTechRangeBox from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Molecules",
  "NewTechRangeBox"
);

export default {
  title: storyBookTitle,
  component: NewTechRangeBox,
} as ComponentMeta<typeof NewTechRangeBox>;

const Template: ComponentStory<typeof NewTechRangeBox> = (args) => (
  <NewTechRangeBox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  rowId: 'test_1',
  minLimit: 100,
  maxLimit: 0,
};
