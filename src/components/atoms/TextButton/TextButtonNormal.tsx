import React from 'react';
import TextButton, { TextButtonProps, bgThemeList, colorList } from '@components/atoms/TextButton/index';
import { css } from '@emotion/react';

interface TextButtonNormalProps extends TextButtonProps {
  bgTheme?: 'accent' | 'primary' | 'common' | 'default';
}

const originStyle = css`
  min-width: 102px;
  height: 46px;
  padding: 0 21px;
  border-radius: 8px;
  letter-spacing: 0.03em;
  font-family: 'Inter';
`;

const TextButtonNormal = ({ title, onClick, bgTheme = 'default', ...props }: TextButtonNormalProps) => {
  const { disabled } = props;
  return (
    <TextButton
      fontSize="18px"
      color={colorList(disabled)[bgTheme]}
      fontWeight={'600'}
      lineHeight="22px"
      title={title}
      onClick={onClick}
      css={[originStyle, bgThemeList(disabled)[bgTheme]]}
      {...props}
    />
  );
};

export default TextButtonNormal;
