import RangeBarBtn, { Props } from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "Lucian",
  "Atoms",
  "rangebar",
  "RangeBarBtn"
);

export default {
  title: storyBookTitle,
  component: RangeBarBtn,
} as ComponentMeta<typeof RangeBarBtn>;

const Template: ComponentStory<typeof RangeBarBtn> = (args) => (
  <RangeBarBtn {...args} />
);

export const Default = Template.bind({});
Default.args = {
  startRangeNum: 0,
  endRangeNum: 100,
  onClick: () => {},
};
