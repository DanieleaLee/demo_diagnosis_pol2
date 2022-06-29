import BasicBox from './index';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { makeStorybookTitle } from '../../_temp/v2/helper';

const storyBookTitle = makeStorybookTitle('v2', 'Atoms', 'BasicBox');

export default {
  title: storyBookTitle,
  component: BasicBox,
} as ComponentMeta<typeof BasicBox>;

const Template: ComponentStory<typeof BasicBox> = (args) => <BasicBox {...args} />;

export const ScrollBody = Template.bind({});
ScrollBody.args = {
  width: 300,
  height: 100,
  children: (
    <div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
    </div>
  ),

  childrenWidth: 20,
  childrenHeight: 20,
  scrollBarWidth: 2,
  scrollBgColor: '#ECECEC',
  scrollBarColor: '#9DA6AD',
  borderColor: '#CED9E1',
};

export const Default = Template.bind({});
Default.args = {
  width: 300,
  height: 500,
  children: (
    <div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
    </div>
  ),

  borderColor: '#CED9E1',
};

export const Disabled = Template.bind({});
Disabled.args = {
  width: 300,
  height: 500,
  children: (
    <div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
      <div>dsfsdfsd</div>
    </div>
  ),

  isDisabled: true,
};
