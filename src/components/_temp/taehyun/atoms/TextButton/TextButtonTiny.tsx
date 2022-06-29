import React from 'react';
import TextButton, { TextButtonProps, bgThemeList, colorList } from '@taehyunComponents/atoms/TextButton';
import { css } from '@emotion/react';
import Colors from '@styles/colors';

interface TextButtonTinyProps extends TextButtonProps {
  icon?: (props: any) => JSX.Element;
}

const originStyle = css`
  min-width: 104px;
  height: 28px;
  padding: 0 9px;
  border-radius: 4px;
  letter-spacing: 0.03em;
  font-family: 'Inter';
`;

const backgroundStyle = (disabled: boolean) => css`
  background-color: ${disabled ? '#F3F3F3' : '#2E3B43'};
  border: ${disabled ? '0.5px solid #9DA6AD;' : '1px solid #2E3B43'};
`;

const TextButtonTiny = ({ icon, title, onClick, ...props }: TextButtonTinyProps) => {
  const { disabled } = props;
  return (
    <TextButton
      {...(icon && { leftMargin: '5px', left: icon({ color: disabled ? '#9DA6AD' : 'white' }) })}
      fontSize="13px"
      color={disabled ? '#9DA6AD' : 'white'}
      fontWeight={'600'}
      lineHeight="16px"
      title={title}
      onClick={onClick}
      css={[originStyle, backgroundStyle(disabled)]}
      {...props}
    />
  );
};

export default TextButtonTiny;
