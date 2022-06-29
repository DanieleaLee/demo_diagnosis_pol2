import NewTechTemplate from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Templates",
  "NewTechTemplate"
);

export default {
  title: storyBookTitle,
  component: NewTechTemplate,
} as ComponentMeta<typeof NewTechTemplate>;

const Template: ComponentStory<typeof NewTechTemplate> = (args) => (
  <NewTechTemplate {...args} />
);

export const Default = Template.bind({});
Default.args = {};
