import BaseModal, {BaseModalProps} from "./Base";
import * as Typography from "@styles/typography";
import {css} from "@emotion/react";
import {RiFlaskLine} from "react-icons/ri"
import {flexRowBetween} from "@styles";
import TextButton, {buttonAccent2, buttonPrimary2, buttonPrimary2Contrast} from "@components/atoms/TextButton";
import InputGroup from "@components/molecules/InputGroup";
import {createPortfolioYup} from "src/config/yup";
import useYupValidation from "src/lib/hooks/useYupValidation";
import {useLoadingCallback} from "src/lib/hooks/useLoadingCallback";
import Submit from "@components/atoms/Submit";
import * as yup from "yup";
import {useEffect} from "react";
import {reqCreateAAModelPortfolio} from "src/api/mp";


const modalWrap = css`
  min-width: 500px;
  padding: 50px;
  text-align: center;
`;


const formGroup = css`
  margin-top: 2rem;
`;

const buttonGroupWrap = css`
  margin-top: 50px;
  padding: 0 3em;
  ${flexRowBetween}
  
  & > button {
    padding: 0 2.5rem;
    padding-left: 2.5rem;
  }
`;


export interface CreateMpProps extends Omit<BaseModalProps, "children"> {
  update: () => void;
}

export type NewModelPortfolioData = {
  name: string | any;
}

const createPortfolioValidationSchema : yup.SchemaOf<NewModelPortfolioData> = yup.object({
  name: createPortfolioYup,
});


const CreateMp = ({modalOpen, closeModal, update}:CreateMpProps)=>{

  const {
    clearErrors,
    setFocus,
    setValue,
    formState: {errors},
    handleSubmit,
    register
  } = useYupValidation<NewModelPortfolioData>(
    createPortfolioValidationSchema,
    {name:'dd'},
    {reValidateMode:"onSubmit"});

  const {callback, isLoading} = useLoadingCallback(async({name:portfolioName}: NewModelPortfolioData)=>{
    await reqCreateAAModelPortfolio({name:portfolioName});
    update();
    closeModal();

  },[]);

  useEffect(()=>{
    /**
     * Modal 닫았다가 다시 열었을때 에러메세지 리셋.
     * */
    setValue('name',"");
    clearErrors();

    if(modalOpen)
      setFocus('name')

  },[modalOpen]);

  return(
    <BaseModal modalOpen={modalOpen} closeModal={closeModal} containerCss={modalWrap}>
      <div>
        <Typography.Headline4>
          <RiFlaskLine css={css`margin-bottom: 0.5rem; margin-right: 0.25rem;`}/>
          {"Let's Generate a Model Portfolio"}
        </Typography.Headline4>

        <Typography.Subtitle3>
          Shall we make an awesome Portfolio for your lovely client?
        </Typography.Subtitle3>
      </div>

      <div css={formGroup}>
        <form onSubmit={handleSubmit(callback)}>
          {errors.name && <div><span css={css`float:right; color:red;`}>{errors.name.message || 'create MP Failed'}</span></div>}
          <InputGroup placeholder={'Portfolio Name'} {...register('name')}/>

          <div css={buttonGroupWrap}>
            <TextButton title={'Cancel'} fontSize={'1.25rem'} containerCss={buttonPrimary2Contrast} onClick={closeModal} disabled={!!errors.name}/>
            <Submit value={'Start'} loading={isLoading} containerCss={buttonPrimary2}/>
          </div>

        </form>
      </div>
    </BaseModal>)
};

export default CreateMp

