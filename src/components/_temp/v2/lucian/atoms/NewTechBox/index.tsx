import React from 'react'
import { css } from '@emotion/react';
import BasicBox from '@components/atoms/BasicBox';
import Colors from '@styles/colors';
import * as Typography from '@styles/typography';
import { flexCenter, flexColumn } from '@styles';

const bodyTxt = css`
  width:100%;
  height:100%;
  display:flex;
  flex-direction:column;
  align-items:center;

  & > p {
       padding-bottom:8px;
  }
`;

const subTitleCss = css`
  width:100%;
  height:22px;
  background:#F9F9F9;
  border-radius:2px;
  margin:2px 0;
  ${flexCenter}
`;

interface Props {
    title:string;
    subTitle:Array<string>;
}

const NewTechBox = ({title,subTitle}:Props) => {
  return (
    <BasicBox width={119} height={133} borderColor={Colors.primary6} borderRadius={4} paddingTop={8}>
        <div css={bodyTxt}>
           <Typography.Body2 color="#000">{title}</Typography.Body2>
           {subTitle.map((s,idx) =><div css={css`width:calc(100% - 5px)`} key={idx}><Typography.Body2 color={Colors.overlaySidebarActiveTxt}><p css={subTitleCss}>{s}</p></Typography.Body2></div> )}
        </div>
    </BasicBox>
  )
}

export default NewTechBox
