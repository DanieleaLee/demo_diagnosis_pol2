import { MediaQueryComponentProps } from "@components/containers/MediaQuery";
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const mediaMaxWidthQuery = (maxWidth: number) => `(max-width: ${maxWidth}px)`;
const mediaMinWidthQuery = (minWidth: number) => `(min-width: ${minWidth}px)`;

export const mediaQuery = (maxWidth: number) => `
  @media ${mediaMaxWidthQuery(maxWidth)}
`;

export const mediaMinQuery = (maxWidth: number) => `
  @media ${mediaMinWidthQuery(maxWidth)}
`;

export const mediaHover = `
  @media (hover: hover)
`;

export const mediaWidths = {
  xxlarge: 2220, // 특별처리
  xlarge: 1400, // 그이상
  large: 1200, // 컴퓨터 (Desktop)
  medium: 1024, // 테블릿 (Tablet) 992 -> 1024
  small: 768, // 여기까진 핸드폰으로 처리 (BigPhone)
  xsmall: 576, // 작은 핸드폰 (Phone)
  xxsmall: 375, // 아이폰 X
};

export const isMedia = (mediaWidth) =>
  (typeof window !== "undefined")
    ? window.innerWidth > mediaWidth
    : false;

const media = {
  xxlarge: mediaQuery(mediaWidths.xxlarge),
  xlarge: mediaQuery(mediaWidths.xlarge),
  large: mediaQuery(mediaWidths.large),
  medium: mediaQuery(mediaWidths.medium),
  small: mediaQuery(mediaWidths.small),
  xsmall: mediaQuery(mediaWidths.xsmall),
  xxsmall: mediaQuery(mediaWidths.xxsmall),
  custom: mediaQuery,
};

export const useMediaScreen = () => {
  const isSmall = useMediaQuery({ query: mediaMaxWidthQuery(mediaWidths.small) });
  const isMedium = useMediaQuery({ query: mediaMaxWidthQuery(mediaWidths.medium) });
  const [isSmallRender, setIsSmallRender] = useState<boolean>();
  const [isMediumRender, setIsMediumRender] = useState<boolean>();

  useEffect(() => {
    setIsSmallRender(isSmall);
  }, [isSmall]);

  useEffect(() => {
    setIsMediumRender(isMedium);
  }, [isMedium]);

  return { isSmall: isSmallRender, isMedium: isMediumRender };
};

// 오직 xsmall 에서만 표현
export const phoneMediaStyle = css`
  display: none;
  ${media.xsmall} {
    display: block;
  }
`;
export const PhoneMediaQuery = ({ children, css, ...props }: MediaQueryComponentProps) => {
  return (
    <div css={[phoneMediaStyle, css]} {...props}>
      {children}
    </div>
  );
  // return <MediaQuery maxDeviceWidth={mediaWidths.xsmall}>{children}</MediaQuery>;
};

// 오직 xsmall, small 에서만 표현
export const bigPhoneMediaStyle = css`
  display: none;
  ${media.small} {
    display: flex;
  }
`;

export const BigPhoneMediaQuery = ({ children, css, ...props }: MediaQueryComponentProps) => {
  return (
    <div css={[bigPhoneMediaStyle, css]} {...props}>
      {children}
    </div>
  );
  // return <MediaQuery maxDeviceWidth={mediaWidths.small}>{children}</MediaQuery>;
};

// small 이상 화면까지만 표현한다. (small ~ xxlarge)
export const phoneLargerMediaStyle = css`
  display: none;
  ${mediaMinQuery(mediaWidths.xsmall + 1)} {
    display: block;
  }
`;

export const PhoneLargerMediaQuery = ({ children, css, ...props }: MediaQueryComponentProps) => {
  return (
    <div css={[phoneLargerMediaStyle, css]} {...props}>
      {children}
    </div>
  );
  // return <MediaQuery minDeviceWidth={mediaWidths.xsmall + 1}>{children}</MediaQuery>;
};

// medium 이상 화면에서만 표현한다. (medium ~ xxlarge)
export const bigPhoneLargerMediaStyle = css`
    display: none;
    ${mediaMinQuery(mediaWidths.small + 1)} {
      display: block;
  `;
export const BigPhoneLargerMediaQuery = ({ children, css, ...props }: MediaQueryComponentProps) => {
  return (
    <div css={[bigPhoneLargerMediaStyle, css]} {...props}>
      {children}
    </div>
  );
  // return <MediaQuery minDeviceWidth={mediaWidths.small + 1}>{children}</MediaQuery>;
};

// large 이상 화면에서만 표현한다. (large ~ xxlarge)
export const desktopLargerMediaStyle = css`
    display: none;
    ${mediaMinQuery(mediaWidths.medium + 1)} {
      display: block;
  `;

export const DesktopLargerMediaQuery = ({ children, css, ...props }: MediaQueryComponentProps) => {
  return (
    <div css={[desktopLargerMediaStyle, css]} {...props}>
      {children}
    </div>
  );
  // return <MediaQuery minDeviceWidth={mediaWidths.medium + 1}>{children}</MediaQuery>;
};

export default media;
