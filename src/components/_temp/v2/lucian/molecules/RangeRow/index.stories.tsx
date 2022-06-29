import RangeRow from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Molecules",
  "RangeRow"
);

export default {
  title: storyBookTitle,
  component: RangeRow,
} as ComponentMeta<typeof RangeRow>;

const Template: ComponentStory<typeof RangeRow> = (args) => (
  <RangeRow {...args} />
);

export const Default = Template.bind({});
Default.args = {};
