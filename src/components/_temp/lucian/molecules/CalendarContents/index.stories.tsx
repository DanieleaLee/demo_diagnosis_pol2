import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucianComponents/helper";
import CalendarContents from "./index";
import moment from "moment";

const storyBookTitle = makeStorybookTitle(
  "Lucian",
  "Molecules",
  "CalendarContents",
  "CalendarContents"
);

export default {
  title: storyBookTitle,
  component: CalendarContents,
} as ComponentMeta<typeof CalendarContents>;

const Template: ComponentStory<typeof CalendarContents> = (args) => (
  <CalendarContents {...args} />
);

export const Default = Template.bind({});
Default.args = {
  selectedDate: "1",
  width: 150,
  today: moment(),
};
