import PfDiagnosisSelectPeriod from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Molecules",
  "PfDiagnosisSelectPeriod"
);

export default {
  title: storyBookTitle,
  component: PfDiagnosisSelectPeriod
} as ComponentMeta<typeof PfDiagnosisSelectPeriod>;

const Template: ComponentStory<typeof PfDiagnosisSelectPeriod> = (args) => (
  <PfDiagnosisSelectPeriod {...args} />
);

export const Default = Template.bind({});
Default.args = {
  updateDate: (startDate, endDate) => {
    console.log(startDate, endDate);
  }
};
