import Buttonable from "@components/atoms/Buttonable";
import { css, Theme } from "@emotion/react";
import { ContainerCss } from "@interfaces/global";
import React, {MouseEvent, useImperativeHandle, useState, useMemo} from "react";
import { IconBaseProps } from "react-icons";
import themeColors from "@styles/colors";
import {
  RiCheckboxBlankLine,
  RiCheckboxFill,
  RiCheckboxBlankFill
} from "react-icons/ri";
import {
  IoCheckbox,
} from "react-icons/io5";
import { FONT_SIZE } from "src/config/constants";
import {Control, Controller} from "react-hook-form";

export const CheckIcon = ({ checked, disabled, error}: Pick<CheckIconProps, "checked" | "disabled"| "error">) => {
  const size = FONT_SIZE * 1.6;

  if (disabled)
    return <RiCheckboxBlankFill size={size} color={themeColors.primary5}/>

  if (checked) {
    return (
      <span css={css`margin-top: -3px;`}>
        <IoCheckbox size={size} color={error?themeColors.error:null}/>
      </span>
    )
  } else {
    // return <RiCheckboxBlankLine size={size} color={error?themeColors.error:null}/>;
    return (
      <div css={css`
        width: 22px; 
        height: 22px; 
        border: 1px solid #CED9E1; 
        border-radius: 4px;
        box-sizing: border-box;
      `}>  
      </div>
    )
  }
};

export interface CheckIconProps extends IconBaseProps {
  control?: Control<any>;
  checked?: boolean;
  error?: boolean;
  containerCss?: ContainerCss;
  textCss?:ContainerCss;
  disabled?: boolean;
  onChange?: () => void;
  name? : string;
}

export const checkFocusStyle = (theme: Theme) => css`
  color: ${theme.colors.primary2};
`;

export const flexStyle = css`
  display: flex;
`;

export function useCheckBox <T = any>(
  initialState: boolean
){

  const [checked, setChecked] = useState(initialState);

  const onChange = () => {
    setChecked(!checked);
  };

  return {checked, onChange}
}


/**
 * 체크박스 입니다
 *
 * rhf-controller(control)의 경우, controller 의 렌더를 통해 onChange 메소드를 따로 정의해서 buttonable을 wrapping.
 * 아닌 경우, 그냥 `useCheckbox` 훅을 이용한 simple checkbox
 */
const CheckBox = ({ title, name, checked, error, containerCss, tabIndex, disabled, control, onChange, textCss}:CheckIconProps) => {

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onChange && onChange();
  };

  const _commonProps = useMemo(()=>({
    containerCss: [checkFocusStyle, flexStyle, containerCss],
    className: "py-1",
    onClick,
    tabIndex,
    disabled
  }),[onClick]);

  return (
    <>
      {control &&
        <Controller
          control={control}
          name={name}
          render={
            ({field: {value, onChange}}) => {

              const onClick = (event: MouseEvent<HTMLButtonElement>) => {
                event.stopPropagation();
                onChange(!value);
              };

              return <Buttonable
                // containerCss={[checkFocusStyle, containerCss]}
                {..._commonProps}
                onClick={onClick}
              >
                <CheckIcon error={error} checked={value} disabled={disabled}/>
                {/* <p css={css`${error && `color: ${themeColors.error}`}`}> {title}</p> */}
              </Buttonable>

            }
          }
        />
      }
      {!control &&   <Buttonable
        // containerCss={[checkFocusStyle, containerCss]}
        {..._commonProps}
      >
        <CheckIcon checked={checked} disabled={disabled}/>
        <p css={[css`margin-left: 10px`,textCss]}>{title}</p>
      </Buttonable>}
    </>
  );
};

export default CheckBox;


