import RightMenu from "./index";
import { makeStorybookTitle } from "@tempComponents/v2/helper"

const storyBookTitle = makeStorybookTitle('v2', 'Molecules', 'RightMenu')

const totalStepsList = [
  'Universe Select', 
  'Model Select', 
  'Post Process',
  'Analysis', 
  'Reporting'
]

export default {
  title: storyBookTitle,
  component: RightMenu,
  // argTypes: {
  //   totalStepsList: {
  //     control: { type: "array", required: true },
  //     defaultValue: [...totalStepsList],
  //   },
  //   currentStep: {
  //     control: { type: "number", required: true },
  //     defaultValue: 3,
  //   },
  //   currentStepStatus: {
  //     control: { type: "boolean", required: true },
  //     defaultValue: true,
  //   },
  // },
};

export const Basic = (args) => <RightMenu {...args} />;