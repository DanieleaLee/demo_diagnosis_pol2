import React, {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
} from "react";
import styled from "@emotion/styled";

export interface ImageCheckboxProps {
  type?: "checkbox";
  id?: string;
  name?: string;
  label?: React.ReactNode;
  checked?: boolean;
  value?: string | ReadonlyArray<string> | number;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  className?: string;
}

const ImageCheckboxContainer = styled.div`
  display: inline-flex;
  align-items: center;
  color: #4f4f4f;
`;

const StyledCheckbox = styled.input`
    width: 13px;
    height: 13px;
    background: #fff;
    border: 1px solid #ced9e1;
    border-radius: 2px;
    vertical-align: top;
    flex-shrink: 0;
    cursor: pointer;
    -webkit-appearance: none;
    margin-right:10px;
    margin-top:3px;
  
    // check box
    &:checked[type='checkbox'] {
      width: 13px;
      height: 13px;
      background-color: transparent;
      background: url('/img/lucian/checked.png') no-repeat center;
      background-size: 200%;
   `;

const StyledLabel = styled.label`
  font-size: 11px;
  font-weight: 500;
  line-height: 20px;
  color: #cecece;
  padding: 6px 0;
  cursor: pointer;
`;

// 체크박스 컴포넌트
const SingleCheckbox = forwardRef<HTMLInputElement, ImageCheckboxProps>(
  (
    {
      id,
      name,
      value,
      label,
      checked,
      onChange,
      onBlur,
      type = "checkbox",
      disabled,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <ImageCheckboxContainer>
        <StyledLabel>
          <StyledCheckbox
            className={className}
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
        </StyledLabel>
      </ImageCheckboxContainer>
    );
  }
);
SingleCheckbox.displayName = "SingleCheckbox";

export default SingleCheckbox;
