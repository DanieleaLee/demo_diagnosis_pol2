import BaseModal, {BaseModalProps} from "./Base";
import * as Typography from "@styles/typography";
import {css} from "@emotion/react";
import {BiTrashAlt} from "react-icons/bi";
import {flexRowBetween} from "@styles";
import TextButton, {buttonAccent2, buttonPrimary2Contrast} from "@components/atoms/TextButton";
import {reqDeleteAAModelPortfolios} from "src/api/mp";
import {useLoadingCallback} from "src/lib/hooks/useLoadingCallback";
import {ConventionalAAPortfolio} from "@components/template/PortfolioLib";
import {usePortfolioSel, usePortfolioSelValue} from "@recoil/hooks/usePortfolioSel";



const modalWrap = css`
  min-width: 500px;
  padding: 50px;
  text-align: center;
`;


const buttonGroupWrap = css`
  margin-top: 3rem;
  padding: 0 3em;
  ${flexRowBetween}
  
  & > button {
    padding: 0 2.5rem;
    padding-left: 2.5rem;
  }
`;

export interface ConfirmDeleteMpProps extends Omit<BaseModalProps, "children"> {
  targetMpList: Array<ConventionalAAPortfolio>;
  update: () => void;
}


const ConfirmDeleteMP = ({modalOpen, closeModal, targetMpList, update}:ConfirmDeleteMpProps)=>{

  const {setPortfolioSel} = usePortfolioSel();

  const {callback:onClickConfirm, isLoading} = useLoadingCallback( async ()=>{
    await reqDeleteAAModelPortfolios({pids: targetMpList.map(mp=>(mp.id as any) )});
    setPortfolioSel([]);
    update();
    closeModal();

  },[update, closeModal, targetMpList]);


  return(
    <BaseModal modalOpen={modalOpen} closeModal={closeModal} containerCss={modalWrap}>
      <div>
        <Typography.Headline4>
          <BiTrashAlt css={css`margin-bottom: 0.5rem; margin-right: 0.25rem;`}/>
          Delete you Model Portfolio
        </Typography.Headline4>

        <Typography.Subtitle3>
          Are you sure you want to delete this Portfolio?
        </Typography.Subtitle3>
        <ul>
          {targetMpList.map((mp,k)=>(
            <li key={k}>{mp.name}</li>
          ))}
        </ul>
      </div>

      <div css={buttonGroupWrap}>
        <TextButton title={'Cancel'} fontSize={'1.25rem'} color={'white'} containerCss={buttonAccent2} onClick={closeModal}/>
        <TextButton title={isLoading?'Deleting...':'Delete'} fontSize={'1.25rem'} containerCss={buttonPrimary2Contrast} onClick={onClickConfirm}/>
      </div>
    </BaseModal>)
};

export default ConfirmDeleteMP

