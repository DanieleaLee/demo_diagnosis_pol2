import { SerializedStyles } from '@emotion/serialize';
import { buttonResetStyle, selectOpacityStyle } from '@styles';
import React, { HTMLAttributes, MouseEventHandler, forwardRef } from 'react';

export interface ButtonableProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  containerCss?: SerializedStyles | Array<SerializedStyles>;
  onClick: MouseEventHandler | undefined;
}

/**
 * Button Base 클래스
 */

const Buttonable = forwardRef(({ children, disabled, containerCss, onClick,...props }: ButtonableProps, ref?: React.LegacyRef<HTMLButtonElement>) => {
  return (
    <button
      ref={ref}
      type={'button'}
      css={[buttonResetStyle, !disabled && selectOpacityStyle, containerCss]}
      onClick={!disabled ? onClick : undefined}
      {...props}
    >
      {children}
    </button>
  );
});

export default Buttonable;
