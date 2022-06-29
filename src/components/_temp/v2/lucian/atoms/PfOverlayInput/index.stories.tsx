import PfOverlayInput from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Atoms",
  "PfOverlayInput"
);

export default {
  title: storyBookTitle,
  component: PfOverlayInput,
} as ComponentMeta<typeof PfOverlayInput>;

const Template: ComponentStory<typeof PfOverlayInput> = (args) => (
  <PfOverlayInput {...args} />
);

export const Default = Template.bind({});
Default.args = {};
