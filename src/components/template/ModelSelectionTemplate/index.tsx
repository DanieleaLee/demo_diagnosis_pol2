import React, { useEffect, useState } from 'react';
import ModelCard from '@components/molecules/ModelCard';
import { css } from '@emotion/react';
import * as TextButton from '@components/atoms/TextButton';
import { useSelectedModel, useSelectedModelValue } from '@recoil/hooks/useSelectedModel';

const TECHTREE_HEIGHT = 200;

const containerStyle = css`
  width: 100%;
  height: calc(100% - ${TECHTREE_HEIGHT - 8}px);
  padding: 40px 62px 0 33px;
  position: relative;
`;

const selectionWrapStyle = css`
  height: 100%;
  overflow-y: scroll;
  padding: 4px;
`;

const buttonWraperStyle = css`
  position: absolute;
  bottom: 32px;
  right: 94px;
  display: flex;
  gap: 7px;
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
  modelData: { modelId: string; title: string; description: string }[];
  onSubmit?: (selectedModel: string) => void;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
}
const ModelSelection = ({ modelData, onSubmit, setStep }: ModelSelectionProps) => {
  const [isReset, setIsReset] = useState(false);
  const { modelId } = useSelectedModelValue(); // recoil state 0502
  const { setSelectedModel } = useSelectedModel(); // recoil setState 0502

  const [nextDisabled, setNextDisabled] = useState(modelId ? false : true);
  const [data, setData] = useState(modelData);
  const [selectedModelId, setSelectedModelId] = useState<string>(null);

  const goPrev = () => {
    setSelectedModel({ modelId: null, modelName: null, description: null });
    setIsReset(true);
    setNextDisabled(true);
    setStep((prev) => prev - 1);
  };

  const handleSelect = (id: string, title: string, description: string) => {
    setSelectedModel({
      modelId: id,
      modelName: title,
      description: description,
    });
    setSelectedModelId(id);
    setNextDisabled(false);
  };

  useEffect(() => {
    if (!modelId) return;
    setSelectedModelId(modelId);
    const first = modelData.filter((el) => el.modelId === modelId);
    const others = modelData.filter((el) => el.modelId !== modelId);
    setData([...first, ...others]);
  }, []);

  useEffect(() => {
    if (selectedModelId === modelId) return;
    if (!selectedModelId) {
      return;
    }

    onSubmit && onSubmit(selectedModelId);
  }, [selectedModelId]);

  useEffect(() => {
    if (!isReset) return;

    setSelectedModelId(null);
    setData(modelData);
    setIsReset(false);
  }, [isReset]);

  return (
    <div css={containerStyle}>
      <div css={[selectionWrapStyle, scrollBar]}>
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
      <div
        css={css`
          ${buttonWraperStyle}
          & button {
            box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
          }
        `}
      >
        <TextButton.Normal title="Prev" bgTheme="common" onClick={goPrev} />
        <TextButton.Normal
          title="Next"
          bgTheme="accent"
          onClick={() => setStep((prev) => prev + 1)}
          disabled={nextDisabled}
        />
      </div>
    </div>
  );
};

export default ModelSelection;
