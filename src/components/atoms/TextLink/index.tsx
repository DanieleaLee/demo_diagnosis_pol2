import { ButtonProps } from "@components/atoms/TextButton";
import { css, useTheme } from "@emotion/react";
import { selectOpacityStyle } from "@styles";
import * as Typography from "@styles/typography";
import Link from "next/link";
import React from "react";
import { UrlObject } from "url";

const aStyle = (props) =>
  css`
    display: flex;
    align-items: center;
    color: ${props.color};
    font-size: ${props.fontSize};
    font-weight: ${props.fontWeight};
    ${selectOpacityStyle}
  `;

const textStyle = (hasIcon: boolean, leftMargin: string, rightMargin: string) => css`
  line-height: 1;
  padding-bottom: ${hasIcon ? "0.05rem" : "0rem"};
  margin-left: ${leftMargin ? leftMargin : "0rem"};
  margin-right: ${rightMargin ? rightMargin : "0rem"};
`;
type Props = Omit<ButtonProps, "onClick"> &
             Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export interface TextLinkProps extends Props {
  href: string | UrlObject;
  as?: string | UrlObject;
  replace?: boolean;
}

/**
 * 링크 이동 텍스트
 *  기본 a 태그 inline 에 안쪽에 p 가 있어서 기본 100% 로 잡힌다.
 */
const TextLink = ({
  href,
  as,
  replace = false,
  title,
  color,
  left,
  right,
  fontSize = "1rem",
  fontWeight = "normal",
  leftMargin,
  rightMargin,
  ...props
}: TextLinkProps) => {
  const theme = useTheme();

  return (
    <Link href={href} as={as} passHref={true} replace={replace}>
      <a
        rel={"noopener"}
        css={aStyle({ color: color || theme.colors.accent2, fontSize, fontWeight })}
        {...props}
      >
        {left}
        <Typography.Base
          color={color || theme.colors.accent2}
          fontSize={fontSize}
          fontWeight={fontWeight}
          lineHeight={1}
          css={textStyle(!!left || !!right, leftMargin, rightMargin)}
        >
          {title}
        </Typography.Base>
        {right}
      </a>
    </Link>
  );
};

export default TextLink;
