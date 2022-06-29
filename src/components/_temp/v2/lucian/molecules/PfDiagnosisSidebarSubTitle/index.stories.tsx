import PfDiagnosisSidebarSubTitle from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";
import BxAtom from "@lucian2Components/atoms/Icons/BxAtom";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Molecules",
  "PfDiagnosisSidebarSubTitle"
);

export default {
  title: storyBookTitle,
  component: PfDiagnosisSidebarSubTitle,
} as ComponentMeta<typeof PfDiagnosisSidebarSubTitle>;

const Template: ComponentStory<typeof PfDiagnosisSidebarSubTitle> = (args) => (
  <PfDiagnosisSidebarSubTitle {...args} />
);

export const Default = Template.bind({});
Default.args = {
  item: {
    id: 1,
    name: "Traditional Layers",
    value:50,
    lists: [
      {
        id: 1,
        name: "Sector - Financial",
      },
      {
        id: 2,
        name: "Sector Neutral",
      },
      {
        id: 3,
        name: "Style Factor - Value",
      },
      {
        id: 4,
        name: "Style Factor Neutral",
      },
    ],
  },
};
