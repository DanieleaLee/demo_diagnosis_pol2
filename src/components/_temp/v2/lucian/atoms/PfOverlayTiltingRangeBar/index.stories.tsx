import PfOverlayTiltingRangeBar from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Atoms",
  "PfOverlayTiltingRangeBar"
);

export default {
  title: storyBookTitle,
  component: PfOverlayTiltingRangeBar,
} as ComponentMeta<typeof PfOverlayTiltingRangeBar>;

const Template: ComponentStory<typeof PfOverlayTiltingRangeBar> = (args) => (
  <PfOverlayTiltingRangeBar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  min: 0,
  max: 10,
};
