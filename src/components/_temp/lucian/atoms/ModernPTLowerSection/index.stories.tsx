import ModernPTLowerSectionBox from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "Lucian",
  "Atoms",
  "modernPTLowerSectionBox",
  "ModernPTLowerSectionBox"
);

export default {
  title: storyBookTitle,
  component: ModernPTLowerSectionBox,
} as ComponentMeta<typeof ModernPTLowerSectionBox>;

const Template: ComponentStory<typeof ModernPTLowerSectionBox> = (args) => (
  <ModernPTLowerSectionBox {...args} />
);

export const ScrollBody = Template.bind({});
ScrollBody.args = {
  width: 300,
  height: 100,
  children: (
    <div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
    </div>
  ),
  isScroll: true,
  childrenWidth: 20,
  childrenHeight: 20,
  scrollBarWidth: 2,
  scrollBgColor: "#ECECEC",
  scrollBarColor: "#9DA6AD",
  borderColor: "#CED9E1",
};

export const Default = Template.bind({});
Default.args = {
  width: 300,
  height: 500,
  children: (
    <div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
    </div>
  ),
  isScroll: false,
  borderColor: "#CED9E1",
};

export const Disabled = Template.bind({});
Disabled.args = {
  width: 300,
  height: 500,
  children: (
    <div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
    </div>
  ),
  isScroll: false,
  isDisabled: true,
};
