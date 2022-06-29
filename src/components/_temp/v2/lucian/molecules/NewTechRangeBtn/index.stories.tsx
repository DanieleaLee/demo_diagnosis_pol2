import { useState } from "react";
import NewTechRangeBtn from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Molecules",
  "NewTechRangeBtn"
);

export default {
  title: storyBookTitle,
  component: NewTechRangeBtn,
} as ComponentMeta<typeof NewTechRangeBtn>;

const Template: ComponentStory<typeof NewTechRangeBtn> = (args) => {
  const [open, setOpen] = useState(false);
  const [range, setRanges] = useState({ min: 0, max: 50});
  const applyRangeHandler = (props: { min: number; max: number }) => {
    const { min, max } = props;
    setRanges({ min, max });
  };
  return (
    <div>
      <NewTechRangeBtn {...args} rowId={"test_1"} open={open} setOpen={setOpen} minValue={range.min} maxValue={range.max} minLimit={50} maxLimit={0} onApply={applyRangeHandler}/>
    </div>
  )
}
export const Default = Template.bind({});
Default.args = {
  rowId: 'test_1',
  minLimit: 50,
  maxLimit: 0,
};
