import ColumnMilestone from "./index";
import { makeStorybookTitle } from "@tempComponents/v2/helper"

const storyBookTitle = makeStorybookTitle('v2', 'Molecules', 'ColumnMileStone')

const totalStepsList = [
  'Universe Select', 
  'Model Select', 
  'Post Process',
  'Analysis', 
  'Reporting'
]

export default {
  title: storyBookTitle,
  component: ColumnMilestone,
  argTypes: {
    totalStepsList: {
      control: { type: "array", required: true },
      defaultValue: [...totalStepsList],
    },
    currentStep: {
      control: { type: "number", required: true },
      defaultValue: 1,
    },
  },
};

export const Basic = (args) => <ColumnMilestone {...args} />;