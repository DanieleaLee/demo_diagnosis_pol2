import PfGraphTag from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Molecules",
  "PfGraphTag"
);

export default {
  title: storyBookTitle,
  component: PfGraphTag,
} as ComponentMeta<typeof PfGraphTag>;

const Template: ComponentStory<typeof PfGraphTag> = (args) => (
  <PfGraphTag {...args} />
);

export const Default = Template.bind({});
Default.args = {
  portfolioList: [
    {
      element: ["1", "Inflation enhancing Portfolio"],
    },
    {
      element: ["2", "Inflation enhancing Portfolio"],
    },
    {
      element: ["3", "Inflation enhancing Portfolio"],
    },
  ],
};
