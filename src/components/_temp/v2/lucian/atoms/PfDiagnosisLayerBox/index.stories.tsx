import PfDiagnosisLayerBox from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Atoms",
  "PfDiagnosisLayerBox"
);

export default {
  title: storyBookTitle,
  component: PfDiagnosisLayerBox,
} as ComponentMeta<typeof PfDiagnosisLayerBox>;

const Template: ComponentStory<typeof PfDiagnosisLayerBox> = (args) => (
  <PfDiagnosisLayerBox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  layerNumberTxt: "Layer 1",
  scoreTxt: "-32",
  headlineColor: "#ED6565",
  themeName: "Agflation",
};
