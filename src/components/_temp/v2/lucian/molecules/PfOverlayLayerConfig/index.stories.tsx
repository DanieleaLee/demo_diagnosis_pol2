import PfOverlayLayerConfig from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Molecules",
  "PfOverlayLayerConfig"
);

export default {
  title: storyBookTitle,
  component: PfOverlayLayerConfig,
} as ComponentMeta<typeof PfOverlayLayerConfig>;

const Template: ComponentStory<typeof PfOverlayLayerConfig> = (args) => (
  <PfOverlayLayerConfig {...args} />
);

export const Default = Template.bind({});
Default.args = {};
