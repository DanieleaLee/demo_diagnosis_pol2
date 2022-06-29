import InvalidBox, { InvalidBoxProps } from './index';
import { makeStorybookTitle } from '../../_temp/v2/helper';

const storyBookTitle = makeStorybookTitle('v2', 'atoms', 'InvalidBox');

const option = {
  title: storyBookTitle,
  component: InvalidBox,
  argTypes: {
    errorMessage: {
      control: { type: 'text', require: true },
      defaultValue: 'error test',
    },
  },
};

export default option;

export const Basic = (args: InvalidBoxProps) => <InvalidBox {...args} />;
