import CalendarDateButton from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "Lucian",
  "Molecules",
  "calendar",
  "CalendarDateButton"
);

export default {
  title: storyBookTitle,
  component: CalendarDateButton,
} as ComponentMeta<typeof CalendarDateButton>;

const Template: ComponentStory<typeof CalendarDateButton> = (args) => (
  <CalendarDateButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  selectedDate: "1",
  width: 150,
  height: 50,
};
