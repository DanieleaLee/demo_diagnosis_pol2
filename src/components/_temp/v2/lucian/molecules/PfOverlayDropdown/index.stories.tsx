import PfOverlayDropdown from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Molecules",
  "PfOverlayDropdown"
);

export default {
  title: storyBookTitle,
  component: PfOverlayDropdown,
} as ComponentMeta<typeof PfOverlayDropdown>;

const Template: ComponentStory<typeof PfOverlayDropdown> = (args) => (
  <PfOverlayDropdown {...args} />
);

export const Default = Template.bind({});
Default.args = {
  type: "benchmark",
  radioData: [
    {
      id: 1,
      name: "S&P 500",
    },
    {
      id: 2,
      name: "NASDAQ",
    },
    {
      id: 3,
      name: "KOSPI",
    },
  ],
  contents: {
    period: {
      startDate: "2000-10-20",
      endDate: "2010-10-20",
    },
    cost: 10,
    benchmark: "s&p 500",
    rebalancing: "tpe",
  },
};
