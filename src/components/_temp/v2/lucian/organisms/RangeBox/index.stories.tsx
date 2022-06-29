import RangeBox from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Organisms",
  "RangeBox"
);

export default {
  title: storyBookTitle,
  component: RangeBox,
} as ComponentMeta<typeof RangeBox>;

const Template: ComponentStory<typeof RangeBox> = (args) => (
  <RangeBox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  rowData: [
    { id: "0", title: "S&P 500" },
    { id: "1", title: "IndexName1" },
    { id: "2", title: "IndexName2" },
    { id: "3", title: "IndexName3" },
    { id: "4", title: "IndexName4" },
    { id: "5", title: "IndexName5" },
    { id: "6", title: "IndexName6" },
    { id: "7", title: "IndexName7" },
    { id: "8", title: "IndexName8" },
    { id: "9", title: "IndexName9" },
    { id: "10", title: "IndexName10" },
    { id: "11", title: "IndexName11" },
    { id: "12", title: "IndexName12" },
    { id: "13", title: "IndexName13" },
    { id: "14", title: "IndexName14" },
    { id: "15", title: "IndexName15" },
  ],
  rowId: "0",
};
