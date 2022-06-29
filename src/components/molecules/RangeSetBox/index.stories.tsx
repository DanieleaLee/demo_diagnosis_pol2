import RangeSetBox, { RangeSetBoxProps } from './index';
import { makeStorybookTitle } from '../../_temp/v2/helper';

const storyBookTitle = makeStorybookTitle('v2', 'Atoms', 'RangeSetBox');

const option = {
  title: storyBookTitle,
  component: RangeSetBox,
  argTypes: {
    open: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
    min: {
      control: { type: 'number' },
      defaultValue: 0,
    },
    max: {
      control: { type: 'number' },
      defaultValue: 100,
    },
    minLimit: {
      control: { type: 'number' },
      defaultValue: 30,
    },
    maxLimit: {
      control: { type: 'number' },
      defaultValue: 50,
    },
  },
};

export default option;

export const Basic = (args: RangeSetBoxProps) => <RangeSetBox {...args} />;
