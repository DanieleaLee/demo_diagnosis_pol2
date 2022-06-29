import { ComponentStory, ComponentMeta } from '@storybook/react';
import ModelConfigBox from './index';
import { makeStorybookTitle } from '@tempComponents/v2/helper';

const storyBookTitle = makeStorybookTitle('v2', 'Organisms', 'ModelConfigBox');

export default {
  title: storyBookTitle,
  component: ModelConfigBox,
} as ComponentMeta<typeof ModelConfigBox>;

const Template: ComponentStory<typeof ModelConfigBox> = (args) => <ModelConfigBox {...args} rowData={DATA} />;

export const Default = Template.bind({});
Default.args = {};

const DATA = [
  { id: 'snp500', title: 'S&P 500' },
  { id: 'index1', title: 'IndexName1' },
  { id: 'index2', title: 'IndexName2' },
  { id: 'index3', title: 'IndexName3' },
];
