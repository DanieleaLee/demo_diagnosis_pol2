import NewTechRangeBar from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Organisms",
  "NewTechRangeBar"
);

export default {
  title: storyBookTitle,
  component: NewTechRangeBar,
} as ComponentMeta<typeof NewTechRangeBar>;

const Template: ComponentStory<typeof NewTechRangeBar> = (args) => (
  <NewTechRangeBar {...args} />
);

export const Default = Template.bind({});
Default.args = {
};
