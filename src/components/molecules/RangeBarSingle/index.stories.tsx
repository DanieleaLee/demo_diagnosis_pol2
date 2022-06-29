import RangeBar1, { RangeBar1Props } from './index';
import { makeStorybookTitle } from '../../_temp/v2/helper';

const storyBookTitle = makeStorybookTitle('v2', 'atoms', 'RangeBar1');

const option = {
  title: storyBookTitle,
  component: RangeBar1,
  argTypes: {
    min: {
      control: { type: 'number' },
      defaultValue: 0,
    },
    max: {
      control: { type: 'number' },
      defaultValue: 100,
    },
    visibleType: {
      control: { type: 'inline-radio' },
      options: ['value', 'percentage'],
      defaultValue: 'value',
    },
    demicalPoint: {
      control: { type: 'number' },
      defaultValue: 0,
    },
  },
};

export default option;

export const Basic = (args: RangeBar1Props) => <RangeBar1 {...args} />;
