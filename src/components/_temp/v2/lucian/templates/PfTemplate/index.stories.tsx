import PfTemplate from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Templates",
  "PfTemplate"
);

export default {
  title: storyBookTitle,
  component: PfTemplate,
} as ComponentMeta<typeof PfTemplate>;

const Template: ComponentStory<typeof PfTemplate> = (args) => (
  <PfTemplate {...args} />
);

export const Default = Template.bind({});
Default.args = {};
