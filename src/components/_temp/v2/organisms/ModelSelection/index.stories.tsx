import { ComponentStory, ComponentMeta } from '@storybook/react';
import ModelSelection from './index';
import { modelData } from './mockData';
import { makeStorybookTitle } from '@tempComponents/v2/helper';

const storyBookTitle = makeStorybookTitle('v2', 'Organisms', 'ModelSelection');

export default {
  title: storyBookTitle,
  component: ModelSelection,
} as ComponentMeta<typeof ModelSelection>;

const Template: ComponentStory<typeof ModelSelection> = (args) => (
  <ModelSelection
    modelData={modelData}
    // isReset={isReset}
    onSubmit={(selectedModelId: string) => {
      localStorage.setItem('selectedModelId', selectedModelId); // recoil state로 변경 필요
      console.log(selectedModelId);
    }}
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {};
