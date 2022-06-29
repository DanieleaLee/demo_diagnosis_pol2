import FilterDropdownBox from './index';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { makeStorybookTitle } from '../../_temp/v2/helper';

const storyBookTitle = makeStorybookTitle('v2', 'Molecules', 'FilterDropdownBox');

export default {
  title: storyBookTitle,
  component: FilterDropdownBox,
} as ComponentMeta<typeof FilterDropdownBox>;

const Template: ComponentStory<typeof FilterDropdownBox> = (args) => <FilterDropdownBox {...args} />;

const FILTER_BOX_DATA = [
  { id: 'snp500', name: 'S&P 500' },
  { id: 'nasdaq', name: 'NASDAQ' },
  { id: 'kospi', name: 'KOSPI' },
  { id: 'kosdq', name: 'KOSDAQ' },
  { id: 'nasd', name: 'NASD' },
];

export const Default = Template.bind({});
Default.args = {
  index: 0,
  title: 'IndexName',
  data: FILTER_BOX_DATA,
  checkedItems: ['S&P 500', 'NASDAQ'],
};
