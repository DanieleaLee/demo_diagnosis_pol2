import { css } from '@emotion/react';
import Colors from '@styles/colors';
import React, { useCallback, useState, useRef, useEffect } from 'react';
import TabButtons from '@components/molecules/TabButtons';
import SearchBar from '@components/molecules/SearchBar';
import * as TextButton from '@components/atoms/TextButton/index';
import axios from 'axios';
import { AiOutlineConsoleSql } from 'react-icons/ai';

const RightMenuBodyCss = (width, minHeight) => css`
  width: ${width}px;
  height: calc(100vh - 100px); // 브라우저 높이에 따라감
  min-height: ${minHeight}px; // 브라우저 높이 줄어들어도 height 값 보장
  background: ${Colors.backgroundPrimary1};
  border-radius: 8px 0px 0px 8px;
  padding-top: 33px;
  padding-bottom: 44px;
  padding-left: 41px;
  padding-right: 41px;
  position: relative;
`;

const RightMenuBodyLayoutCss = css`
  width: 100%;
  height: 100%;
  display: inline-block;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const tabButtonWrapCss = css`
  width: 579px;
`;
const SearchBarWrapCss = css`
  width: 100%;
  margin-top: 32px;
`;

const TableWrapCss = css`
  width: 100%;
  height: 258px;
  margin-top: 16px;
  background-color: #fff;
  border: 1px solid #ececec;
  box-sizing: border-box;
  border-radius: 8px;
  text-align: center;
`;

const DescTitleCss = css`
  margin-top: 13px;
  width: 100%;
  text-align: left;
  font-weight: 500;
  font-size: 15px;
  color: #9da6ad;
`;

const DescWrapCss = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 9px;
  text-align: center;
`;

const DescTableWrapCss = css`
  width: 445px;
  height: 258px;
  background: #ffffff;
  border: 1px solid #ececec;
  box-sizing: border-box;
  border-radius: 8px;
`;

const DescInfoWrapCss = css`
  width: 326px;
  height: 258px;
  background: #ffffff;
  border: 1px solid #ececec;
  box-sizing: border-box;
  border-radius: 8px;
`;

const ButtonWrapCss = css`
  width: 100%;
  position: absolute;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const menuList = ['My', 'Qraft', 'Market'];

export type RightMenuBodyProps = {
  width?: any;
  minHeight?: any;
  closeOverlay?: any;
};
const RightMenuBody = ({ width, minHeight, closeOverlay }: RightMenuBodyProps) => {
  const [selectedTabMenu, setSelectedTabMenu] = useState(menuList[0]);
  const [loadTable, setLoadTable] = useState(null);
  const [loadDescription, setLoadDescription] = useState(null);
  const [loadInfo, setloadInfo] = useState(null);
  // const [selectedMenu, setSelectedMenu] = useState(menuList[0]);

  const getIUtable = async (selectedTabMenu) => {
    selectedTabMenu == 'My' ? '1' : '0';
    const res = await axios.get('http://10.10.1.4:4444/api/v1/temp/iu/list?cnt=5&page=0');
    const result = [...res.data.contents].slice(0, 3);
    setLoadTable(result);
    console.log('setLoadTable 변경!');
  };

  const getIUdesc = async (selectedTabMenu) => {
    const res = await axios.get('http://10.10.1.4:4444/api/v1/temp/iu/list?cnt=5&page=0');
    const result = [...res.data.contents].slice(0, 1);
    setLoadDescription((prev) => (prev ? '' : result));
    console.log('setLoadDescription 변경!');
  };

  const getIUinfo = async (selectedTabMenu) => {
    const res = await axios.get('http://10.10.1.4:4444/api/v1/temp/iu/list?cnt=5&page=0');
    const result = [...res.data.contents].slice(0, 1);
    setloadInfo((prev) => (prev ? '' : result));
    console.log('setloadInfo 변경!');
  };

  useEffect(() => {
    console.log('TAB 메뉴 변경!!!! : ', selectedTabMenu);
    getIUtable(selectedTabMenu);
    setLoadDescription('');
    setloadInfo('');
  }, [selectedTabMenu]);

  const tabChecking = (ts: string) => {
    setSelectedTabMenu(ts);
  };

  return (
    <div css={[RightMenuBodyCss(width, minHeight)]}>
      <div css={[RightMenuBodyLayoutCss]}>
        <div css={[tabButtonWrapCss]}>
          <TabButtons menuList={menuList} selectedMenu={selectedTabMenu} onClick={tabChecking} />
        </div>
        <div css={[SearchBarWrapCss]}>
          <SearchBar height={42} withClear onSearch={(value) => console.log('search for ', value)} />
        </div>
        <div css={[TableWrapCss]}>
          {loadTable &&
            loadTable.map((ts, k) => {
              return <span key={k}>{JSON.stringify(ts)}</span>;
            })}
        </div>
        <p css={[DescTitleCss]}>Description</p>
        <div css={[DescWrapCss]}>
          <div css={[DescTableWrapCss]} onClick={getIUdesc}>
            {loadDescription &&
              loadDescription.map((ts, k) => {
                return <span key={k}>{JSON.stringify(ts)}</span>;
              })}
          </div>
          <div css={[DescInfoWrapCss]} onClick={getIUinfo}>
            {loadInfo &&
              loadInfo.map((ts, k) => {
                return <span key={k}>{JSON.stringify(ts)}</span>;
              })}
          </div>
        </div>
        <div css={[ButtonWrapCss]}>
          <TextButton.Normal title="Add to Basket" bgTheme="primary" onClick={closeOverlay} />
        </div>
      </div>
    </div>
  );
};

export default RightMenuBody;
