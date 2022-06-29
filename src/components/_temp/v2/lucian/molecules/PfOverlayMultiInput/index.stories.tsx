import PfOverlayMultiInput from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Molecules",
  "PfOverlayMultiInput"
);

export default {
  title: storyBookTitle,
  component: PfOverlayMultiInput,
} as ComponentMeta<typeof PfOverlayMultiInput>;

const Template: ComponentStory<typeof PfOverlayMultiInput> = (args) => (
  <PfOverlayMultiInput {...args} />
);

export const Default = Template.bind({});
Default.args = {};
