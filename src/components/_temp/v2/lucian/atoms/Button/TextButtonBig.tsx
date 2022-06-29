import React from "react";
import TextButton,{TextButtonProps, bgThemeList, colorList} from "src/components/atoms/TextButton";
import { css } from "@emotion/react";
import Colors from "@styles/colors";
import { flexCenter } from "src/styles";

interface TextButtonBigProps extends TextButtonProps {
  icon?: (props: any) => JSX.Element;
  bgTheme?: "accent" | "primary" | "common" | "default";
}

const originStyle = css`
  min-width: 273px;
  height: 46px;
  border-radius: 8px;
  letter-spacing: 0.03em;
  font-family: "Inter";
`;

const TextButtonBig = ({
  icon,
  title,
  onClick,
  bgTheme,
  ...props
}: TextButtonBigProps) => {
  const { disabled } = props;
  return (
    <TextButton
      {...(icon && {
        leftMargin: "5px",
        left: icon({ color: disabled ? "#9DA6AD" : "white" }),
      })}
      fontSize="18px"
      color={colorList(disabled)[bgTheme]}
      fontWeight={"600"}
      lineHeight="22px"
      title={title}
      onClick={onClick}
      css={[originStyle, bgThemeList(disabled)[bgTheme]]}
      {...props}
    />
  );
};

export default TextButtonBig;

export const Big = TextButtonBig;
