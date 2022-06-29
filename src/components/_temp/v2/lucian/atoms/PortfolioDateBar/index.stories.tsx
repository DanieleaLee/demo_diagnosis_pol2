import PortfolioDateBar from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Atoms",
  "PortfolioDateBar"
);

export default {
  title: storyBookTitle,
  component: PortfolioDateBar,
} as ComponentMeta<typeof PortfolioDateBar>;

const Template: ComponentStory<typeof PortfolioDateBar> = (args) => (
  <PortfolioDateBar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  background: "yellow",
  startDate: "1980-12",
  endDate: "2022-02",
  minDate: "1980-12",
  maxDate: "2022-02",
  totalDiff: 300000,
  getDateDiff: (startDate, endDate) => {
    console.log(startDate, endDate);
  },
};

export const PfDateBarPadding = Template.bind({});
PfDateBarPadding.args = {
  background: "yellow",
  startDate: "1980-12",
  endDate: "2022-02",
  minDate: "1980-12",
  maxDate: "2022-02",
  totalDiff: 300000,
  getDateDiff: (startDate, endDate) => {
    console.log(startDate, endDate);
  },
};
