import PfDateBar from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Molecules",
  "PfDateBar"
);

export default {
  title: storyBookTitle,
  component: PfDateBar,
} as ComponentMeta<typeof PfDateBar>;

const Template: ComponentStory<typeof PfDateBar> = (args) => (
  <PfDateBar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  portfolioList: [
    {
      element: [
        "1",
        "Warren Buffets",
        "Asset Allocation",
        "Portfolio Generation",
        "ETFs",
        "8",
        "1980-12-01",
        "2022-02-28",
      ],
    },
  ],
};
