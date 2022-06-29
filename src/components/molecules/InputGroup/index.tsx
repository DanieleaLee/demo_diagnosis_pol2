import Input, { InputProps } from "@components/atoms/Input";
import { css, Theme, useTheme } from "@emotion/react";
import { SerializedStyles } from "@emotion/serialize";
import * as Typography from "@styles/typography";
import React from "react";
import media from "@styles/media";
import { yupErrorMessage, YupErrorType } from "src/config/constants/locale";
import { BsExclamationCircleFill } from "react-icons/bs";
import { FONT_SIZE } from "src/config/constants";

const inputTitleStyle = (descriptionExist: boolean) => css`
  margin-bottom: ${descriptionExist ? "0.375rem" : "1rem"};
`;

const descriptionStyle = css`
  margin-bottom: 0.75rem;
`;

const errorBalloonStyle = (theme: Theme) => css`
  position: relative;
  display: inline-flex;
  flex-wrap: wrap;
  height: 0px;
  top: -40px;
  left: 95%;
  background-color: ${theme.colors.error};
  color: ${theme.colors.error};

  ${media.medium} {
    display: block;
    position: static;
  }

  & > svg {
    position: relative;
    // top: 0px;
    left: -25px;

    ${media.medium} {
      position: relative;
      top: -40px;
      float: right;
      left: -10px;
    }
  }

  & > svg:hover {
    & + div {
      display: block;
    }
  }

  & > div {
    position: relative;
    background-color: ${theme.colors.backgroundError};
    margin: 0 10px;
    min-height: 56px;
    border-radius: 5px;
    z-index: 1;
    min-width: 270px;
    top: -20px;
    padding: 1px;
    display: none;

    ${media.medium} {
      top: -5px;
      max-width: inherit;
    }
  }
`;

const errorBalloonTailStyle = (theme: Theme) => css`
  height: 0px;

  & > div {
    position: relative;
    top: 20px;
    left: -5px;
    height: 10px;
    width: 10px;
    background-color: #ffe6e6;
    transform: rotate(45deg);

    ${media.medium} {
      top: -6px;
      left: calc(100% - 20px);
    }
  }
`;

interface InputGroupProps {
  title?: string;
  description?: string;
  // @CHECK 에러 타입 체크 key 타입으로 왠만하면 다 변경
  error?: YupErrorType;
  inputCss?: SerializedStyles | Array<SerializedStyles>;
  containerCss?: SerializedStyles | Array<SerializedStyles>;
}

type Props = InputGroupProps &
  InputProps &
  React.InputHTMLAttributes<HTMLInputElement>;

const ErrorBalloon = ({ errorMessage }: { errorMessage: string }) => {
  const theme = useTheme();

  return (
    <div css={errorBalloonStyle}>
      <BsExclamationCircleFill
        size={FONT_SIZE * 1.5}
        color={theme.colors.error}
      />
      <div>
        <div css={errorBalloonTailStyle}>
          <div />
        </div>{" "}
        {/* error balloon tail */}
        {errorMessage.startsWith("<") ? (
          <div
            css={css`
              margin: 8px;
            `}
            dangerouslySetInnerHTML={{ __html: errorMessage }}
          ></div>
        ) : (
          <p role={"alert"} aria-live={"assertive"} className={"m-2"}>
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

const InputGroup = (
  { title, description, error, className, containerCss, inputCss, ...props },
  ref
) => {
  const theme = useTheme();
  const errorMessage = yupErrorMessage(error);

  return (
    <div
      className={className}
      css={[
        containerCss,
        css`
          height: 60px;
        `,
      ]}
    >
      {!!title && (
        <Typography.Subtitle4
          aria-describedby={"input-description"}
          css={inputTitleStyle(!!description)}
        >
          {title}
        </Typography.Subtitle4>
      )}
      {!!description && (
        <Typography.Base
          id={"input-description"}
          role={"tooltip"}
          color={theme.colors.primary2}
          css={descriptionStyle}
        >
          {description}
        </Typography.Base>
      )}
      <div>
        <Input
          ref={ref}
          error={!!error}
          autoComplete={"off"}
          css={[
            css`
              color: black;
            `,
            inputCss,
          ]}
          {...props}
        />
        {!!errorMessage && <ErrorBalloon errorMessage={errorMessage} />}
      </div>
    </div>
  );
};

export default React.forwardRef<HTMLInputElement, Omit<Props, "css">>(
  InputGroup
);
