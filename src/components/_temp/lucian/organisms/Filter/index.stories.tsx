import { ComponentStory, ComponentMeta } from "@storybook/react";
import Filter from "./index";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "Lucian",
  "Organisms",
  "Filter",
  "Filter"
);

export default {
  title: storyBookTitle,
  component: Filter,
} as ComponentMeta<typeof Filter>;

const Template: ComponentStory<typeof Filter> = (args) => <Filter {...args} />;

export const Default = Template.bind({});
Default.args = {};
