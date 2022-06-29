import FilteredTag from './index';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { makeStorybookTitle } from '../../_temp/v2/helper';

const storyBookTitle = makeStorybookTitle('v2', 'Atoms', 'FilteredTag');

export default {
  title: storyBookTitle,
  component: FilteredTag,
} as ComponentMeta<typeof FilteredTag>;

const Template: ComponentStory<typeof FilteredTag> = (args) => <FilteredTag {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: '100',
  title: 'Filter',
  checkedElements: ['1', '2', '3'],
  showCategories: false,
};
