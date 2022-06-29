import PortfolioRadioSelection from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Atoms",
  "PortfolioRadioSelection"
);

export default {
  title: storyBookTitle,
  component: PortfolioRadioSelection,
} as ComponentMeta<typeof PortfolioRadioSelection>;

const Template: ComponentStory<typeof PortfolioRadioSelection> = (args) => (
  <PortfolioRadioSelection {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: "1",
  name: "1",
  value: "1",
  label: "11",
};
