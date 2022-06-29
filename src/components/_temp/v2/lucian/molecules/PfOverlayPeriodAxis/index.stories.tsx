import PfOverlayPeriodAxis from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Molecules",
  "PfOverlayPeriodAxis"
);

export default {
  title: storyBookTitle,
  component: PfOverlayPeriodAxis,
} as ComponentMeta<typeof PfOverlayPeriodAxis>;

const Template: ComponentStory<typeof PfOverlayPeriodAxis> = (args) => (
  <PfOverlayPeriodAxis {...args} />
);

export const Default = Template.bind({});
Default.args = {};
