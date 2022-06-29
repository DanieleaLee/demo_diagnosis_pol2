import GaugeBar from "./index";
import { makeStorybookTitle } from "@alvinComponents/helper";

const storyBookTitle = makeStorybookTitle("taehyun", "Molecules", "GaugeBar");

const option = {
  title: storyBookTitle,
  component: GaugeBar,
  argTypes: {
    value: {
      control: { type: "number", required: true },
      defaultValue: 40,
    },
    total: {
      control: { type: "number", required: true },
      defaultValue: 100,
    },
  },
};

export default option;

export const Basic = (args) => <GaugeBar {...args} />;
