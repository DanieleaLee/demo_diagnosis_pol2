import ProgressBarBody from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Atoms",
  "ProgressBarBody"
);

export default {
  title: storyBookTitle,
  component: ProgressBarBody,
} as ComponentMeta<typeof ProgressBarBody>;

const Template: ComponentStory<typeof ProgressBarBody> = (args) => (
  <ProgressBarBody {...args} />
);

export const Default = Template.bind({});
Default.args = {};
