import ImportMethodModal from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Organisms",
  "ImportMethodModal"
);

export default {
  title: storyBookTitle,
  component: ImportMethodModal,
} as ComponentMeta<typeof ImportMethodModal>;

const Template: ComponentStory<typeof ImportMethodModal> = (args) => (
  <ImportMethodModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  width: 1579,
  height: 656,
  selectTable: [
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
    {
      id: "4",
      portfolio_name: "Inflation enhancing Multi-Asset",
      portfolio_type: "Asset Allocation",
      underlaying_assets: "Indices",
      holdings: 8,
      source: "Portfolio Generation",
      initial_date: "1980-12-01",
      end_date: "2022-02-28",
    },
    {
      id: "5",
      portfolio_name: "Qraft-allweather",
      portfolio_type: "EMP Portfolio",
      underlaying_assets: "ETFs",
      holdings: 8,
      source: "Portfolio Generation",
      initial_date: "2000-02-01",
      end_date: "2022-02-28",
    },
  ],
  setSelectTable: () => {},
};
