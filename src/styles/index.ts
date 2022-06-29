import { css, Theme } from "@emotion/react";
import Colors from "@styles/colors";
import media from "@styles/media";

export const zIndex = {
  zero: 0,
  section: 1,
  back: 2,
  tabMenu: 3,
  header: 4,
  kakao: 5,
  drawer: 10,
  popup: 50,
  select: 52,
  alert: 100,
  flash: 101,
  debug: 999,
};

export const borderStyle = (color?: string) => css`
  border: solid 1px ${color || Colors.primary6};
`;

export const borderTopStyle = (theme: Theme) => css`
  border-top: solid 1px ${theme.colors.divider};
`;

export const borderBottomStyle = (theme: Theme) => css`
  border-bottom: solid 1px ${theme.colors.divider};
`;

export const shadowStyle = css`
  box-shadow: inset 0 0 0 0 ${Colors.divider};
`;

export const shadowTopStyle = css`
  box-shadow: inset 0 1px 0 0 ${Colors.divider};
`;

export const shadowBottomStyle = css`
  box-shadow: inset 0 -1px 0 0 ${Colors.divider};
`;

export const popupShadowStyle = css`
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.12);
`;

export const popupBackgroundStyle = css`
  background-color: rgba(0, 0, 0, 0.5);
`;

export const notDraggable = css`
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

export const dimOpacityStyle = css`
  opacity: 0.5;
`;

// @CHECK 포커스 되면 스타일
export const selectOpacityStyle = css`
  &:focus-within {
    opacity: 0.8;
    // background-color: ${Colors.primary6};
  }
`;

export const resetSelectOpacityStyle = css`
  &:focus-within {
    opacity: 1;
  }
`;

//button 태그를 평범하게 보이게 하기 위함
export const buttonResetStyle = css`
  border: none;
  outline: none;
  text-align: left;
  padding: 0;
  background-color: transparent;
`;

export const buttonAbleStyle = css`
  ${notDraggable}
  ${selectOpacityStyle}
  cursor: pointer;
`;

export const disableButtonAbleStyle = css`
  ${notDraggable}
  cursor: not-allowed;
`;

export const flexRowBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const flexRow = css`
  display: flex;
  align-items: center;
`;

export const flexColumnBetween = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const smallNone = css`
  ${media.small} {
    display: none;
  }
`;

export const contentHorizontalPaddingStyle = css`
  ${media.medium} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

// white-space : @see https://developer.mozilla.org/ko/docs/Web/CSS/white-space
//  pre-wrap : 줄바꿈 br enter 모두 먹게
//  no-wrap : 줄바굼 절대 안함
// work-break : @see https://developer.mozilla.org/ko/docs/Web/CSS/word-break
//  break-all 영역 넘치면 자동으로 내려가게
export const preWrap = css`
  white-space: pre-wrap;
`;

export const scrollbarStyle = (theme: Theme) => css`
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    -webkit-border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: ${theme.colors.primary6};
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
`;

export const safeInsetTop = "env(safe-area-inset-top)";
export const safeInsetBottom = "env(safe-area-inset-bottom)";

export const safeMarginTop = (base?: string) => css`
  margin-top: ${base ? `calc(${base} + ${safeInsetTop})` : safeInsetTop};
`;

export const safePaddingTop = (base?: string) => css`
  padding-top: ${base ? `calc(${base} + ${safeInsetTop})` : safeInsetTop};
`;

export const safePaddingBottom = (base?: string) => css`
  padding-bottom: ${base ? `calc(${base} + ${safeInsetBottom})` : safeInsetBottom};
`;

export const safeHeightTop = (base?: string) => css`
  height: ${base ? `calc(${base} + ${safeInsetTop})` : safeInsetTop};
`;

// 아래 공간을 포함하여 높이구함
export const safeHeightBottom = (base?: string) => css`
  height: ${base ? `calc(${base} + ${safeInsetBottom})` : safeInsetBottom};
`;

// 상단 공간을 포함하여 높이구함
export const safePositionTop = (base?: string) => css`
  top: ${base ? `calc(${base} + ${safeInsetTop})` : safeInsetTop};
`;

export const safePositionBottom = (base?: string) => css`
  bottom: ${base ? `calc(${base} + ${safeInsetBottom})` : safeInsetBottom};
`;
