import MemoPopUp from "./index";
import { makeStorybookTitle } from "@alvinComponents/helper"
import { memoContent } from "@alvinComponents/Dummy";

const storyBookTitle = makeStorybookTitle('Alvin', 'Molecules', 'MemoPopUp')

export default {
  title: storyBookTitle,
  component: MemoPopUp,
  argTypes: {
    title: {
      control: { type: "string", required: true },
      defaultValue: 'Note',
    },
    tags: {
      control: { type: "array", required: true },
      defaultValue: ['#dextor', '#alvin'],
    },
    content: {
      control: { type: "string", required: true },
      defaultValue: memoContent,
    },
  },
};

export const Basic = (args) => <MemoPopUp {...args} />;