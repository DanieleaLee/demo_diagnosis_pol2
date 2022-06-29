import {css} from "@emotion/react";
import Image from "next/image";
import MemoPopUp from "@components/molecules/MemoPopUp";

const mpTitleWrapCss = css`
    width: 100%;
    font-size: 13px;
    padding-left: 48px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 57px;
`;
const mpTitleCss = css`
    font-weight: 500;
    font-size: 15px;
    width: 111px;
    height: 16px;
    overflow: hidden;
`;
const i_libraryCss = css`
    width: 15px;
    height: 15px;
    position: relative;
    background-color: #2E3B43;
    margin-right: 3px;
`;
const i_noteCss = css`
    width: 15px;
    height: 15px;
    position: relative;
    &:hover .memoCss {
        visibility: visible;
    }
    
    & > span.memoCss {
      position: absolute;
      visibility: hidden;
      top: 2px;
    }
`;

const AAPipelineTitle = ({mpTitle, memoContent, tags}) => {
  return (
    <div css={[mpTitleWrapCss]}>
      <div css={mpTitleCss}>
        {mpTitle}
      </div>
      <span css={[i_libraryCss]}>
                <Image width={15} height={15} src={`/img/alvin/bx-library.png`} alt={'List'}/>
            </span>
      <span css={[i_noteCss]}>
                <Image width={15} height={15} src={`/img/alvin/bx-note.png`} alt={'Note'}/>
                <span className='memoCss'>
                    <MemoPopUp title={'Note'} tags={tags} content={memoContent} />
                </span>
            </span>

    </div>
  )
}

export default AAPipelineTitle;