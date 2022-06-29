import React from "react";
import TextButton, {
  TextButtonProps,
  bgThemeList,
  colorList,
} from "@components/atoms/TextButton";
import { css } from "@emotion/react";

interface TextButtonTinyProps extends TextButtonProps {
  icon?: (props: any) => JSX.Element;
  height?: number;
  bgTheme?: "accent" | "primary" | "common" | "default";
}

const originStyle = (height: number) => css`
  min-width: 104px;
  height: ${height}px;
  padding: 0 9px;
  border-radius: 4px;
  letter-spacing: 0.03em;
  font-family: "Inter";
`;

const TextButtonTinyWithBg = ({
  icon,
  title,
  onClick,
  height,
  bgTheme,
  ...props
}: TextButtonTinyProps) => {
  const { disabled } = props;
  return (
    <TextButton
      {...(icon && {
        leftMargin: "5px",
        left: icon({ color: disabled ? "#9DA6AD" : "white" }),
      })}
      fontSize="13px"
      color={colorList(disabled)[bgTheme]}
      fontWeight={"600"}
      lineHeight="16px"
      title={title}
      onClick={onClick}
      css={[originStyle(height), bgThemeList(disabled)[bgTheme]]}
      {...props}
    />
  );
};

export default TextButtonTinyWithBg;

export const TinyBg = TextButtonTinyWithBg;
