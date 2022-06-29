import { SerializedStyles, CSSInterpolation } from "@emotion/serialize";
import {
  BigPhoneLargerMediaQuery,
  BigPhoneMediaQuery,
  DesktopLargerMediaQuery,
  PhoneLargerMediaQuery,
  PhoneMediaQuery,
} from "@styles/media";
import React from "react";

export interface MediaQueryComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  css?: SerializedStyles;
}
/**
 * 핸드폰 화면에서만 나오게 만드는 Component, SSR 을 위해 dynamic 으로
 */
/*
export const Phone =
  dynamic(() => import("@styles/media").then((mod) => mod.PhoneMediaQuery), {
        ssr: false,
      });
*/
export const Phone = ({ children, ...props }: MediaQueryComponentProps) => {
  return <PhoneMediaQuery {...props}>{children}</PhoneMediaQuery>;
};
/**
 * 핸드폰, 큰핸드폰 화면에서만 나오게 만드는 Component, SSR 을 위해 dynamic 으로
 */
/*
export const BigPhone =
  dynamic(() => import("@styles/media").then((mod) => mod.BigPhoneMediaQuery), {
        ssr: false,
      });
*/
export const BigPhone = ({ children, ...props }: MediaQueryComponentProps) => {
  return <BigPhoneMediaQuery {...props}>{children}</BigPhoneMediaQuery>;
};
/**
 * 핸드폰 보다 큰 화면에서만 노출되는
 */
/*
export const PhoneLarger =
  dynamic(() => import("@styles/media").then((mod) => mod.PhoneLargerMediaQuery), {
        ssr: false,
      });
 */
export const PhoneLarger = ({ children, ...props }: MediaQueryComponentProps) => {
  return <PhoneLargerMediaQuery {...props}>{children}</PhoneLargerMediaQuery>;
};

/**
 *
 */
/*
export const BigPhoneLarger =
  dynamic(() => import("@styles/media").then((mod) => mod.BigPhoneLargerMediaQuery), {
        ssr: false,
      })
*/
export const BigPhoneLarger = ({ children, ...props }: MediaQueryComponentProps) => {
  return <BigPhoneLargerMediaQuery {...props}>{children}</BigPhoneLargerMediaQuery>;
};

export const DesktopLarger = ({ children, ...props }: MediaQueryComponentProps) => {
  return <DesktopLargerMediaQuery {...props}>{children}</DesktopLargerMediaQuery>;
};
