import CalendarDateButton from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "../../_temp/v2/helper";
import moment from 'moment'

const storyBookTitle = makeStorybookTitle(
  "v2",
  "Atoms",
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
  selectedDate: '2022-04-20',
  width: 150,
  height: 50,
};
