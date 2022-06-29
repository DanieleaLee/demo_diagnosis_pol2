import React, {ChangeEventHandler, FocusEventHandler, forwardRef} from 'react';
import { css } from '@emotion/react';
import { ContainerCss } from "@interfaces/global";

export interface InputCheckboxProps {
  type?: 'checkbox';
  id?: string;
  name?: string;
  labelFontSize?: number;
  label?: React.ReactNode;
  checked?: boolean;
  value?: string | ReadonlyArray<string> | number;
  width?: number;
  height?: number;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  containerCss?:ContainerCss
}

const containerWrapCss = css`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  `;


const inputCss =(width =21,height =21) =>css`
  width: ${width}px;
  height:${height}px;
  vertical-align: top;
  /* font-size: 32px; */
  flex-shrink: 0;
  cursor: pointer;
  -webkit-appearance: none;
  margin-right: 12px;
  background:#fff;
  border:1px solid #CED9E1;
  border-radius:4px; 
  

  &[type='checkbox'] {
    width: ${width}px;
    height:${height}px;
    border-radius: 4px;
  }

  &:disabled {
    color: #b4b4b4;
  }

  &:checked[type='checkbox'] {
    border: none;
    background-image: url("/img/lucian/check.png");
    background-size: ${width * 1.4}px ${height*1.4}px;
    background-repeat:no-repeat;
    background-position:center;
  }
 
`;

const labelCss = (labelFontSize:number) => css`
  display:flex;
  font-size:${labelFontSize}px;
  // line-height:32px;
  align-items:center;
`

const InputCheckbox = forwardRef<HTMLInputElement, InputCheckboxProps>(
  (
    {
      id,
      name,
      value,
      label,
      checked,
      labelFontSize ,
      width,
      height,
      onChange,
      onBlur,
      type = 'checkbox',
      disabled,
      containerCss,
      ...rest
    },
    ref,
  ) => {
    return (
      <div css={[containerWrapCss,containerCss]}>
        <label css={[labelCss(labelFontSize)]} htmlFor={id} >
          <input
            css={[inputCss(width,height)]}
            ref={ref}
            id={id}
            name={name}
            value={value}
            type={type}
            checked={checked}
            onBlur={onBlur}
            onChange={onChange}
            {...rest}
            disabled={disabled}
          />
          {label}
        </label>
      </div>
    );
  },
);
InputCheckbox.displayName = 'InputCheckbox';

export default InputCheckbox;
