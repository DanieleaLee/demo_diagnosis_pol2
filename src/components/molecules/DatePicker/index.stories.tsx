import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DatePicker from './index';
import { makeStorybookTitle } from '../../_temp/v2/helper';

const storyBookTitle = makeStorybookTitle('v2', 'Molecules', 'DatePicker');

export default {
  title: storyBookTitle,
  component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (args) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedate, setSelectedate] = useState('');
  const selectDateHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedate(event.currentTarget.value);
    setShowCalendar(false);
  };
  const showCalendarHandler = () => {
    setShowCalendar((prevState) => !prevState);
  };
  return (
    <DatePicker
      {...args}
      selectedDate={selectedate}
      selectDateHandler={selectDateHandler}
      showCalendar={showCalendar}
      showCalendarHandler={showCalendarHandler}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  width: 300,
  height: 50,
};
