import { css, useTheme } from '@emotion/react';
import React, { MouseEvent, useState, useEffect } from 'react';
import Buttonable from 'src/components/atoms/Buttonable';
import Input from 'src/components/atoms/Input';

import Image from 'next/image';
import TextArea from '../../atoms/TextArea';

const ContainerStyle = css`
  background-color: #ffffff;
  /* width: 635px; */
  /* height: 456px; */
  padding: 49px 133px 45px 133px;
`;

type SaveInvestmentUniverseTemplateType = {
  closeModal?: () => void;
};
const SaveInvestmentUniverseTemplate = ({ closeModal }: SaveInvestmentUniverseTemplateType) => {
  const [nameDuplicated, setNameDuplicated] = useState(false);
  const theme = useTheme();
  const [name, setName] = useState('');

  const checkNameDuplicated = () => {
    const list = ['joker', 'All weather portfolio'];
    console.log(name);
    return list.includes(name);
  };
  const onSavehandle = (e: MouseEvent<any>) => {
    e.preventDefault();

    const duplicated = checkNameDuplicated();
    console.log(duplicated);

    setNameDuplicated(duplicated);
    if (!duplicated) {
      console.log('등록 완료 후 모달이 닫힙니다.');
      closeModal();
    }
  };

  useEffect(() => {
    if (!nameDuplicated) return;
    setName('');
  }, [nameDuplicated]);
  return (
    <div css={ContainerStyle}>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 11.5px;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 20px;
          line-height: 24px;
          color: #2f3b43;
          margin-bottom: ${nameDuplicated ? 0 : 23}px;
        `}
      >
        <Image width={20} height={20} src={`/img/taehyun/bx-grid-alt.png`} alt="bx-grid-alt" />
        <span>Save Investment Universe</span>
      </div>
      <form
        css={css`
          width: 635px;
        `}
        autoComplete="off"
      >
        <div>
          {nameDuplicated && (
            <div
              css={css`
                font-family: 'Inter';
                font-style: normal;
                font-weight: 500;
                font-size: 15px;
                line-height: 18px;
                color: #d47878;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                margin-bottom: 5px;
              `}
            >
              <Image width={18} height={18} src={`/img/taehyun/bxs-error-circle.png`} alt="error" />
              name duplicated!
            </div>
          )}
          <Input
            name="name"
            placeholder="Name"
            css={css`
              height: 47px;
              border-radius: 4px;
            `}
            containerCss={css`
              height: 54px;
            `}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <Input
          name="tag"
          placeholder="Tag"
          css={css`
            height: 47px;
            border-radius: 4px;
          `}
          containerCss={css`
            height: 54px;
          `}
        />

        <TextArea
          name="description"
          placeholder="Description"
          css={css`
            height: 127px;
            border-radius: 4px;
            padding-top: 9px;
            padding-bottom: 9px;
            resize: none;
          `}
          containerCss={css`
            margin-bottom: 37px;
          `}
        />

        <div
          css={css`
            width: 294px;
            display: flex;
            gap: 14px;
            margin: 0 auto;
          `}
        >
          <Buttonable
            onClick={closeModal}
            css={css`
              background-color: white;
              color: ${theme.colors.accent2};
              border: 1px solid ${theme.colors.accent2};
              border-radius: 8px;
              width: 140px;
              height: 43px;
              text-align: center;
              font-family: 'Inter';
              font-style: normal;
              font-weight: 600;
              font-size: 18px;
              line-height: 22px;
              letter-spacing: 0.03em;
              color: #546a78;
            `}
          >
            Close
          </Buttonable>
          <Buttonable
            disabled={name.length < 1 ? true : false}
            onClick={onSavehandle}
            css={css`
              background-color: ${name.length < 1 ? '#ECECEC' : '#2e3b43'};
              color: ${name.length < 1 ? '#B6B6B6' : '#ffffff'};
              border: 1px solid ${name.length < 1 ? '#ECECEC' : '#2e3b43'};
              border-radius: 8px;
              width: 140px;
              height: 43px;
              text-align: center;
              font-family: 'Inter';
              font-style: normal;
              font-weight: 600;
              font-size: 18px;
              line-height: 22px;
              letter-spacing: 0.03em;
            `}
          >
            Save
          </Buttonable>
        </div>
      </form>
    </div>
  );
};

export default SaveInvestmentUniverseTemplate;
