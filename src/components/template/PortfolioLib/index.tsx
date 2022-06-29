import moment from "moment";
import {css} from "@emotion/react";
import {FaChevronCircleDown, FaChevronCircleUp} from "react-icons/fa";
import {useMemo, useState, useEffect} from "react";
import {useTable, useSortBy, useGlobalFilter} from "react-table";
import * as TextButton from "@components/atoms/TextButton";
import Buttonable from "@components/atoms/Buttonable";
import Collapsible, {useCollapsible} from "@components/molecules/Collapsible";
import MpStatusGaugeChart from "@components/organisms/MpStatusGaugeChart";
import FlowStatusBarChart from "@components/organisms/FlowStatusBarChart";
import AssetClassPieChart from "@components/organisms/AssetClassPieChart";
import TblPortfolioList, {useTblPortfolioListColumns} from "@components/organisms/TblPortfolioList";
import TableGlobalFilter from "@components/organisms/TableGlobalFilter";
import media, {isMedia, mediaWidths} from "@styles/media";
import * as Typography from "@styles/typography";
import {flexRow} from "@styles";
import {usePortfolioSelValue} from "@recoil/hooks/usePortfolioSel";
import Modals, {useModal} from "@components/organisms/PopupModals";
import {reqCreateAAModelPortfolio, reqListAAModelPortfolio} from "src/api/mp";
import {useLoadingCallback} from "src/lib/hooks/useLoadingCallback";
import {AAPortfolio, AAPortfolioStep} from "@interfaces/model";


const sectionWrap = css`
  margin-bottom: 44px;
  padding: 5px;
  
`;

const controlWrap = css`
  display: flex;
  height: 50px;
  margin-bottom: 8px;
  
  ${media.small} {
    height: auto;
  }

`;

const statusCardWrap = css`
  background-color: white;
  height: 300px;
  border: 1px solid black;
`;


export type PortfolioLibProps = {
}


export interface ConventionalAAPortfolio extends Omit <AAPortfolio, "process_step"> {
  gflow:{
    currentStep: number;
    currentStepStatus: boolean;
  }
}

const PortfolioLibTemplate = ({}:PortfolioLibProps) => {


  const portfolioSel = usePortfolioSelValue();
  const [data, setData] = useState< ConventionalAAPortfolio[] >([]);


  /**
   * fetchAAPortfolioData : AA 포트폴리오 리스트 정보 업데이트 action
   * */
  const {callback: fetchAAPortfoloData, isLoading} = useLoadingCallback(async()=>{
    const mps = await reqListAAModelPortfolio();
    setData(mps
      .map(i=>({
        name: i.name,
        gflow: {currentStep: AAPortfolioStep[i.process_step], currentStepStatus: false},
        created_at:  moment(i.created_time).format("YY/MMM/DD HH:mm:ss"),
        updated_at: moment(i.last_update).format("YY/MMM/DD HH:mm:ss"),
        id:i.id,
        note: i.note || "",
      }))
      .sort((a,b)=>{
        return (new Date(b.updated_at).getTime() -new Date(a.updated_at).getTime());
      })
    );

  },[]);


  /**
   * onClickDuplicate : 복제 버튼 action
   * */
  const {callback:onClickDuplicate, isLoading:isDuplicating} = useLoadingCallback( async ()=>{

    const sourcePortfolioName = data.find(d=> d.id === portfolioSel[0]).name;


    let cnt = 0;
    const _getDuplicateName = (data, newName) => {

      if(data.filter(d=>d.name === newName).length != 0){
        cnt ++;
        return _getDuplicateName(data,
            `Copy${(cnt>1)?cnt:""} of ${sourcePortfolioName}`
          );
      }
      else
        return `Copy${(cnt>1)?cnt:""} of ${sourcePortfolioName}`
    };

    const name = _getDuplicateName(data, sourcePortfolioName);

    await reqCreateAAModelPortfolio({name});
    fetchAAPortfoloData();

  },[portfolioSel, data]);

  useEffect(()=>{
    fetchAAPortfoloData();

  },[]);

  const updateComponentDatas = ()=>{
    /**
     * 컴포넌트가 종속하는 데이터를 모두 업데이트.
     * */
    setData([]);
    fetchAAPortfoloData();
  };


  const updateData = (rowIndex, columnId, value) => {

    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  };


  const {
    state: {globalFilter},
    setGlobalFilter,
    ...tableProps

  } = useTable(
    { columns: useTblPortfolioListColumns(),
      data,
      updateData },
    useGlobalFilter,
    useSortBy,
  );

  const {toggle, isOpen} = useCollapsible(true);

  const {modalOpen: modalOpenDeleteMp, openModal: openModalDeleteMp, closeModal: closeModalDeleteMp} = useModal();
  const {modalOpen: modalOpenCreateMp, openModal: openModalCreateMp, closeModal: closeModalCreateMp} = useModal();

  return (
    <>
      <Buttonable onClick={toggle}>
        <Typography.Subtitle1 css={css`display:inline-block; margin-right: 0.5rem;`}>
          Portfolio Status
        </Typography.Subtitle1>
        {isOpen && <FaChevronCircleUp css={css`margin-bottom:0.25rem;`} size={20}/>}
        {!isOpen && <FaChevronCircleDown css={css`margin-bottom:0.25rem;`}size={20}/>}
      </Buttonable>

      <Collapsible isOpen={isOpen} height={isMedia(mediaWidths.small)?350:950}>
        <div className={'row'} css={sectionWrap}>
          <div className={'col-md-4'} css={statusCardWrap}>
            <MpStatusGaugeChart data={data} isLoading={isLoading} containerCss={css`height:100%; width: 100%;`}/>
          </div>
          <div className={'col-md-4'} css={statusCardWrap}>
            <FlowStatusBarChart data={data} isLoading={isLoading} containerCss={css`height:100%; width: 100%; margin:auto;`} />
          </div>
          <div className={'col-md-4'} css={statusCardWrap}>
            {/*<AssetClassPieChart data={[]} isLoading={isLoading} containerCss={css`height:100%; width: 100%; margin:auto;`} />*/}
          </div>
        </div>
      </Collapsible>


      <Typography.Subtitle1>Portfolio List</Typography.Subtitle1>
      <div className={'row'} css={sectionWrap}>

        {/**
         * Portfolio List Control panel
         */}
        <div className='control' css={controlWrap}>
          <div css={css`flex:2;  padding: 1rem;`}>

            <div className='row'>
              <div className={'col-sm-8'}>
                <TableGlobalFilter filter={globalFilter} setFilter={setGlobalFilter} inputCss={css`border-radius: 5px;`}/>
              </div>

              <div className={'col-sm-4'} css={flexRow}>
                <TextButton.Small title={'Delete'}
                            onClick={openModalDeleteMp}
                            bgTheme={'common'}
                            disabled={!(portfolioSel.length)}
                />

                <TextButton.Small title={isDuplicating?'Duplicating..':'Duplicate'}
                            onClick={onClickDuplicate}
                            bgTheme={'primary'}
                            disabled={(portfolioSel.length !==1)}
                />
              </div>

            </div>

          </div>

          <div css={css`flex:1; display: flex; padding: 1rem; justify-content: flex-end;`}>
            <TextButton.Small title={'Create New Portfolio'}
                        onClick={openModalCreateMp}
                        bgTheme={'accent'}
            />
          </div>
        </div>

        <div css={css`margin: 5px; background-color:white; height: 400px; overflow-y:scroll;`}>
          <TblPortfolioList {...tableProps} loading={isLoading}/>
        </div>

        <Modals.ConfirmDeleteMP modalOpen={modalOpenDeleteMp}
                                closeModal={closeModalDeleteMp}
                                update={updateComponentDatas}
                                targetMpList={ data.filter(d=> portfolioSel.includes(d.id)) }
        />
        <Modals.CreateMP modalOpen={modalOpenCreateMp}
                         closeModal={closeModalCreateMp}
                         update={updateComponentDatas}
        />

      </div>
    </>

  );
};


export default PortfolioLibTemplate;
