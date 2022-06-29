import {useEffect, useState} from "react";
import Buttonable from "@components/atoms/Buttonable";
import Input from "@components/atoms/Input";
import {ClipLoader} from "react-spinners";
import {FaRegEdit} from "react-icons/fa";
import {css, useTheme, Theme} from "@emotion/react";
import {BsExclamationCircleFill} from "react-icons/bs";
import {reqListAAModelPortfolio, reqUpdateAAModelPortfolio} from "src/api/mp";
import Colors from "@styles/colors";

const fixedWidth = css`
  display: inline-block;
  width: 300px;
`;


const errorMsgOnHover = css`
  &:hover{
    + div {
      display: inline-block;
    }
  }
`;

const errorMsgStyle = (theme:Theme)=>css`
  width:0px;
  height: 0px;
  display:none;
  
  & > div {
    position:relative;
    top: -30px;
    left: -100px;
    width: 180px;
    padding: 0.25rem;
    // background-color:${theme.colors.backgroundError};
    background-color:white;
    color: ${theme.colors.error};
    font-weight: bold;
  }
`;

const fieldNoneEditStyle = css`
  &:hover{
    border: 1px solid ${Colors.borderPrimary};
    border-radius: 5px;
    
    & div{
      display:inline-flex;
    }
  }
  
  & div {
    width:0;
    height:0;
    display:none;
  }
  
  & div span {
    position:relative; 
    top:-20px; 
    left: -130px; 
    white-space:nowrap;
    width:100%;
  }
`;


/**
 *
 * 재활용 가능하게 하기 위해선 리팩터링 필요..
 *
 * */
const TblEditableField = ({
                        value: initialValue,
                        row: { index, original:{id:pid} },
                        column: { id },
                        updateData,
                      }) => {
  const theme = useTheme();

  const [edit, setEdit] = useState<boolean>(false);
  const [value, setValue] = useState(initialValue);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);


  useEffect(() => {
    setValue(initialValue)
  }, [initialValue]);

  return(
    <>

      {/**
        Loading Clip Loader
       */}
      {isRefreshing &&
      <div css={[fixedWidth, css`text-align: center;`]}>
        <span css={css`color: ${theme.colors.hint}; float: left; line-height: 40px;`}>
          {value}
        </span>
        <div css={css`position:relative; width:0px; height:0px; top:5px; right: 0px;`} >
          <ClipLoader loading={true} size={25} />
        </div>
      </div>
      }

      {/**
       비입력 모드
       */}
      {!isRefreshing && !edit &&
        <div css={ [css`display: inline;`, (value.length>30 && fieldNoneEditStyle)] } >
          <span css={fixedWidth}>
            {(value.length>30)?(`${value.substr(0, 20)}...`):value}
          </span>
          {(value.length>30) &&
            <div>
              <span>
                {value}
              </span>
            </div>
          }
        </div>
      }


      {/**
       입력 모드
       */}
      {!isRefreshing && edit &&
      <>
        <Input
          className={'editInput'}
          containerCss={css`${fixedWidth} ${errorMsgOnHover}`}
          css={css`height: auto;`}
          error={error}
          onClick={(e)=>{
            e.stopPropagation();
          }}
          onBlur={(e)=>{

            if(e.relatedTarget?.classList.contains('edit')){
              // updateData(index, id, value);
            }else{
              setValue(initialValue);  // 다른데 클릭.
              setEdit(false);
            }
          }}
          onChange={(e)=>{
            if(error)
              setError(false);
            setValue(e.target.value);
          }}
          value={value}
        />

        {/**
          hover 에러 풍선
         */}
        {error &&
          <div css={errorMsgStyle}>
            <div>
              <BsExclamationCircleFill size={15} color={theme.colors.error} css={css`margin-right: 0.25rem;`}/>
              name duplicated
            </div>
          </div>
        }
      </>
      }


      <span css={css`padding: 0.25rem;}`}>
        <Buttonable className={'edit'} onClick={async (e)=>{

          // 입력모드인 상태에서 클릭.
          if(edit){

            const valueChanged = (value !== initialValue);

            if (valueChanged){  // 필드(포트폴리오이름)이 바뀐 경우..
              setIsRefreshing(true);

              const mps = await reqListAAModelPortfolio();
              const exists = mps.map(m=>m.name).includes(value);

              if (exists){  // 바뀐 포트폴리오 이름이 존재하는 경우..
                setError(true);
              }
              else {  // 정상..
                await reqUpdateAAModelPortfolio({id:pid, name:value});
                updateData(value);
                setEdit(false);
              }

              setIsRefreshing(false);
            }
            else { // 필드갑이 그대로인 경우 입력모드 off
              setEdit(false);
            }


          }
          else{  // 비입력모드 -> 입력모드
            setEdit(true);
          }
          e.stopPropagation(); // Accordion 이벤트 방지.
        }}
        onBlur={(e)=>{ // 입력창 클릭이 아니면 입력모드 해제.
          if(!e.relatedTarget?.classList.contains('editInput')){
            setEdit(false);
          }
        }}
        >
          <FaRegEdit css={css`margin-bottom: 4px;  &:hover{box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.7);} }`} size={15}/>
        </Buttonable>
      </span>
    </>);

};

export default TblEditableField;