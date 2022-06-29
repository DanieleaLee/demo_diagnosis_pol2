import React from 'react'
import {css} from "@emotion/react";
import Colors from "@styles/colors";


const Button = ({width, height, borderCol, backCol, textCol, text, onClick}) => {

    const buttonCss = (width, height, backCol, borderCol, textCol)=>css`
        width: ${width}px;
        height: ${height}px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: ${backCol};
        border: 1px solid ${borderCol};
        border-radius: 8px;
        font-weight: 600;

    > p {
        color: ${textCol}
    }
`;

  return (
    <div css={[buttonCss(width, height, backCol, borderCol, textCol)]}
        onClick={onClick ? onClick : undefined}
    >
        <p>{text}</p>
    </div>
  )
}

export default Button