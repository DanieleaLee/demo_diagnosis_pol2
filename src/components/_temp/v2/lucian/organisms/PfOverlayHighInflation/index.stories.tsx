import PfOverlayHighInflation from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Organisms",
  "PfOverlayHighInflation"
);

export default {
  title: storyBookTitle,
  component: PfOverlayHighInflation,
} as ComponentMeta<typeof PfOverlayHighInflation>;

const Template: ComponentStory<typeof PfOverlayHighInflation> = (args) => (
  <PfOverlayHighInflation {...args} />
);

export const Default = Template.bind({});
Default.args = {};
