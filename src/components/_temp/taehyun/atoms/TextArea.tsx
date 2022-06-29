import Buttonable from "@components/atoms/Buttonable";
import { css, Theme, useTheme } from "@emotion/react";
import { SerializedStyles } from "@emotion/serialize";
import React, { FocusEvent, useImperativeHandle, useMemo, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { BsExclamationCircleFill } from "react-icons/bs";
import { FONT_SIZE } from "src/config/constants";

const inputContainer = css`
  position: relative;
`;

const inputErrorIcon = (props: { icon?: string }) => css`
  background: url("${props.icon}") scroll right center no-repeat;
  background-size: 21px 24px;
  background-position: calc(100% - 1rem) center;
  padding-right: 2.5rem;
`;

export const inputStyle = (props: {
  theme: Theme;
  error: boolean;
  borderColor: string;
  icon?: string;
}) => css`
  height: 3.5rem;
  width: 100%;
  padding: 0 1rem;
  border-radius: 0;
  -webkit-appearance: none;
  color: ${props.theme.colors.accent1};
  border: 1px solid ${props.error ? props.theme.colors.error : props.theme.colors.borderPrimary};
  background-color: white;

  &:focus {
    outline: none;
    border-width: 1px;
    border-color: ${props.error ? props.theme.colors.error : 'black'};
  }
  &::placeholder {
    color: ${props.theme.colors.hint};
  }
  ${props.icon && inputErrorIcon(props)}
`;

const resetIconStyle = css`
  position: absolute;
  right: 1rem;
  height: 100%;
`;

export interface InputProps {
  error?: boolean;
  // 에러용 아이콘
  icon?: string;
  // 인풋 지우기 아이콘
  showReset?: boolean;
  css?: SerializedStyles | Array<SerializedStyles>;
  containerCss?: SerializedStyles;
}

type Props = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const Index = (
  {
    error,
    icon,
    showReset = false,
    css: inputCss,
    containerCss,
    readOnly,
    onFocus,
    onBlur,
    ...props
  },
  ref,
) => {
  const theme = useTheme();
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => inputRef.current);
  const borderColor = useMemo(() => {
    if (error) {
      return theme.colors.error;
    }
    if (readOnly) {
      return theme.colors.primary1;
    }
    return theme.colors.borderPrimary;
  }, [theme, error, readOnly]);
  const [focused, setFocused] = useState(false);

  const onFocusInner = (event: FocusEvent<any>) => {
    setFocused(true);
    if (onFocus) {
      onFocus(event);
    }
  };

  // react-form 에서 onBlur 를 사용하므로 wrapping 해줘야 한다.
  const onBlurInner = (event: FocusEvent<any>) => {
    setFocused(false);
    if (onBlur) {
      onBlur(event);
    }
  };

  // 텍스트 전부 지우기
  const resetText = () => {
    inputRef.current.value = "";
  };

  return (
    <div css={[inputContainer, containerCss]}>
      <textarea
        ref={inputRef}
        aria-invalid={error}
        css={[inputStyle({ theme, error, borderColor, icon }), inputCss]}
        readOnly={readOnly}
        onFocus={onFocusInner}
        onBlur={onBlurInner}
        {...props}
      />
      {/**
        에러 alert icon balloon 에 별도 표시.
       */}
      {/*{error && (*/}
        {/*<Buttonable css={resetIconStyle} tabIndex={-1} onClick={()=>{}}>*/}
          {/*<BsExclamationCircleFill size={FONT_SIZE * 1.5} color={theme.colors.error}/>*/}
        {/*</Buttonable>*/}
      {/*)}*/}
      {showReset && focused && (
        <Buttonable css={resetIconStyle} onMouseDown={resetText} tabIndex={-1} onClick={()=>{}}>
          <CgClose size={FONT_SIZE * 1.5} />
        </Buttonable>
      )}
    </div>
  );
};

export default React.forwardRef<HTMLInputElement, Props>(Index);
