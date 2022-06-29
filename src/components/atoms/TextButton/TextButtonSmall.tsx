import React from "react";
import TextButton, { TextButtonProps, bgThemeList, colorList } from "@components/atoms/TextButton/index";
import { css } from "@emotion/react";

interface TextButtonSmallProps extends TextButtonProps {
  bgTheme?: "accent" | "primary" | "common" | "default";
  icon?: (props: any) => JSX.Element;
}

const originStyle = css`
  min-width: 104px;
  height: 40px;
  padding: 0 16px;
  border-radius: 8px;
  letter-spacing: 0.03em;
  font-family: "Inter";
`;

const TextButtonSmall = ({ icon, title, onClick, bgTheme = "default", ...props }: TextButtonSmallProps) => {
  const { disabled } = props;
  return (
    <TextButton
      {...(icon && { leftMargin: "5px", left: icon({ color: disabled ? "#9DA6AD" : "white" }) })}
      fontSize="16px"
      color={colorList(disabled)[bgTheme]}
      fontWeight={"600"}
      lineHeight="19px"
      title={title}
      onClick={onClick}
      css={[originStyle, bgThemeList(disabled)[bgTheme]]}
      {...props}
    />
  );
};

export default TextButtonSmall;
