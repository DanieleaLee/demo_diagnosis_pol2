import { useState } from 'react';
import { css } from '@emotion/react';
import { MAIN_HEADER_HEIGHT } from 'src/config/constants/index';
import { safeMarginTop } from '@styles';
import IconList from '@tempComponents/v2/atoms/Icon';
import ProgressBarTechTree from '@components/molecules/ProgressBarTechTree';
import * as Typography from '@styles/typography';
import * as Balloon from '@components/molecules/Balloon';
import { tagsDummy, memoContent } from '@tempComponents/v2/Dummy';
import * as TextButton from '@components/atoms/TextButton/index';
import { FaPlus } from 'react-icons/fa';
import { BiServer } from 'react-icons/bi';
import ProgressBarBody from '@tempComponents/v2/atoms/ProgressBarBody';
import RangeBarSingle from '@components/molecules/RangeBarSingle';
import CalendarDateButton from '@components/atoms/CalendarDateButton';
import BasicBox from '@components/atoms/BasicBox';
import FilterTag from 'src/components/atoms/FilterTag';
import RangeSetBox from '@components/molecules/RangeSetBox';
import InvalidBox from '@components/molecules/InvalidBox';


const mainContainerWrap = css`
  ${safeMarginTop(MAIN_HEADER_HEIGHT)}
`;

const Template_Atoms = (props) => {
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState(0);

  return (
    <>
      <div
        className={'container-md'}
        css={[
          mainContainerWrap,
          css`
            margin-bottom: 100px;
          `,
        ]}
      >
        <h4>{`<Typography.Headline1 lineHeight={1}>Headline1! : // 700 2.5rem Titillium</Typography.Headline1>`}</h4>
        <hr />
        <Typography.Headline1 lineHeight={1}>Headline1! : // 700 2.5rem Titillium</Typography.Headline1>
        <Typography.Headline2 lineHeight={1}>Headline2! : // 600 2.1875rem Titillium</Typography.Headline2>
        <Typography.Headline3 lineHeight={1}>Headline3! : // 600 1.5625rem Titillium</Typography.Headline3>
        <Typography.Headline4 lineHeight={1}>Headline4! : // 600 1.375rem Titillium</Typography.Headline4>
        <hr />
        <Typography.Title1 lineHeight={1}>Title1! : // 700 1.125rem Inter</Typography.Title1>
        <Typography.Title2 lineHeight={1}>Title2! : // 500 1.125rem Inter</Typography.Title2>
        <Typography.Title3 lineHeight={1}>Title3! : // 600 1.125rem Inter</Typography.Title3>
        <Typography.Title4 lineHeight={1}>Title4! : // 700 1.0625rem Titillium</Typography.Title4>
        <Typography.Title5 lineHeight={1}>Title5! : // 600 1.0625rem Titillium</Typography.Title5>
        <Typography.Title6 lineHeight={1}>Title6! : // 700 1.0625rem Inter</Typography.Title6>
        <hr />
        <Typography.Subtitle1 lineHeight={1}>Subtitle1! : // 700 0.9375 Inter</Typography.Subtitle1>
        <Typography.Subtitle2 lineHeight={1}>Subtitle2! : // 600 0.9375 Inter</Typography.Subtitle2>
        <Typography.Subtitle3 lineHeight={1}>Subtitle3! : // 400 0.9375 Inter</Typography.Subtitle3>
        <Typography.Subtitle4 lineHeight={1}>Subtitle4! : // 600 0.875rem Inter</Typography.Subtitle4>
        <hr />
        <Typography.Body1 lineHeight={1}>Body1! : // 600 0.8125rem Titillium</Typography.Body1>
        <Typography.Body2 lineHeight={1}>Body2! : // 600 0.8125rem Inter</Typography.Body2>
        <Typography.Body3 lineHeight={1}>Body3! : // 400 0.8125rem Inter</Typography.Body3>
        <Typography.Body4 lineHeight={1}>Body4! : // 500 0.75rem Inter</Typography.Body4>
        <Typography.Body5 lineHeight={1}>Body5! : // 500 0.6875rem Inter</Typography.Body5>
        <Typography.Body6 lineHeight={1}>Body6! : // 400 0.625rem Inter</Typography.Body6>

        <hr />
        <div>
          <h4>{`<IconList name={"all"} size={22} color={"black"} />`}</h4>
          <br />
          <IconList name={'all'} size={22} color={'black'} />
        </div>

        <hr />
        <div>
          <h4>{`<ProgressBarTechTree label={"포켓몬"} currentPercent={60} />`}</h4>
          <br />
          <ProgressBarTechTree label={'포켓몬'} currentPercent={60} />
        </div>

        <hr />
        <div>
          <h4>{`<Balloon.Box width={100} height={100} arrowPosition={'left'} arrowAlign={'end'}>hi</Balloon.Box>`}</h4>
          <br />
          <Balloon.Box width={100} height={100} arrowPosition={'left'} arrowAlign={'end'}>
            hi
          </Balloon.Box>
        </div>

        <hr />
        <div>
          <h4>{`<Balloon.Memo width={200} height={300} title={'타이틀'} tags={[...tagsDummy]}>{memoContent}</Balloon.Memo>`}</h4>
          <Balloon.Memo width={200} height={300} title={'타이틀'} tags={[...tagsDummy]}>
            {memoContent}
          </Balloon.Memo>
        </div>

        <hr />
        <div>
          <button onClick={() => setDisabled(!disabled)}>disabled: {String(disabled)}</button>
          <div>
            <br />
            <h4>{`<TextButton.Normal title="Component" disabled={disabled} bgTheme="accent" onClick={() => {}} />`}</h4>
            <div
              css={css`
                display: flex;
                gap: 10px;
              `}
            >
              <TextButton.Normal title="Component" disabled={disabled} bgTheme="accent" onClick={() => {}} />
              <TextButton.Normal
                leftMargin={'8px'}
                left={<FaPlus color="white" />}
                title="Add"
                disabled={disabled}
                bgTheme="primary"
                onClick={() => {}}
              />
              <TextButton.Normal title="Component" disabled={disabled} bgTheme="common" onClick={() => {}} />
              <TextButton.Normal
                title="Save Investment Universe"
                disabled={disabled}
                bgTheme="common"
                onClick={() => {}}
              />
            </div>

            <br />
            <h4>{`<TextButton.Small title="Set Apply" disabled={disabled} bgTheme="accent" onClick={() => {}} />`}</h4>
            <div
              css={css`
                display: flex;
                gap: 10px;
              `}
            >
              <TextButton.Small
                title="Set Apply"
                disabled={disabled}
                bgTheme="accent"
                onClick={() => console.log(123)}
              />
              <TextButton.Small
                title="Set Apply"
                disabled={disabled}
                bgTheme="primary"
                onClick={() => console.log(123)}
              />
              <TextButton.Small
                title="Set Apply"
                disabled={disabled}
                bgTheme="common"
                onClick={() => console.log(123)}
              />
            </div>

            <br />
            <h4>{`<TextButton.Tiny icon={(props) => <BiServer {...props} />} title="Apply" disabled={disabled} onClick={() => {}} />`}</h4>
            <div
              css={css`
                display: flex;
                gap: 10px;
              `}
            >
              <TextButton.Tiny title="Apply" disabled={disabled} onClick={() => {}} />
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
        </div>

        <hr />
        <div>
          <h4>
            {'<ProgressBarBody value={65} total={65 * 4} progressVisible visibleType="percentage" toFixed={2} />'}
          </h4>
          <br />
          <ProgressBarBody value={65} total={65.12312 * 4} progressVisible visibleType="percentage" toFixed={2} />
        </div>

        <hr />
        <div>
          <div>
            <h4>value/setValue:{value}</h4>
            <div
              css={css`
                border: 1px solid black;
                margin-bottom: 10px;
              `}
            >
              <h4>{`<RangeBarSingle min={30.5} max={50.5} demicalPoint={1} value={value} setValue={setValue} visibleType="percentage" />`}</h4>
              <RangeBarSingle
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
                border: 1px solid black;
                margin-bottom: 10px;
              `}
            >
              <h4>{`<RangeBarSingle min={0.15} max={1} demicalPoint={4} visibleType="percentage" />`}</h4>
              <p>max 1 기준으로 %로 표시</p>
              <RangeBarSingle min={0.15} max={1} demicalPoint={4} visibleType="percentage" />
              <h4>{`<RangeBarSingle min={0.15} max={1} demicalPoint={4} visibleType="value" />`}</h4>
              <p>max 1 기준으로 %로 표시</p>
              <RangeBarSingle min={0.15} max={1} demicalPoint={4} />
            </div>

            <div
              css={css`
                border: 1px solid black;
              `}
            >
              <h4>{`<RangeBarSingle min={0.125} max={0.987} demicalPoint={2} visibleType="value" />`}</h4>
              <p>min: demicalPoint기준으로 올림, max: demicalPoint기준으로 버림</p>
              <RangeBarSingle min={0.125} max={0.987} demicalPoint={2} />
              <h4>{`<RangeBarSingle max={0.987} demicalPoint={2} visibleType="percentage" />`}</h4>
              <RangeBarSingle max={0.987} demicalPoint={2} visibleType="percentage" />
            </div>
          </div>
        </div>

        <hr />
        <div>
          <h4>{`<CalendarDateButton width={130} height={30} selectedDate={'2022-04-18'} onClick={()=>console.log('open calendar')} />`}</h4>
          <CalendarDateButton
            width={130}
            height={30}
            selectedDate={'2022-04-18'}
            onClick={() => console.log('open calendar')}
          />
        </div>

        <hr />
        <div
          css={css`
            white-space: pre-wrap;
          `}
        >
          <h4>{`<BasicBox />`}</h4>
          <code>{`
          <BasicBox
            width={304}
            height={463}
            borderColor="#CED9E1"
          >
            {children}
          </BasicBox>`}</code>
          <BasicBox width={304} height={463} borderColor="#CED9E1">
            {`children`}
          </BasicBox>
        </div>

        <hr />
        <div>
          <br />
          <h4>RangeSetBox</h4>
          <code
            css={css`
              white-space: pre-wrap;
            `}
          >
            {`
           <div
           css={css\`
             height: 200px;
             border: 1px solid red;
             position: relative;
             margin-top: 100px;
             background-color: blue;
           \`}
         >
           <RangeSetBox open={true} min={0} max={100} minLimit={30} maxLimit={50} minVal={0} maxVal={100} />
         </div>`}
          </code>

          <div
            css={css`
              width: 200px;
              height: 200px;
              border: 1px solid red;
              position: relative;
            `}
          >
            <RangeSetBox open={true} min={0} max={100} minLimit={30} maxLimit={50} minVal={0} maxVal={100} />
          </div>
        </div>

        <hr />
        <div
          css={css`
            white-space: pre-wrap;
          `}
        >
          <h4>{`<FilterTag width={200} title="Index Name" checkedElements={allCheckedItems[0]} showCategories={false} />`}</h4>
          <p>FilterBox에서 선택하면 FilterTag에 반영</p>
          <FilterTag width={200} title="Index Name" checkedElements={['a', 'b', 'c', 'd']} showCategories={false} />
        </div>

        <hr />
        <div css={css``}>
          <h4>{`<InvalidBox errorMessage="aaa bbb ccc ddd eee fff ggg hhh iii jjj" />`}</h4>
          <InvalidBox errorMessage="aaa bbb ccc ddd eee fff ggg hhh iii jjj" />
        </div>

        
      </div>
    </>
  );
};

export default Template_Atoms;
