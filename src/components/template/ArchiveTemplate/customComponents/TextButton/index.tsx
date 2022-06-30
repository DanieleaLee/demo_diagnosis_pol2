import React from 'react';
import { css, useTheme } from '@emotion/react';
import { flexCenter } from '@styles';
import Colors from '@styles/colors';
import * as Typography from '@styles/typography';
import Buttonable,{ButtonableProps}from '@components/atoms/Buttonable';
import TextButtonTiny from './TextButtonTiny';

const accentStyle = (disabled: boolean) => css`
  background-color: ${disabled ? Colors.button1Disabled : Colors.button1};
`;
const primaryStyle = (disabled: boolean) => css`
  background-color: ${disabled ? Colors.button2Disabled : Colors.button2};
`;
const commonStyle = (disabled: boolean) => css`
  background-color: ${disabled ? Colors.button3Disabled : Colors.button3};
  border: 1.5px solid ${disabled ? Colors.button3DisabledText : Colors.button3Text};
`;
const defaultStyle = (disabled: boolean) => css`
  background-color: transparent;
`;

export const bgThemeList = (disabled: boolean) => ({
  accent: accentStyle(disabled),
  primary: primaryStyle(disabled),
  common: commonStyle(disabled),
  default: defaultStyle(disabled),
});

export const colorList = (disabled: boolean) => ({
  accent: disabled ? Colors.button1DisabledText : Colors.button1Text,
  primary: disabled ? Colors.button2DisabledText : Colors.button2Text,
  common: disabled ? Colors.button3DisabledText : Colors.button3Text,
  default: disabled ? Colors.button3DisabledText : Colors.button3Text,
});

const textStyle = (hasIcon: boolean, leftMargin: string, rightMargin: string) => css`
  text-align: center;
  padding-bottom: ${hasIcon ? '0.2rem' : '0'};
  margin-left: ${leftMargin ? leftMargin : '0'};
  margin-right: ${rightMargin ? rightMargin : '0'};
`;

export interface ButtonProps extends ButtonableProps {
  title: string;
  color?: string;
  left?: React.ReactNode;
  leftMargin?: string;
  right?: React.ReactNode;
  rightMargin?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string | number;
}

export type TextButtonProps = ButtonProps & React.HTMLAttributes<HTMLButtonElement>;

/**
 * 텍스트 버튼, 버튼 양옆에 아이콘 가능
 */
const TextButton = ({
  onClick,
  title,
  color,
  left,
  leftMargin,
  right,
  rightMargin,
  fontSize = '1rem',
  fontWeight = 'normal',
  lineHeight = 1,
  ...props
}: TextButtonProps) => {
  const theme = useTheme();

  return (
    <Buttonable onClick={onClick} containerCss={css`margin: 0.25rem; ${flexCenter}`} {...props}>
      {left}
      <Typography.Base
        color={color || theme.colors.primary2}
        fontSize={fontSize}
        fontWeight={fontWeight}
        lineHeight={lineHeight}
        css={textStyle(!!left || !!right, leftMargin, rightMargin)}
      >
        {title}
      </Typography.Base>
      {right}
    </Buttonable>
  );
};

export const Basic = TextButton;
export const Tiny = TextButtonTiny;

export default TextButton;
