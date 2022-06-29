import PfList from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Organisms",
  "PfList"
);

export default {
  title: storyBookTitle,
  component: PfList,
} as ComponentMeta<typeof PfList>;

const Template: ComponentStory<typeof PfList> = (args) => <PfList {...args} />;

export const Default = Template.bind({});
Default.args = {
  portfolioList: [
    {
      element: [
        "1",
        "Inflation enhancing Multi-Asset",
        "Asset Allocation",
        "Portfolio Generation",
        "Indices",
        "8",
        "2000-02-01",
        "2022-02-28",
      ],
    },
  ],
  selectedTANotUndefined: [
    {
      id: "1",
      portfolio_name: "Inflation enhancing Multi-Asset",
      portfolio_type: "Asset Allocation",
      underlaying_assets: "Indices",
      holdings: 8,
      source: "Portfolio Generation",
      initial_date: "1980-12-01",
      end_date: "2022-02-28",
    },
    {
      id: "2",
      portfolio_name: "Qraft-allweather",
      portfolio_type: "EMP Portfolio",
      underlaying_assets: "ETFs",
      holdings: 8,
      source: "Portfolio Generation",
      initial_date: "2000-02-01",
      end_date: "2022-02-28",
    },
    {
      id: "3",
      portfolio_name: "Warren Buffet's 90/10",
      portfolio_type: "Asset Allocation",
      underlaying_assets: "ETFs, Equities",
      holdings: 8,
      source: "Portfolio Generation",
      initial_date: "1996-06-01",
      end_date: "2016-04-30",
    },
  ],
  setSelectedTableArr: () => {},
};
