import PfOverlayTemplate from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Templates",
  "PfOverlayTemplate"
);

export default {
  title: storyBookTitle,
  component: PfOverlayTemplate,
} as ComponentMeta<typeof PfOverlayTemplate>;

const Template: ComponentStory<typeof PfOverlayTemplate> = (args) => (
  <PfOverlayTemplate {...args} />
);

export const Default = Template.bind({});
Default.args = {};
