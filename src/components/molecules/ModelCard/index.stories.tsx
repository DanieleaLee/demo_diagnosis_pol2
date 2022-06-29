import ModelCard, { ModelCardProps } from './index';
import { makeStorybookTitle } from '../../_temp/v2/helper';
import { useState } from 'react';

const storyBookTitle = makeStorybookTitle('v2', 'Molecules', 'ModelCard');

const option = {
  title: storyBookTitle,
  component: ModelCard,
  argTypes: {
    modelId: {
      control: { type: 'text', required: true },
      defaultValue: 'svm',
    },
    title: {
      control: { type: 'text', required: true },
      defaultValue: 'Support Vector Machines',
    },
    description: {
      control: { type: 'text', required: true },
      defaultValue:
        'support-vector machines (SVMs, also support-vector networks[1]) are supervised learning models with associated learning algorithms that analyze data for classification and regression analysis.',
    },
    isSelected: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
};

export default option;

export const Basic = (args: ModelCardProps) => <ModelCard {...args} />;
