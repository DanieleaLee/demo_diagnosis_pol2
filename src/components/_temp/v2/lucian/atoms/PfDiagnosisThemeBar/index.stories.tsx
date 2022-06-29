import PfDiagnosisThemeBar from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Atoms",
  "PfDiagnosisThemeBar"
);

export default {
  title: storyBookTitle,
  component: PfDiagnosisThemeBar,
} as ComponentMeta<typeof PfDiagnosisThemeBar>;

const Template: ComponentStory<typeof PfDiagnosisThemeBar> = (args) => (
  <PfDiagnosisThemeBar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  totalPercentage: 100,
  percentage: 20,
};
