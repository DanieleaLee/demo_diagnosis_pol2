import MRSummary from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Molecules",
  "MRSummary"
);

export default {
  title: storyBookTitle,
  component: MRSummary,
} as ComponentMeta<typeof MRSummary>;

const Template: ComponentStory<typeof MRSummary> = (args) => (
  <MRSummary {...args} />
);

export const Default = Template.bind({});
Default.args = {};
