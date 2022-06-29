import React, { useEffect, useState } from 'react';
import ModelCard from '@taehyunComponents/molecules/ModelCard';
import { css } from '@emotion/react';
import { modelData } from './mockData';

const containerStyle = css`
  /* border: 1px solid black; */
  display: inline-flex;
  flex-wrap: wrap;
  gap: 18px 25px;
  height: 628px;
  overflow-y: scroll;
  padding: 4px; // 테스트용 
`;

const scrollBar = css`
  &::-webkit-scrollbar {
    background: #ececec;
    border-radius: 1.5px;
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1.5px;
    background: #2f3b43;
  }
`;

interface ModelSelectionProps {
  isReset: boolean;
}
const ModelSelection = ({ isReset }: ModelSelectionProps) => {
  const [data, setData] = useState(modelData);
  const [selectedModelId, setSelectedModelId] = useState<string>(null);

  const handleSelect = (id: string) => {
    setSelectedModelId(id);
  };

  useEffect(() => {
    const modelId = localStorage.getItem('selectedModelId'); // recoil state로 변경 필요
    if (!modelId) return;
    setSelectedModelId(modelId);
    const first = modelData.filter((el) => el.modelId === modelId);
    const others = modelData.filter((el) => el.modelId !== modelId);
    setData([...first, ...others]);
  }, []);

  useEffect(() => {
    if (!selectedModelId) return;
    localStorage.setItem('selectedModelId', selectedModelId); // recoil state로 변경 필요
  }, [selectedModelId]);

  useEffect(() => {
    if (isReset) {
      setSelectedModelId(null);
      setData(modelData);
    }
  }, [isReset]);

  return (
    <div css={[containerStyle, scrollBar]}>
      {data.map((el, i) => (
        <ModelCard
          key={i}
          modelId={el.modelId}
          title={el.title}
          description={el.description}
          isSelected={el.modelId === selectedModelId ? true : false}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};

export default ModelSelection;
