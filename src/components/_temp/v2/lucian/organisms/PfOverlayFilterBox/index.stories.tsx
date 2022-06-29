import PfAnalysisFilterBox from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Organisms",
  "PfAnalysisFilterBox"
);

export default {
  title: storyBookTitle,
  component: PfAnalysisFilterBox,
} as ComponentMeta<typeof PfAnalysisFilterBox>;

const Template: ComponentStory<typeof PfAnalysisFilterBox> = (args) => (
  <PfAnalysisFilterBox {...args} />
);

export const Default = Template.bind({});
Default.args = {};
