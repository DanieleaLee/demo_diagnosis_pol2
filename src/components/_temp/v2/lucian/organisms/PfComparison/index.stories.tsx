import PfComparison from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Organisms",
  "PfComparison"
);

export default {
  title: storyBookTitle,
  component: PfComparison,
} as ComponentMeta<typeof PfComparison>;

const Template: ComponentStory<typeof PfComparison> = (args) => (
  <PfComparison {...args} />
);

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
    {
      element: [
        "2",
        "Inflation enhancing",
        "Asset Allocation",
        "Portfolio Generation",
        "Indices",
        "8",
        "2000-02-01",
        "2022-02-28",
      ],
    },
    {
      element: [
        "3",
        "Inflation enhancing Multi",
        "Asset Allocation",
        "Portfolio Generation",
        "Indices",
        "8",
        "2000-02-01",
        "2022-02-28",
      ],
    },
  ],
  removeComparedPortfolio: () => {},
};
