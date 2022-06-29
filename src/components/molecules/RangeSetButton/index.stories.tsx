import React, { useState } from 'react';
import {css} from '@emotion/react'
import { ComponentStory, ComponentMeta } from '@storybook/react';
import RangeSetButton from './index';
import { makeStorybookTitle } from '@tempComponents/v2/helper';

const storyBookTitle = makeStorybookTitle('v2', 'Molecules', 'RangeSetButton');

export default {
  title: storyBookTitle,
  component: RangeSetButton,
} as ComponentMeta<typeof RangeSetButton>;

const Template: ComponentStory<typeof RangeSetButton> = (args) => {
  const [open, setOpen] = useState(false);
  const [range, setRanges] = useState({ min: 0, max: 100 });
  const applyRangeHandle = (props: { min: number; max: number }) => {
    const { min, max } = props;
    setRanges({ min: min, max: max });
  };
  return (
    <div css={css`padding:100px`}>
      <RangeSetButton
        {...args}
        rowId={'test_1'}
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
  rowId: 'test_1',
  minLimit: 100,
  maxLimit: 0,
};
