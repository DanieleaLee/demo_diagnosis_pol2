import { css } from '@emotion/react';
import React from 'react';
import Image from 'next/image';
import * as Typography from '@styles/typography'


const cardContainerStyle = css`
  width: 269px;
  height: 250px;
  background-color: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 20px;
  padding-bottom: 14px;
  position: relative;
`;
const iconWarpStyle = css`
  width: 24px;
  height: 24px;
  margin-bottom: 25px;
`;
const cardTitleStyle = css`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #546a78;
  margin-bottom: 8px;
`;
const cardDescriptionStyle = css`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #5b6266;
  /* height: 105px; */

  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 90px;
`;
const bottomIconWarpStyle = css`
  width: 24px;
  height: 24px;
  position: absolute;
  bottom: 14px;
`;

const selcetedBoxStyle = css`
  border: 1.5px solid #546a78;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
`;

export interface ModelCardProps {
  modelId: string;
  title: string;
  description: string;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

const ModelCard = ({ modelId, title, description, isSelected, onSelect }: ModelCardProps) => {
  return (
    <div css={[cardContainerStyle, isSelected ? selcetedBoxStyle : css``]} onClick={() => onSelect(modelId)}>
      <div css={iconWarpStyle}>
        <Image width={24} height={24} src={`/img/taehyun/model_${modelId}.png`} alt={`model_${modelId}`} />
      </div>
      {/* <Typography.Subtitle4>{title}</Typography.Subtitle4>
      <Typography.Body4>{description}</Typography.Body4> */}
      <p css={cardTitleStyle}>{title}</p>
      <p css={cardDescriptionStyle}>{description}</p>
      <div css={[bottomIconWarpStyle]}>
        <Image
          width={24}
          height={24}
          src={`/img/taehyun/${isSelected ? 'bx-check' : 'bx-down-arrow-alt'}.png`}
          alt="down-arrow"
        />
      </div>
    </div>
  );
};

export default ModelCard;
