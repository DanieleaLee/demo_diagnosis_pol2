import ModelConfigRangeRow, { ModelConfigRangeRowProps } from './index';
import { makeStorybookTitle } from '@tempComponents/v2/helper';
import { useState } from 'react';
import { css } from '@emotion/react';

const storyBookTitle = makeStorybookTitle('v2', 'Molecules', 'ModelConfigRangeRow');

const option = {
  title: storyBookTitle,
  component: ModelConfigRangeRow,
  argTypes: {
    rowId: {
      control: { type: 'text', required: true },
      defaultValue: 'total',
    },
    title: {
      control: { type: 'text', required: true },
      defaultValue: 'Total',
    },
    minLimit: {
      control: { type: 'number', required: true },
      defaultValue: 100,
    },
    maxLimit: {
      control: { type: 'number', required: true },
      defaultValue: 0,
    },
    minValue: {
      control: { type: 'number', required: true },
      defaultValue: 0,
    },
    maxValue: {
      control: { type: 'number', required: true },
      defaultValue: 100,
    },
  },
};

export default option;

export const Basic = (args: ModelConfigRangeRowProps) => (
  <div
    css={css`
      width: 300px;
    `}
  >
    <ModelConfigRangeRow {...args} />
  </div>
);
