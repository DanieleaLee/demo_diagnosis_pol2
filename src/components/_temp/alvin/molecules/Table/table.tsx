import React from 'react'
import {css} from "@emotion/react";

const tableCss = css`
    width: 100%;
    height: 100%;
    border: 1px solid #ECECEC;
    border-radius: 8px;
`

const table = () => {
  return (
    <div css={[tableCss]}>table</div>
  )
}

export default table