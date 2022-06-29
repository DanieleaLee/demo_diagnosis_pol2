import PfOverlayResultTemplate from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Templates",
  "PfOverlayResultTemplate"
);

export default {
  title: storyBookTitle,
  component: PfOverlayResultTemplate,
} as ComponentMeta<typeof PfOverlayResultTemplate>;

const Template: ComponentStory<typeof PfOverlayResultTemplate> = (args) => (
  <PfOverlayResultTemplate {...args} />
);

export const Default = Template.bind({});
Default.args = {};
