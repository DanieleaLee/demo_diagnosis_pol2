import PortfolioTag from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Atoms",
  "PortfolioTag"
);

export default {
  title: storyBookTitle,
  component: PortfolioTag,
} as ComponentMeta<typeof PortfolioTag>;

const Template: ComponentStory<typeof PortfolioTag> = (args) => (
  <PortfolioTag {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Portfolio Type",
  element: "Asset Allocation",
};

export const ArrayElement = Template.bind({});
ArrayElement.args = {
  title: "Portfolio Type",
  element: ["Asset Allocation", "Asset Allocation", "Asset Allocation"],
};
