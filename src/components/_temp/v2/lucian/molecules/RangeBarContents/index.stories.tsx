import React, { useState } from "react";
import { css } from "@emotion/react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RangeSetBtn from "./index";
import { makeStorybookTitle } from "@tempComponents/v2/helper";

const storyBookTitle = makeStorybookTitle("v2", "Molecules", "RangeSetBtn");

export default {
  title: storyBookTitle,
  component: RangeSetBtn,
} as ComponentMeta<typeof RangeSetBtn>;

const Template: ComponentStory<typeof RangeSetBtn> = (args) => {
  const [open, setOpen] = useState(false);
  const [range, setRanges] = useState({ min: 0, max: 100 });
  const applyRangeHandle = (props: { min: number; max: number }) => {
    const { min, max } = props;
    setRanges({ min: min, max: max });
  };
  return (
    <div
      css={css`
        padding: 100px;
      `}
    >
      <RangeSetBtn
        {...args}
        rowId={"test_1"}
        open={open}
        setOpen={setOpen}
        minValue={range.min}
        maxValue={range.max}
        minLimit={100}
        maxLimit={0}
        onApply={applyRangeHandle}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  rowId: "test_1",
  minLimit: 100,
  maxLimit: 0,
};
