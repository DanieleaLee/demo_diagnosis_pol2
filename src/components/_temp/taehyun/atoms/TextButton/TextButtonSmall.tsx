import React from 'react';
import TextButton, { TextButtonProps, bgThemeList, colorList } from '@taehyunComponents/atoms/TextButton';
import { css } from '@emotion/react';

interface TextButtonSmallProps extends TextButtonProps {
  bgTheme?: 'accent' | 'primary' | 'common' | 'default';
}

const originStyle = css`
  /* min-width: 248px; */
  height: 40px;
  padding: 0 16px;
  border-radius: 8px;
  letter-spacing: 0.03em;
  font-family: 'Inter';
`;

const TextButtonSmall = ({ title, onClick, bgTheme = 'default', ...props }: TextButtonSmallProps) => {
  const { disabled } = props;
  return (
    <TextButton
      fontSize="16px"
      color={colorList(disabled)[bgTheme]}
      fontWeight={'600'}
      lineHeight="19px"
      title={title}
      onClick={onClick}
      css={[originStyle, bgThemeList(disabled)[bgTheme]]}
      {...props}
    />
  );
};

export default TextButtonSmall;
