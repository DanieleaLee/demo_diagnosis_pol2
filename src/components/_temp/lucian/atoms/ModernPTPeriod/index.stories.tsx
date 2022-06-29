import ModernPTPeriodBox from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "Lucian",
  "Atoms",
  "modernPTPeriodBox",
  "ModernPTPeriodBox"
);

export default {
  title: storyBookTitle,
  component: ModernPTPeriodBox,
} as ComponentMeta<typeof ModernPTPeriodBox>;

const Template: ComponentStory<typeof ModernPTPeriodBox> = (args) => (
  <ModernPTPeriodBox {...args} />
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
