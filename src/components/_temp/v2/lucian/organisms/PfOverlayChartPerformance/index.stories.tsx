import PfOverlayChartPerformance from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Organisms",
  "PfOverlayChartPerformance"
);

export default {
  title: storyBookTitle,
  component: PfOverlayChartPerformance,
} as ComponentMeta<typeof PfOverlayChartPerformance>;

const Template: ComponentStory<typeof PfOverlayChartPerformance> = (args) => (
  <PfOverlayChartPerformance {...args} />
);

export const Default = Template.bind({});
Default.args = {};
