import { css } from '@emotion/react';
import CustomTable, { TColumn, TRow } from '@taehyunComponents/molecules/CustomTable';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import GaugeBar from '@taehyunComponents/molecules/GaugeBar';
import Modal, { useModal } from '@taehyunComponents/molecules/Modal';
import SaveInvestmentUniverse from '@taehyunComponents/Template/SaveInvestmentUniverse';
import { getColumns, getRows } from './TestTemplateData';
import Image from 'next/image';

const tableWrapper = css`
  border: 2px solid black;
  padding: 0 10px;
`;

const gaugeBarWrapper = css`
  width: 100%;
  border: 1px solid black;
  padding: 10px;
`;

const _rows = getRows();

const headerStyle = css`
  /* 헤더 컨테이너의 스타일 설정 */
  /* 이래는 예시 */
  /* margin-top: 20px; */
  /* padding-bottom: 20px; */
  /* height: 100px; */
  /* background-color: yellow; */
`;

const TestTemplate = (props) => {
  const [titles, setTitles] = useState<string[]>();
  const [columns, setColumns] = useState<TColumn[]>();
  const [rows, setRows] = useState<TRow[]>();

  const _columns = getColumns();

  const fetchInfinite = useCallback(async (page: number) => {
    try {
      const result = await axios(`http://10.10.1.4:4444/api/v1/temp/iu/list?cnt=${perPage}&page=${page}`);
      if (result.status === 200) {
        setRows((prev) => [...prev, ...result.data.contents]);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (!titles) return;
    const colData: TColumn[] = titles.map((title: string) => {
      const sortable = title !== 'Tags' && title !== 'Performance' ? true : false;
      let header = title;
      if (title.includes(' ')) header = title.replace(' ', '\n');
      if (title.includes('/')) header = title.replace('/', '/\n');
      return {
        field: title,
        headerName: header,
        sortable: sortable,
      };
    });
    setColumns(colData);
  }, [titles]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(`http://10.10.1.4:4444/api/v1/temp/iu/list?cnt=${perPage}&page=0`);
        console.log(result);
        if (result.status === 200) {
          setTitles(result.data.titles);
          setRows(result.data.contents);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    // mockdata이용
    // setColumns(_columns);
    // setRows(_rows);
  }, []);

  const { isOpen, openModal, closeModal } = useModal();

  const perPage = 5;
  return (
    <>
      <p>TaeHyun TestTemplate</p>
      <div css={tableWrapper}>
        {columns && rows && (
          <CustomTable
            columns={columns} //columns Data Array
            rows={rows} // Rows Data Array
            headerStyle={headerStyle} // 헤더 컨테이너의 스타일 설정
            rowHeight={50} //rowHeight를 지정 하고 싶다면
            selectable // Check Box Option
            perPage={perPage}
            fetchData={fetchInfinite} // infiniteScroll할때 필요
            infiniteScroll // infiniteScroll할때 필요
            actions={[
              {
                icon: <Image width={23} height={23} src={`/img/taehyun/bx-trash-alt.png`} alt="bx-trash-alt" />,
                tooltip: 'action1',
                onClick: () => console.log('action1'),
              },
            ]}
          />
        )}
      </div>
      <div css={gaugeBarWrapper}>
        <GaugeBar value={65.312312312} total={65.312312312 * 2} progressVisible visibleType="percentage" toFixed={3} />
      </div>
      <button onClick={openModal}>모달 열기</button>
      {isOpen && (
        <Modal closeModal={closeModal}>
          <SaveInvestmentUniverse closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
};

export default TestTemplate;
