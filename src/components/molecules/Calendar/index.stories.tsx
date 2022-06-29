import { ComponentStory, ComponentMeta } from '@storybook/react';
import { makeStorybookTitle } from '../../_temp/v2/helper';
import Calendar from './index';
import moment from 'moment';

const storyBookTitle = makeStorybookTitle('v2', 'Molecules', 'Calendar');

export default {
  title: storyBookTitle,
  component: Calendar,
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args) => <Calendar {...args} />;

export const Default = Template.bind({});
Default.args = {
  selectedDate: '1',
  width: 150,
  today: moment(),
};
