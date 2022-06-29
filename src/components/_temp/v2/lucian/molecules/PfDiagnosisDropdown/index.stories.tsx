import PfDiagnosisDropdown from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Molecules",
  "PfDiagnosisDropdown"
);

export default {
  title: storyBookTitle,
  component: PfDiagnosisDropdown,
} as ComponentMeta<typeof PfDiagnosisDropdown>;

const Template: ComponentStory<typeof PfDiagnosisDropdown> = (args) => (
  <PfDiagnosisDropdown {...args} />
);

export const Default = Template.bind({});
Default.args = {
  type: "radio",
  radioData: [
    {
      id: 1,
      name: "Basic",
    },
    {
      id: 2,
      name: "Min",
    },
    {
      id: 3,
      name: "Full",
    },
  ],
  checkboxData: [
    {
      id: 1,
      name: "Epic",
    },
    {
      id: 2,
      name: "Business Issue",
    },
    {
      id: 3,
      name: "Document",
    },
    {
      id: 4,
      name: "All standard issue types",
    },
    {
      id: 5,
      name: "All sub-task issue types",
    },
    {
      id: 6,
      name: "Event",
    },
  ],
};
