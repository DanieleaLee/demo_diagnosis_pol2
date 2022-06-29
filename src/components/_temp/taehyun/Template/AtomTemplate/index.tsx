import React, { useState } from 'react';
import * as TextButton from '@taehyunComponents/atoms/TextButton';
import { css } from '@emotion/react';
import { FaPlus } from 'react-icons/fa';
import { BiServer } from 'react-icons/bi';
import ProgressBarBody from 'src/components/_temp/taehyun/atoms/ProgressBarBody';
import ModelCard from '@taehyunComponents/molecules/ModelCard';
import ModelConfigBox from '@taehyunComponents/organisms/ModelConfigBox';
import RangeBar1 from './../../atoms/RangeBar1/index';

const marginBottom10 = css`
  margin-bottom: 10px;
`;
const progressBarWrapper = css`
  /* width: 100%; */
  width: 400px;
  padding: 10px;
`;

const AtomTemplate = () => {
  const [disabled, setDisabled] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState<string>(null);
  const [disabledModelConfig, setDisabledModelConfig] = useState(false);
  const [value, setValue] = useState(30);

  const handleSelect = (id: string) => {
    setSelectedModelId(id);
  };

  return (
    <div>
      <hr />
      <p css={marginBottom10}>
        {'Atom > TextButton(Small/Large/Tiny)'}
        <button onClick={() => setDisabled(!disabled)}>disabled: {String(disabled)}</button>
      </p>
      <div>
        <h2>Normal</h2>
        <div
          css={css`
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
          `}
        >
          <TextButton.Normal title="Component" disabled={disabled} bgTheme="accent" onClick={() => console.log(123)} />
          <TextButton.Normal
            leftMargin={'8px'}
            left={<FaPlus color="white" />}
            title="Add"
            disabled={disabled}
            bgTheme="primary"
            onClick={() => console.log(123)}
          />
          <TextButton.Normal title="Component" disabled={disabled} bgTheme="common" onClick={() => console.log(123)} />
          <TextButton.Normal
            title="Save Investment Universe"
            disabled={disabled}
            bgTheme="common"
            onClick={() => console.log(123)}
          />
        </div>
        <h2>Small</h2>
        <div
          css={css`
            display: flex;
            gap: 10px;
          `}
        >
          <TextButton.Small title="Set Apply" disabled={disabled} bgTheme="accent" onClick={() => console.log(123)} />
          <TextButton.Small title="Set Apply" disabled={disabled} bgTheme="primary" onClick={() => console.log(123)} />
          <TextButton.Small title="Set Apply" disabled={disabled} bgTheme="common" onClick={() => console.log(123)} />
        </div>
        <h2>Tiny</h2>
        <div
          css={css`
            display: flex;
            gap: 10px;
          `}
        >
          <TextButton.Tiny title="Apply" disabled={disabled} onClick={() => console.log(123)} />
          <TextButton.Tiny
            icon={(props) => <BiServer {...props} />}
            title="Analytics"
            disabled={disabled}
            onClick={() => console.log(123)}
          />
          <TextButton.Tiny
            leftMargin={'5px'}
            left={<BiServer color={disabled ? '#9DA6AD' : 'white'} />}
            title="Analytics"
            disabled={disabled}
            onClick={() => console.log(123)}
          />
        </div>
      </div>
      <hr />
      <p css={marginBottom10}>{'Atom > ProgressBarBody'}</p>
      <div css={progressBarWrapper}>
        <ProgressBarBody
          value={65.312312312}
          total={65.312312312 * 4}
          progressVisible
          visibleType="percentage"
          // toFixed={2}
        />
      </div>
      <hr />
      <p css={marginBottom10}>{'molecules > Model Card'}</p>
      <p>{`<ModelCard modelId="svm" title="" description="" isSelected={true} onSelect={handleSelect} />`}</p>
      <button
        css={css`
          margin-bottom: 10px;
        `}
        onClick={() => setSelectedModelId(null)}
      >
        Selected Reset
      </button>
      
      <ModelCard
        modelId="svm"
        title="Support Vector Machines"
        description="support-vector machines (SVMs, also support-vector networks[1]) are supervised learning models with associated learning algorithms that analyze data for classification and regression analysis."
        isSelected={selectedModelId === 'svm' ? true : false}
        onSelect={handleSelect}
      />
      <h2 css={marginBottom10}>{'Press the prev button to view the Model Selection Template'}</h2>
      <hr />
      <div>
        <p css={marginBottom10}>{'organisms > RowInBox'}</p>
        <p>disabledModelConfig: {`${disabledModelConfig}`}</p>
        <button onClick={() => setDisabledModelConfig(!disabledModelConfig)}>Toggle Disabled</button>
        <ModelConfigBox disabled={disabledModelConfig} />
      </div>
      <hr />

      <p css={marginBottom10}>{'Atom > RangeBar1'}</p>
      <div
        css={css`
          width: 800px;
        `}
      >
        <div
          css={css`
            border: 1px solid red;
            margin-bottom: 10px;
          `}
        >
          <p>value/setValue:{value}</p>
          <p>{`<RangeBar1 min={30.5} max={50.5} demicalPoint={1} value={value} setValue={setValue} visibleType="percentage" />`}</p>
          <RangeBar1
            min={30.5}
            max={50.5}
            demicalPoint={1}
            value={value}
            setValue={setValue}
            visibleType="percentage"
          />
        </div>

        <div
          css={css`
            border: 1px solid red;
            margin-bottom: 10px;
          `}
        >
          <p>{`<RangeBar1 min={0.15} max={1} demicalPoint={4} visibleType="percentage" />`}</p>
          <p>max 1 기준으로 %로 표시</p>
          <RangeBar1 min={0.15} max={1} demicalPoint={4} visibleType="percentage" />
          <p>{`<RangeBar1 min={0.15} max={1} demicalPoint={4} visibleType="value" />`}</p>
          <p>max 1 기준으로 %로 표시</p>
          <RangeBar1 min={0.15} max={1} demicalPoint={4} />
        </div>

        <div
          css={css`
            border: 1px solid red;
          `}
        >
          <p>{`<RangeBar1 min={0.125} max={0.987} demicalPoint={2} visibleType="value" />`}</p>
          <p>min: demicalPoint기준으로 올림, max: demicalPoint기준으로 버림</p>
          <RangeBar1 min={0.125} max={0.987} demicalPoint={2} />
          <p>{`<RangeBar1 max={0.987} demicalPoint={2} visibleType="percentage" />`}</p>
          <RangeBar1 max={0.987} demicalPoint={2} visibleType="percentage" />
        </div>

        <RangeBar1 min={0} max={100} demicalPoint={0} visibleType="value" />
      </div>
      <hr />
    </div>
  );
};

export default AtomTemplate;
