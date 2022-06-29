import MRTimeBar from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Molecules",
  "MRTimeBar"
);

export default {
  title: storyBookTitle,
  component: MRTimeBar,
} as ComponentMeta<typeof MRTimeBar>;

const Template: ComponentStory<typeof MRTimeBar> = (args) => (
  <MRTimeBar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  value: 40,
  total: 100,
};
