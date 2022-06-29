import PfDiagnosisLayerBoxes from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Molecules",
  "PfDiagnosisLayerBoxes"
);

export default {
  title: storyBookTitle,
  component: PfDiagnosisLayerBoxes,
} as ComponentMeta<typeof PfDiagnosisLayerBoxes>;

const Template: ComponentStory<typeof PfDiagnosisLayerBoxes> = (args) => (
  <PfDiagnosisLayerBoxes {...args} />
);

export const Default = Template.bind({});
Default.args = {};
