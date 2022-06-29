import PfOverlayDateBar from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Molecules",
  "PfOverlayDateBar"
);

export default {
  title: storyBookTitle,
  component: PfOverlayDateBar,
} as ComponentMeta<typeof PfOverlayDateBar>;

const Template: ComponentStory<typeof PfOverlayDateBar> = (args) => (
  <PfOverlayDateBar {...args} />
);

export const Default = Template.bind({});
Default.args = {};
