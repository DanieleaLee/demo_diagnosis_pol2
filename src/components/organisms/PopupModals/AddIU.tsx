import BaseModal, {BaseModalProps} from "./Base";
import * as Typography from "@styles/typography";
import {css} from "@emotion/react";
import {BiTrashAlt} from "react-icons/bi";
import {flexRowBetween} from "@styles";
import TextButton, {buttonAccent2, buttonPrimary2Contrast} from "@components/atoms/TextButton";
import {reqDeleteAAModelPortfolios, reqListAAIndexByCodes} from "src/api/mp";
import {useLoadingCallback} from "src/lib/hooks/useLoadingCallback";
import {ConventionalAAPortfolio} from "@components/template/PortfolioLib";
import TblIndexList, {useTblIndexListColumns} from "@components/organisms/TblIndexList";
import React, {useState} from "react";
// import {usePortfolioSel, usePortfolioSelValue} from "@recoil/hooks/usePortfolioSel";
import {useTable, useSortBy} from "react-table";
import {useEffect} from "react";



const modalWrap = css`
  min-width: 500px;
  width: 80vw;
  padding: 50px;
  text-align: center;
`;


const buttonGroupWrap = css`
  margin-top: 3rem;
  padding: 0 3em;
  display: flex;
  justify-content:flex-end;
  
  & > button {
    padding: 0 2.5rem;
    padding-left: 2.5rem;
  }
`;

export interface ConfirmAddIUProps extends Omit<BaseModalProps, "children"> {
  update: () => void;
}


const AddIU = ({modalOpen, closeModal, update}:ConfirmAddIUProps)=>{



  const [data, setData] = useState< any >([]);

  const {
    state,
    ...tableProps
  } = useTable(
    {columns: useTblIndexListColumns(),
      data,
    },
    useSortBy,
  );

  useEffect(()=>{
    setData([]);
    fetchAAIndexByCodes();

  },[modalOpen]);

  const {callback:onClickConfirm, _} = useLoadingCallback( async ()=>{
    update();
    closeModal();

  },[update, closeModal]);

  const {callback: fetchAAIndexByCodes, isLoading} = useLoadingCallback(async () => {
    const indices = await reqListAAIndexByCodes({codes:["SBBRUSL", "SP5EIND", "GSGCTOT"]});

    setData(indices);

  }, []);

  return(
    <BaseModal modalOpen={modalOpen} closeModal={closeModal} containerCss={modalWrap}>
      <div>
        <TblIndexList {...tableProps} loading={isLoading}/>
      </div>

      <div css={buttonGroupWrap}>
        <TextButton title={'Add'} fontSize={'1.25rem'} color={'white'} containerCss={buttonAccent2} onClick={closeModal}/>
        <TextButton title={'Close'} fontSize={'1.25rem'} containerCss={buttonPrimary2Contrast} onClick={closeModal}/>
      </div>
    </BaseModal>);
};

export default AddIU;