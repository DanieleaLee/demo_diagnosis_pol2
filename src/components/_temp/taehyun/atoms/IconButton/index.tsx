import React from 'react';
import Buttonable from '@components/atoms/Buttonable';
import { css } from '@emotion/react';
import Image from 'next/image';

const testCss = css`
  width: 30px;
  height: 34px;
  background-color: #525f68;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const IconButton = () => {
  return (
    <Buttonable containerCss={testCss} onClick={() => console.log('Clicked Icon Button')}>
      <Image width={22} height={22} src={`/img/taehyun/bx-trash-alt.png`} alt="bx-trash-alt" />
    </Buttonable>
  );
};

export default IconButton;
