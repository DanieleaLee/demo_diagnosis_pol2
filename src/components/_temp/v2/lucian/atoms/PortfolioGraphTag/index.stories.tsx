import PortfolioGraphTag from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";
import Colors from "@styles/colors";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Atoms",
  "PortfolioGraphTag"
);

export default {
  title: storyBookTitle,
  component: PortfolioGraphTag,
} as ComponentMeta<typeof PortfolioGraphTag>;

const Template: ComponentStory<typeof PortfolioGraphTag> = (args) => (
  <PortfolioGraphTag {...args} />
);

export const Default = Template.bind({});
Default.args = {
  width: 136,
  backgroundColor: Colors.primary2,
  tagName: "Inflation enhancing Portfolio",
};
