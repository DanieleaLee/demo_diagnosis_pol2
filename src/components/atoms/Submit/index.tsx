import { css, Theme, useTheme } from "@emotion/react";
import { SerializedStyles } from "@emotion/serialize";
import { disableButtonAbleStyle, flexCenter, selectOpacityStyle } from "@styles";
import {RefObject} from "react";
import ClipLoader from "react-spinners/ClipLoader";

const submitStyle = ({ theme, loading }: { theme: Theme; loading: boolean }) => css`
  ${flexCenter}
  width: 100%;
  height: 3.5rem;
  background-color: ${theme.colors.accent2};
  color: white;
  font-weight: 600;
  border: none;
  text-decoration: none;
  border-radius: 0;
  opacity: ${loading ? 0.5 : 1.0};

  ${selectOpacityStyle}
  &:disabled {
    opacity: 1;
    background-color: ${theme.colors.disabled};
    ${disableButtonAbleStyle};
  }

  &:focus {
    outline: none;
    border-width: 1px;
    box-shadow: 0 0 10px ${theme.colors.accent2};
  }
`;

interface SubmitProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  loading?: boolean;
  containerCss?: SerializedStyles;
  fwdRef?: RefObject<HTMLButtonElement>;
}

/**
 * 제출하기 버튼, 로딩시에는 Progress 가 돈다.
 */
const Submit = ({ loading, containerCss, disabled, fwdRef, ...props }: SubmitProps ) => {
  const theme = useTheme();

  return (
    <button
      type={"submit"}
      css={[submitStyle({ theme, loading }), containerCss]}
      disabled={disabled || loading}
      ref={fwdRef|| null}
      {...props}
    >
      {loading && <ClipLoader color={theme.colors.primary2} loading={true} size={25} />}
      {loading && <span style={{ width: "10px" }} />}
      <span>{props.value}</span>
    </button>
  );
};

export default Submit;
