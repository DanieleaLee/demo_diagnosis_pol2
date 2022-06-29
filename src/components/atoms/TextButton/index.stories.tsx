import * as TextButton from './index';
import { TextButtonProps } from './index';
import { Story } from '@storybook/react';
import { FaUser } from 'react-icons/fa';
import { makeStorybookTitle } from '../../_temp/v2/helper';

const storyBookTitle = makeStorybookTitle('v2', 'Atoms', 'TextButton');

const _story = {
  title: storyBookTitle,
  component: TextButton,
  argTypes: {
    title: {
      control: { type: 'text', required: true },
      defaultValue: 'Components',
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    bgTheme: {
      control: { type: 'inline-radio' },
      options: ['accent', 'primary', 'common', 'default'],
      defaultValue: 'primary',
    },
    onClick: {
      action: 'onClick',
    },
  },
};

export default _story;

export const Small: Story<TextButtonProps> = (args) => <TextButton.Small {...args} />;
export const Normal: Story<TextButtonProps> = (args) => <TextButton.Normal {...args} />;
export const Tiny: Story<TextButtonProps> = (args) => <TextButton.Tiny {...args} />;
