import ProgressBarBody, { ProgressBarBodyProps } from './index';
import { makeStorybookTitle } from '@tempComponents/v2/helper';

const storyBookTitle = makeStorybookTitle('v2', 'atoms', 'ProgressBarBody');

const option = {
  title: storyBookTitle,
  component: ProgressBarBody,
  argTypes: {
    value: {
      control: { type: 'number', required: true },
      defaultValue: 40,
    },
    total: {
      control: { type: 'number', required: true },
      defaultValue: 100,
    },
    progressVisible: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    visibleType: {
      control: { type: 'inline-radio' },
      options: ['value', 'percentage'],
      defaultValue: 'percentage',
    },
    toFixed: {
      control: { type: 'number' },
      defaultValue: 3,
    },
  },
};

export default option;

export const Basic = (args: ProgressBarBodyProps) => <ProgressBarBody {...args} />;
