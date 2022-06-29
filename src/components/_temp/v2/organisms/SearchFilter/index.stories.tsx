import { ComponentStory, ComponentMeta } from '@storybook/react';
import SearchFilter from './index';
import { makeStorybookTitle } from '@tempComponents/v2/helper';
import fakeData from './db.json';

const storyBookTitle = makeStorybookTitle('v2', 'Organisms', 'SearchFilter');

export default {
  title: storyBookTitle,
  component: SearchFilter,
} as ComponentMeta<typeof SearchFilter>;

const Template: ComponentStory<typeof SearchFilter> = (args) => (
  <SearchFilter filterLists={fakeData} onApply={(data) => console.log(data)} {...args} />
);

export const Default = Template.bind({});
Default.args = {};
