import PortfolioResultCard from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Atoms",
  "PortfolioResultCard"
);

export default {
  title: storyBookTitle,
  component: PortfolioResultCard,
} as ComponentMeta<typeof PortfolioResultCard>;

const Template: ComponentStory<typeof PortfolioResultCard> = (args) => (
  <PortfolioResultCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  width: 570,
  height: 135,
  clicked: false,
};
