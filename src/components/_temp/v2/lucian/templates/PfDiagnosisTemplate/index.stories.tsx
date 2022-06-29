import PfDiagnosisTemplate from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Templates",
  "PfDiagnosisTemplate"
);

export default {
  title: storyBookTitle,
  component: PfDiagnosisTemplate,
} as ComponentMeta<typeof PfDiagnosisTemplate>;

const Template: ComponentStory<typeof PfDiagnosisTemplate> = (args) => (
  <PfDiagnosisTemplate {...args} />
);

export const Default = Template.bind({});
Default.args = {};
