import MRTemplate from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Templates",
  "MRTemplate"
);

export default {
  title: storyBookTitle,
  component: MRTemplate,
} as ComponentMeta<typeof MRTemplate>;

const Template: ComponentStory<typeof MRTemplate> = (args) => (
  <MRTemplate {...args} />
);

export const Default = Template.bind({});
Default.args = {};
