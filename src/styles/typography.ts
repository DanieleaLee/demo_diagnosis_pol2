import { css, Theme } from "@emotion/react";
import styled from "@emotion/styled";
const defaultStyle = ()=>css`
  /* margin-bottom: 5px; */
`;
const lineHeightStyle = (lineHeight?: string | number) => css`
  line-height: ${lineHeight || "normal"};
`;
export type BaseFontStyle = {
  color?: string;
  fontSize?: string;
  lineHeight?: string | number;
  fontWeight?: string;
};
export const Base = styled.p<BaseFontStyle>`
  color: ${(props) => props.color || props.theme.colors.primary2};
  font-size: ${(props) => props.fontSize || "1rem"};
`;
export type HeadlineFontStyle = {
  color?: string;
  fontSize?: string;
  lineHeight?: string | number;
  fontWeight?: string;
};
// 700 2.5rem Titillium
export const Headline1 = styled.p<HeadlineFontStyle>`
  ${defaultStyle}
  font-size: 2.5rem;
  font-weight: 700;
  ${(props) => props.lineHeight && lineHeightStyle(props.lineHeight)}
  color: ${(props) => props.color || props.theme.colors.primary2};
`;
// 600 2.1875rem Titillium
export const Headline2 = styled.p<HeadlineFontStyle>`
  ${defaultStyle}
  font-size: 2.1875rem;
  font-weight: 600;
  ${(props) => props.lineHeight && lineHeightStyle(props.lineHeight)}
  color: ${(props) => props.color || props.theme.colors.primary2};
`;
// 600 1.5625rem Titillium
export const Headline3 = styled.p<HeadlineFontStyle>`
  ${defaultStyle}
  font-size: 1.5625rem;
  font-weight: 600;
  ${(props) => props.lineHeight && lineHeightStyle(props.lineHeight)}
  color: ${(props) => props.color || props.theme.colors.primary2};
`;
// 600 1.375rem Titillium
export const Headline4 = styled.p<HeadlineFontStyle>`
  ${defaultStyle}
  font-size: 1.375rem;
  font-weight: 600;
  ${(props) => props.lineHeight && lineHeightStyle(props.lineHeight)}
  color: ${(props) => props.color || props.theme.colors.primary2};
`;
export type TitleFontStyle = {
  color?: string;
  fontSize?: string;
  lineHeight?: string | number;
  fontWeight?: string;
};
// 700 1.125rem Inter
export const Title1 = styled.p<TitleFontStyle>`
  ${defaultStyle}
  font-size: 1.125rem;
  font-weight: 700;
  font-family: 'Inter';
  ${(props) => props.lineHeight && lineHeightStyle(props.lineHeight)}
  color: ${(props) => props.color || props.theme.colors.primary2};
`;
// 500 1.125rem Inter
export const Title2 = styled.p<TitleFontStyle>`
  ${defaultStyle}
  font-size: 1.125rem;
  font-weight: 600;
  font-family: 'Inter';
  ${(props) => props.lineHeight && lineHeightStyle(props.lineHeight)}
  color: ${(props) => props.color || props.theme.colors.primary2};
`;
// 600 1.125rem Inter
export const Title3 = styled.p<TitleFontStyle>`
  ${defaultStyle}
  font-size: 1.125rem;
  font-weight: 500;
  font-family: 'Inter';
  ${(props) => props.lineHeight && lineHeightStyle(props.lineHeight)}
  color: ${(props) => props.color || props.theme.colors.primary2};
`;
// 700 1.0625rem Titillium
export const Title4 = styled.p<TitleFontStyle>`
  ${defaultStyle}
  font-size: 1.0625rem;
  font-weight: 700;
  ${(props) => props.lineHeight && lineHeightStyle(props.lineHeight)}
  color: ${(props) => props.color || props.theme.colors.primary2};
`;
// 600 1.0625rem Inter
export const Title5 = styled.p<TitleFontStyle>`
  ${defaultStyle}
  font-size: 1.0625rem;
  font-weight: 600;
  ${(props) => props.lineHeight && lineHeightStyle(props.lineHeight)}
  color: ${(props) => props.color || props.theme.colors.primary2};
`;
// 700 1.0625rem Inter
export const Title6 = styled.p<TitleFontStyle>`
  ${defaultStyle}
  font-size: 1.0625rem;
  font-weight: 700;
  font-family: 'Inter';
  ${(props) => props.lineHeight && lineHeightStyle(props.lineHeight)}
  color: ${(props) => props.color || props.theme.colors.primary2};
`;
export type SubTitleFontStyle = {
  color?: string;
  fontSize?: string;
  lineHeight?: string | number;
  fontWeight?: string;
};
// 700 0.9375 Inter
export const Subtitle1 = styled.p<SubTitleFontStyle>`
  ${defaultStyle}
  font-size: 0.9375rem;
  font-weight: 700;
  font-family: 'Inter';
  ${(props) => props.lineHeight && lineHeightStyle(props.lineHeight)}
  color: ${(props) => props.color || props.theme.colors.primary2};
`;
// 600 0.9375 Inter
export const Subtitle2 = styled.p<SubTitleFontStyle>`
  ${defaultStyle}
  font-size: 0.9375rem;
  font-weight: 600;
  font-family: 'Inter';
  ${(props) => props.lineHeight && lineHeightStyle(props.lineHeight)}
  color: ${(props) => props.color || props.theme.colors.primary2};
`;
// 400 0.9375 Inter
export const Subtitle3 = styled.p<SubTitleFontStyle>`
  ${defaultStyle}
  font-size: 0.9375rem;
  font-weight: 400;
  font-family: 'Inter';
  ${(props) => props.lineHeight && lineHeightStyle(props.lineHeight)}
  color: ${(props) => props.color || props.theme.colors.primary2};
`;
// 600 0.875rem Inter
export const Subtitle4 = styled.p<SubTitleFontStyle>`
  ${defaultStyle}
  font-size: 0.875rem;
  font-weight: 600;
  font-family: 'Inter';
  ${(props) => props.lineHeight && lineHeightStyle(props.lineHeight)}
  color: ${(props) => props.color || props.theme.colors.primary2};
`;
interface BodyFontStyle {
  color?: string;
  fontSize?: string;
  lineHeight?: string | number;
  fontWeight?: string;
}
// 600 0.8125rem Titillium
export const Body1 = styled.p<BodyFontStyle>`
  ${defaultStyle}
  font-size: 0.8125rem;
  font-weight: 600;
  ${(props) => props.lineHeight && lineHeightStyle(props.lineHeight)}
  color: ${(props) => props.color || props.theme.colors.primary2};
`;
// 600 0.8125rem Inter
export const Body2 = styled.p<BodyFontStyle>`
  ${defaultStyle}
  font-size: 0.8125rem;
  font-weight: 600;
  font-family: 'Inter';
  ${(props) => props.lineHeight && lineHeightStyle(props.lineHeight)}
  color: ${(props) => props.color || props.theme.colors.primary2};
`;
// 400 0.8125rem Inter
export const Body3 = styled.p<BodyFontStyle>`
  ${defaultStyle}
  font-size: 0.8125rem;
  font-weight: 400;
  font-family: 'Inter';
  ${(props) => props.lineHeight && lineHeightStyle(props.lineHeight)}
  color: ${(props) => props.color || props.theme.colors.primary2};
`;
// 500 0.75rem Inter
export const Body4 = styled.p<BodyFontStyle>`
  ${defaultStyle}
  font-size: 0.75rem;
  font-weight: 500;
  font-family: 'Inter';
  ${(props) => props.lineHeight && lineHeightStyle(props.lineHeight)}
  color: ${(props) => props.color || props.theme.colors.primary2};
`;
// 500 0.6875rem Inter
export const Body5 = styled.p<BodyFontStyle>`
  ${defaultStyle}
  font-size: 0.6875rem;
  font-weight: 500;
  font-family: 'Inter';
  ${(props) => props.lineHeight && lineHeightStyle(props.lineHeight)}
  color: ${(props) => props.color || props.theme.colors.primary2};
`;
// 400 0.625rem Inter
export const Body6 = styled.p<BodyFontStyle>`
  ${defaultStyle}
  font-size: 0.625rem;
  font-weight: 400;
  font-family: 'Inter';
  ${(props) => props.lineHeight && lineHeightStyle(props.lineHeight)}
  color: ${(props) => props.color || props.theme.colors.primary2};
`;
// export type Temp = {
//   color?: string;
//   fontFamilly?: string;
//   fontSize?: string;
//   lineHeight?: string | number;
//   fontWeight?: string;
// };
// export const Temp = styled.p<Temp>`
//   ${defaultStyle}
//   font-family: ${(props) => props.fontFamilly};
//   font-size: ${(props) => props.fontSize};
//   font-Weight: ${(props) => props.fontWeight};
//   color: ${(props) => props.color || props.theme.colors.primary2};
//   ${(props) => props.lineHeight && lineHeightStyle(props.lineHeight)}
// `;