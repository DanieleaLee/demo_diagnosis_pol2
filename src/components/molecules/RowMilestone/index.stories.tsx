import RowMilestone from "./index";

const totalStepsList = [
  'Universe Select', 
  'Model Select', 
  'Post Process',
  'Analysis', 
  'Reporting'
]

export default {
  title: "Molecules/RowMilestone",
  component: RowMilestone,
  argTypes: {
    totalStepsList: {
      control: { type: "array", required: true },
      defaultValue: [...totalStepsList],
    },
    currentStep: {
      control: { type: "number", required: true },
      defaultValue: 3,
    },
    currentStepStatus: {
      control: { type: "boolean", required: true },
      defaultValue: true,
    },
  },
};

export const Basic = (args) => <RowMilestone {...args} />;