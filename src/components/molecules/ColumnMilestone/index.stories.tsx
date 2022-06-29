import ColumnMileStone from "./index";

const totalStepsList = [
  'Universe Select', 
  'Model Select', 
  'Post Process',
  'Analysis', 
  'Reporting'
]

export default {
  title: "Molecules/ColumnMileStone",
  component: ColumnMileStone,
  argTypes: {
    totalStepsList: {
      control: { type: "array", required: true },
      defaultValue: [...totalStepsList],
    },
    currentStep: {
      control: { type: "number", required: true },
      defaultValue: 3,
    },
  },
};


export const Basic = (args) => <ColumnMileStone {...args} />;