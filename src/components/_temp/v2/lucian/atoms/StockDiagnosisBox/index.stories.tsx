import StockDiagnosisBox from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";
import { BiChip } from "react-icons/bi";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Atoms",
  "StockDiagnosisBox"
);

export default {
  title: storyBookTitle,
  component: StockDiagnosisBox,
} as ComponentMeta<typeof StockDiagnosisBox>;

const Template: ComponentStory<typeof StockDiagnosisBox> = (args) => (
  <StockDiagnosisBox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  subject: "technology",
  subData: [
    {
      id: 1,
      title: "APPL",
      subTitle: "Apple Inc.",
    },
    {
      id: 2,
      title: "MSFT",
      subTitle: "Microsoft Corporation",
    },
    {
      id: 3,
      title: "NVDA",
      subTitle: "NVIDIA Corporation",
    },
  ],
};
