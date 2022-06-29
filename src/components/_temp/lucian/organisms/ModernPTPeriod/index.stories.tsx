import ModernPTPeriodWithContents from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "Lucian",
  "Organisms",
  "modernPTPeriod",
  "ModernPTPeriodWithContents"
);

export default {
  title: storyBookTitle,
  component: ModernPTPeriodWithContents,
} as ComponentMeta<typeof ModernPTPeriodWithContents>;

const Template: ComponentStory<typeof ModernPTPeriodWithContents> = (args) => (
  <ModernPTPeriodWithContents {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <div style={{ display: "flex" }}>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
    </div>
  ),
};
