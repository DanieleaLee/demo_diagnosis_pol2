import SearchBar, { SearchBarProps } from './index';
import { makeStorybookTitle } from '@tempComponents/v2/helper';

const storyBookTitle = makeStorybookTitle('v2', 'Molecules', 'SearchBar');

const option = {
  title: storyBookTitle,
  component: SearchBar,
  argTypes: {},
};

export default option;

export const Basic = (args: SearchBarProps) => <SearchBar {...args} />;
