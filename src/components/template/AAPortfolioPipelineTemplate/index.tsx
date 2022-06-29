import RightMenu from '@alvinComponents/molecules/RightMenu';
import AAPipelineNav, { NAV_WIDTH } from '@components/organisms/AAPipelineNav';
import { css } from '@emotion/react';
import { useState, useMemo, useEffect } from 'react';
import TechTree, { TECHTREE_HEIGHT } from '@components/molecules/TechTree';
import { useTable, useSortBy } from 'react-table';
import React from 'react';
import TblIndexList, { useTblIndexListColumns } from '@components/organisms/TblIndexList';
import { useLoadingCallback } from 'src/lib/hooks/useLoadingCallback';
import { reqListAAIndexByCodes } from 'src/api/mp';
import Drawers, { useDrawer } from '@components/organisms/Drawers';
import * as TextButton from '@components/atoms/TextButton';
import ConfirmDeleteIndexSet from '@components/organisms/PopupModals/ConfirmDeleteIndexSet';
import { useModal } from '@components/organisms/PopupModals';
import AddIU from '@components/organisms/PopupModals/AddIU';
import { flexRow } from '@styles';

import ModelSelectionTemplate from '@components/template/ModelSelectionTemplate';
import ModelConfigTemplate from '@components/template/ModelConfigTemplate';
import { modelData } from '@components/template/ModelSelectionTemplate/mockData';

const UniverseInfo = {
  title: 'Investment Universe',
  label: ['Number of Index', 4],
  assetClass: {
    Equity: 10,
    'Fixled Income': 20,
    Commodity: 10,
  },
  economicDev: {
    'Blended Development': 60,
    'Developed Markets': 20,
    'Emerging Markets': 10,
    'Frintier Markets': 10,
  },
};

export type AAPortfolioPipelinePageProps = {
  portfolioName: string;
  initialStep: string;
};

const AAPortfolioPipelineTemplate = ({ portfolioName, initialStep, ...props }) => {
  const [step, setStep] = useState(1);
  const [showTechtree, setShowTechtree] = useState(true);
  const [data, setData] = useState<Array<any>>([]);

  const [isReset, setIsReset] = useState(false);

  const { callback: fetchAAIndexByCodes, isLoading } = useLoadingCallback(async () => {
    const indices = await reqListAAIndexByCodes({ codes: ['SBBRUSL', 'SP5EIND', 'GSGCTOT'] });

    if (Array.isArray(indices)) setData(indices);
    else console.error('Error loading index.');
  }, []);

  useEffect(() => {
    fetchAAIndexByCodes();
  }, []);

  const BodyContainerWrap = useMemo(
    () => css`
      margin-left: ${NAV_WIDTH};
      ${showTechtree && `margin-bottom: ${TECHTREE_HEIGHT};`}
      padding: 0 2rem;

      /* ${step !== 2 && `padding: 0 2rem;`} */
    height: 100%;
    `,
    [showTechtree, step]
  );

  console.log('use, data', useTblIndexListColumns(), data);
  const { state, ...tableProps } = useTable({ columns: useTblIndexListColumns(), data }, useSortBy);

  const { modalOpen: modalOpenDeleteIdx, openModal: openModalDeleteIdx, closeModal: closeModalDeleteIdx } = useModal();
  const { modalOpen: modalOpenAddIU, openModal: openModalAddIU, closeModal: closeModalAddIU } = useModal();

  return (
    <>
      <AAPipelineNav portfolioName={portfolioName} step={step} />

      <div css={BodyContainerWrap}>
        {step == 1 && (
          <>
            <TblIndexList {...tableProps} loading={isLoading} />

            <div
              css={css`
                display: flex;
                margin-top: 20px;
              `}
            >
              <div
                css={css`
                  flex: 2;
                  ${flexRow}
                `}
              >
                <TextButton.Small title={'Delete'} onClick={openModalDeleteIdx} bgTheme={'common'} disabled={false} />

                <TextButton.Small title={'+ Add'} onClick={openModalAddIU} bgTheme={'primary'} disabled={false} />
              </div>
              <div
                css={css`
                  display: flex;
                  flex: 1;
                  justify-content: flex-end;
                `}
              >
                <TextButton.Small
                  title={'Save Investment Universe'}
                  onClick={() => {}}
                  bgTheme={'common'}
                  disabled={false}
                />

                <TextButton.Small
                  title={'Next'}
                  onClick={() => setStep((prev) => prev + 1)}
                  bgTheme={'accent'}
                  disabled={false}
                />
              </div>
            </div>

            <ConfirmDeleteIndexSet
              modalOpen={modalOpenDeleteIdx}
              closeModal={closeModalDeleteIdx}
              // targetIndexList={[]}
              update={() => {}}
            />
            <AddIU modalOpen={modalOpenAddIU} closeModal={closeModalAddIU} update={() => {}} />
          </>
        )}
        {step == 2 && <ModelSelectionTemplate modelData={modelData} setStep={setStep} onSubmit={() => {}} />}
        {step == 3 && <ModelConfigTemplate setStep={setStep} />}

        <Drawers.IndexsetLoadDrawer {...useDrawer()} update={() => {}} width={850} />
      </div>

      {showTechtree && <TechTree UniverseInfo={UniverseInfo} step={step} />}
    </>
  );
};

export default AAPortfolioPipelineTemplate;
