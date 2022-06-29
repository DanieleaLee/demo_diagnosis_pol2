import React, { useState } from 'react';
import { css } from '@emotion/react';
import { MAIN_HEADER_HEIGHT } from 'src/config/constants/index';
import { safeMarginTop } from '@styles';
import ModelCard from '@components/molecules/ModelCard';
import ModelConfigRangeRow from '@components/molecules/ModelConfigRangeRow';
import DatePicker from '@components/molecules/DatePicker';
import RangeSetButton from '@components/molecules/RangeSetButton';
import ColumnMilestone from '@components/molecules/ColumnMilestone';
import RowMilestone from '@components/molecules/RowMilestone';
// import MpTitle from '@components/molecules/MpTitle';
import FilterDropdownBox from '@components/molecules/FilterDropdownBox';
import { tagsDummy, memoContent, UniverseInfo } from '@tempComponents/v2/Dummy';
// import TechTree from '@components/molecules/TechTree';
import Calendar from '@components/molecules/Calendar';
import moment from 'moment';
// import RightMenu from '@components/molecules/RightMenu';
import SearchBar from '@components/molecules/SearchBar';
import TabButtons from '@components/molecules/TabButtons';
import HelpTooltip from 'src/components/molecules/HelpTooltip';

const FILTER_BOX_DATA = [
  { id: 'snp500', name: 'S&P 500' },
  { id: 'nasdaq', name: 'NASDAQ' },
  { id: 'kospi', name: 'KOSPI' },
  { id: 'kosdq', name: 'KOSDAQ' },
  { id: 'nasd', name: 'NASD' },
];

const mainContainerWrap = css`
  ${safeMarginTop(MAIN_HEADER_HEIGHT)}
`;

const Template_Molecures = () => {
  const [selectedModelId, setSelectedModelId] = useState<string>(null);
  const handleSelect = (id: string) => {
    setSelectedModelId(id);
  };

  const [totalRanges, setTotalRanges] = useState({ min: 0, max: 100 });
  const changeTotalRangeHandle = (props: { min: number; max: number }) => {
    const { min, max } = props;
    setTotalRanges({ min: min, max: max });
  };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedFirstDate, setSelectedFirstDate] = useState('');
  const selectDateHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedFirstDate(event.currentTarget.value);
    setShowDatePicker(false);
  };
  const showCalendarHandler = () => {
    setShowDatePicker((prevState) => !prevState);
  };

  const [open, setOpen] = useState(false);
  const [range, setRanges] = useState({ min: 0, max: 100 });
  const applyRangeHandle = (props: { min: number; max: number }) => {
    const { min, max } = props;
    setRanges({ min: min, max: max });
  };

  const [showCalendar, setShowCalendar] = useState(false);

  const [allCheckedItems, setAllCheckedItems] = useState<Array<string[]>>(new Array(FILTER_BOX_DATA.length).fill([]));
  const changeCheckedItemsState = (idx: number, checkedArr: Array<string>) => {
    setAllCheckedItems((prev) => {
      const temp = [...prev];
      temp[idx] = checkedArr;
      return temp;
    });
  };

  const [input, setInput] = useState('');

  const menuList = ['first', 'second', 'third'];
  const [selectedTabMenu, setSelectedTabMenu] = useState(menuList[0]);

  return (
    <div
      className={'container-md'}
      css={[
        mainContainerWrap,
        css`
          margin-bottom: 100px;
        `,
      ]}
    >
      <hr />
      <div>
        <br />
        <h4>{`<ModelCard modelId={modelId} title="" description="" isSelected={selectedModelId === modelId ? true : false} onSelect={handleSelect} />`}</h4>
        <button
          css={css`
            margin-bottom: 10px;
          `}
          onClick={() => setSelectedModelId(null)}
        >
          Selected Reset
        </button>
        <div css={css`border:1px solid black;`}>
          <ModelCard
            modelId="svm"
            title="Support Vector Machines"
            description="support-vector machines (SVMs, also support-vector networks[1]) are supervised learning models with associated learning algorithms that analyze data for classification and regression analysis."
            isSelected={selectedModelId === 'svm' ? true : false}
            onSelect={handleSelect}
          />
          <ModelCard
            modelId="svm"
            title="Support Vector Machines"
            description="support-vector machines (SVMs, also support-vector networks[1]) are supervised learning models with associated learning algorithms that analyze data for classification and regression analysis."
            isSelected={selectedModelId === 'svm' ? true : false}
            onSelect={handleSelect}
          />
        </div>
      </div>

      <hr />
      <div>
        <br />
        <h4>ModelConfigRangeRow</h4>
        <code
          css={css`
            white-space: pre-wrap;
          `}
        >
          {`
            const [totalRanges, setTotalRanges] = useState({ min: 0, max: 100 });
            const changeTotalRangeHandle = (props: { min: number; max: number }) => {
              const { min, max } = props;
              setTotalRanges({ min: min, max: max });
            };
            <div
            css={css\`
              width: 400px;
              border: 1px solid black;
              position: relative;
            \`}
          >
            <ModelConfigRangeRow
              rowId={'total'}
              title={'Total'}
              minLimit={30}
              maxLimit={50}
              minValue={totalRanges.min}
              maxValue={totalRanges.max}
              onApply={changeTotalRangeHandle}
              disabled={false}
            />
          </div>`}
        </code>

        <div
          css={css`
            width: 400px;
            border: 1px solid black;
            position: relative;
          `}
        >
          <ModelConfigRangeRow
            rowId={'total'}
            title={'Total'}
            minLimit={30}
            maxLimit={50}
            minValue={totalRanges.min}
            maxValue={totalRanges.max}
            onApply={changeTotalRangeHandle}
            disabled={false}
          />
        </div>
      </div>

      <hr />
      <div>
        <br />
        <h4>DatePicker</h4>
        <code
          css={css`
            white-space: pre-wrap;
          `}
        >
          {`
          const [showCalendar, setShowCalendar] = useState(false);
          const [selectedFirstDate, setSelectedFirstDate] = useState('');
          const selectDateHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
            setSelectedFirstDate(event.currentTarget.value);
            setShowCalendar(false);
          };
          const showCalendarHandler = () => {
            setShowCalendar((prevState) => !prevState);
          };
          <DatePicker
          width={130}
          height={30}
          selectedDate={selectedFirstDate}
          selectDateHandler={selectDateHandler}
          showCalendar={showCalendar}
          showCalendarHandler={showCalendarHandler}
        />
          `}
        </code>
        <DatePicker
          width={130}
          height={30}
          selectedDate={selectedFirstDate}
          selectDateHandler={selectDateHandler}
          showCalendar={showDatePicker}
          showCalendarHandler={showCalendarHandler}
        />
      </div>

      <hr />
      <div>
        <br />
        <h4>RangeSetButton</h4>
        <code
          css={css`
            white-space: pre-wrap;
          `}
        >
          {`
            const [open, setOpen] = useState(false);
            const [range, setRanges] = useState({ min: 0, max: 100 });
            const applyRangeHandle = (props: { min: number; max: number }) => {
              const { min, max } = props;
              setRanges({ min: min, max: max });
            };
            <RangeSetButton
            rowId={'test_1'}
            open={open}
            setOpen={setOpen}
            minValue={range.min}
            maxValue={range.max}
            minLimit={100}
            maxLimit={0}
            onApply={applyRangeHandle}
            />
          `}
        </code>
        <div
          css={css`
            position: relative;
            width: 120px;
            border: 1px solid black;
          `}
        >
          <div>
            <RangeSetButton
              rowId={'test_1'}
              open={open}
              setOpen={setOpen}
              minValue={range.min}
              maxValue={range.max}
              minLimit={100}
              maxLimit={0}
              onApply={applyRangeHandle}
            />
          </div>
        </div>
      </div>

      <hr />
      <div>
        <br />
        <h4>ColumnMilestone</h4>
        <code
          css={css`
            white-space: pre-wrap;
          `}
        >
          {`
         <ColumnMilestone
         totalStepsList={['Investment Universe', 'Model Selection', 'Model Config', 'Model Run', 'Post Process']}
         currentStep={1}
       />
          `}
        </code>
        <div>
          <ColumnMilestone
            totalStepsList={['Investment Universe', 'Model Selection', 'Model Config', 'Model Run', 'Post Process']}
            currentStep={1}
          />
        </div>
      </div>

      <hr />
      <div>
        <br />
        <h4>RowMilestone</h4>
        <code
          css={css`
            white-space: pre-wrap;
          `}
        >
          {`
        <RowMilestone
        totalStepsList={['Investment Universe', 'Model Selection', 'Model Config', 'Model Run', 'Post Process']}
        currentStep={3}
        currentStepStatus={true}
      />`}
        </code>
        <div>
          <RowMilestone
            totalStepsList={['Investment Universe', 'Model Selection', 'Model Config', 'Model Run', 'Post Process']}
            currentStep={3}
            currentStepStatus={true}
          />
        </div>
      </div>

      <hr />

      <hr />

      <hr />
      <div>
        <h4>{`<Calendar subtractMonthHandler={() => {}} addMonthHandler={() => {}} selectDateHandler={() => {}} selectedDate={selectedDate} today={moment()} />`}</h4>
        <button onClick={() => setShowCalendar(!showCalendar)}>show calendar</button>
        {showCalendar && (
          <Calendar
            // subtractMonthHandler={() => {}}
            // addMonthHandler={() => {}}
            selectDateHandler={() => {}}
            selectedDate={'2022-04-18'}
            // today={moment()}
          />
        )}
      </div>

      <hr />
      <div>
        <h4>FilterDropdownBox</h4>
        <code
          css={css`
            white-space: pre-wrap;
          `}
        >{`
          const [allCheckedItems, setAllCheckedItems] = useState<Array<string[]>>(new Array(FILTER_BOX_DATA.length).fill([]));
          const changeCheckedItemsState = (idx: number, checkedArr: Array<string>) => {
            setAllCheckedItems((prev) => {
              const temp = [...prev];
              temp[idx] = checkedArr;
              return temp;
            });
          };
          <FilterDropdownBox
            index={0}
            list={FILTER_BOX_DATA}
            title={'IndexName'}
            changeCheckedItemsState={changeCheckedItemsState}
            checkedItems={allCheckedItems[0]}
          />
          `}</code>
        <div
          css={css`
            width: 400px;
          `}
        >
          <FilterDropdownBox
            index={0}
            list={FILTER_BOX_DATA}
            title={'IndexName'}
            changeCheckedItemsState={changeCheckedItemsState}
            checkedItems={allCheckedItems[0]}
          />
        </div>
      </div>

      <hr />
      <div>
        <h4>RightMenu</h4>
        <p>화면 우측에 탭이 있습니다.</p>
        <p>내부 Elements Atom화 예정</p>
        {/* <RightMenu>
          <RightMenuBody/>
        </RightMenu> */}
        {/*<RightMenu />*/}
      </div>

      <hr />
      <div>
        <h4>SearchBar</h4>
        <code
          css={css`
            white-space: pre-wrap;
          `}
        >{`
        // input(부모 상태)과 내부 상태를 실시간 동기화 할 경우
        <SearchBar
          value={input}
          onChange={(value) => setInput(value)}
          onSearch={() => console.log('Search for ${input}')}
        />
        // search기능을 이용 할 때(keypress enter or click search icon) 상태 업데이트 및 검색 로직(server) 실행
        // 렌더링 최적화에 도움
        <SearchBar onSearch={(value) => setInput(value)} withClear />
        `}</code>
        <p>inputValue: {input}</p>
        {/* <SearchBar
          value={input}
          onChange={(value) => setInput(value)}
          onSearch={() => console.log(`Search for ${input}`)}
        /> */}
        <SearchBar onSearch={(value) => setInput(value)} withClear />
      </div>

      <hr />
      <div>
        <h4>TabButtons</h4>
        <code
          css={css`
            white-space: pre-wrap;
          `}
        >{`

        `}</code>
        <p>selectedTabMenu: {selectedTabMenu}</p>

        <TabButtons menuList={menuList} selectedMenu={selectedTabMenu} onClick={(ts) => setSelectedTabMenu(ts)} />
      </div>

      <hr />
      <div css={css``}>
        <h4>{`<HelpTooltip title={string} description={string} tooltipBoxCss={css} />`}</h4>
        <HelpTooltip
          size={14}
          title="Modern portfolio theory (MPT)"
          description="is a mathematical framework for assembling a portfolio of assets such that the expected return is maximized for a given level of risk."
          tooltipBoxCss={css`left: 7px;top: 8px;`} // prettier-ignore
        />
      </div>
    </div>
  );
};

export default Template_Molecures;
