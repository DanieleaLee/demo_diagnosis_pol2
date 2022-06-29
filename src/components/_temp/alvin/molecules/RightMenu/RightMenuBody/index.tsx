import {css} from "@emotion/react";
import Colors from "@styles/colors";
import React, {useCallback, useState, useRef, useEffect} from "react";
import TabButtons from "@alvinComponents/molecules/RightMenu/TabButtons";
import { AiOutlineConsoleSql } from "react-icons/ai";
import SearchBarWithFilterButton from "@alvinComponents/molecules/filter/searchbar/SearchBar";
import Button from "@alvinComponents/atoms/buttons";
import fakeData from "@alvinComponents/molecules/filter/db.json";
import axios from "axios";

const RightMenuBodyCss = (width, minHeight)=>css`
    width: ${width}px;
    height: calc(100vh - 100px); // 브라우저 높이에 따라감
    min-height: ${minHeight}px; // 브라우저 높이 줄어들어도 height 값 보장
    background: ${Colors.backgroundPrimary1};
    border-radius: 8px 0px 0px 8px;
    padding-top: 33px; padding-bottom: 44px; padding-left: 41px;padding-right: 41px; position: relative;
`

const RightMenuBodyLayoutCss = css`
    width: 100%; height: 100%; display: inline-block;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`
const tabButtonWrapCss = css`
    width: 579px;
`
const SearchBarWrapCss = css`
    width: 100%;
    margin-top: 32px;
`

const TableWrapCss = css`
    width: 100%;
    height: 258px;
    margin-top: 16px;
    background-color: #fff;
    border: 1px solid #ECECEC;
    box-sizing: border-box;
    border-radius: 8px;
    text-align: center;
`

const DescTitleCss = css`
    margin-top: 13px;
    width: 100%;
    text-align: left;
    font-weight: 500;
    font-size: 15px;
    color: #9DA6AD;
`

const DescWrapCss = css`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 9px;
    text-align: center;
`

const DescTableWrapCss = css`
    width: 445px;
    height: 258px;
    background: #FFFFFF;
    border: 1px solid #ECECEC;
    box-sizing: border-box;
    border-radius: 8px;
`

const DescInfoWrapCss = css`
    width: 326px;
    height: 258px;
    background: #FFFFFF;
    border: 1px solid #ECECEC;
    box-sizing: border-box;
    border-radius: 8px;
`

const ButtonWrapCss = css`
    width: 100%;
    position: absolute;
    bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const menuList = ["My", "Qraft", "Market"]

const RightMenuBody = ({width, minHeight, onClick}) => {
    const [selectedTabMenu, setSelectedTabMenu] = useState(menuList[0]);
    const [loadTable, setLoadTable] = useState(null)
    const [loadDescription, setLoadDescription] = useState(null)
    const [loadInfo, setloadInfo] = useState(null)
    // const [selectedMenu, setSelectedMenu] = useState(menuList[0]);

    const getIUtable = async(selectedTabMenu)=>{
        selectedTabMenu == 'My'? '1' : '0'
        const res = await axios.get('http://10.10.1.4:4444/api/v1/temp/iu/list?cnt=5&page=0')
        const result = [...res.data.contents].slice(0,3)
        setLoadTable(result)
        console.log('setLoadTable 변경!')
    }   

    const getIUdesc = async(selectedTabMenu)=>{
        const res = await axios.get('http://10.10.1.4:4444/api/v1/temp/iu/list?cnt=5&page=0')
        const result = [...res.data.contents].slice(0,1)
        setLoadDescription(prev => prev ? '' : result)
        console.log('setLoadDescription 변경!')
    }

    const getIUinfo = async(selectedTabMenu)=>{
        const res = await axios.get('http://10.10.1.4:4444/api/v1/temp/iu/list?cnt=5&page=0')
        const result = [...res.data.contents].slice(0,1)
        setloadInfo(prev => prev ? '' : result)
        console.log('setloadInfo 변경!')
    }

    useEffect(() => {
        console.log('TAB 메뉴 변경!!!! : ', selectedTabMenu)
        getIUtable(selectedTabMenu)
        setLoadDescription('')
        setloadInfo('')
    }, [selectedTabMenu]);

    const tabChecking = (e, ts)=>{
        e.preventDefault();
        setSelectedTabMenu(ts)
    }


    // SEARCH BAR
    const [allCheckedItems, setAllCheckedItems] = useState<Array<string[]>>(
        new Array(fakeData.length).fill([])
    );
    const [openFilterContainer, setOpenFilterContainer] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [inputVal, setInputVal] = useState("");


    // 3가지 params를 추가하여 api post call 보내는 logic
    const commonApiCallWithParams = async () => {
        let params = new URLSearchParams();
        params.append("inputVal", inputVal);
        params.append("allCheckedItems", JSON.stringify(allCheckedItems));
        params.append("isSorted", "true");
        console.log('api call!')
        try {
            const response = await axios.post("http://localhost:3000", null, {
                params,
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                }
        });
        } catch (error) {
            console.error(error.message);
        }
    };

    
    // Search bar에 input한 텍스트값 추가 핸들러
    const addInputValHandler = (text: string) => {
        setInputVal(text);
    };

    // Container 열렸을 경우 검색 버튼을 눌렀을 때는 필터 정보를 전송하지 않는다.
    const sendDataByPressingSearchBtn = () => {
        console.log('search click!')
        if (openFilterContainer === false || showCategories === true) {
            setShowCategories(true);
            commonApiCallWithParams();
        }
    };

    // Search bar Enter click  => Api call send handler
    const sendDataPressingEnterKey = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        console.log('search enter!')
        if (inputVal !== "" && event.code === "Enter") {
            if (openFilterContainer === false || showCategories === true) {
                setShowCategories(true);
                addInputValHandler(inputVal);
                commonApiCallWithParams();
            }
        }
    };

    // Input한 Text값을 clear해주는 핸들러
    const clearInputValHandler = () => {
        setInputVal("");
        };

        // Filter Container open control handler
    const openFilterContainerHandler = () => {
        if (!showCategories) {
        setOpenFilterContainer(!openFilterContainer);
        }
        setShowCategories(false);
    };

    return (
        <div css={[RightMenuBodyCss(width, minHeight)]}>
            <div css={[RightMenuBodyLayoutCss]}>
                <div css={[tabButtonWrapCss]}>
                    <TabButtons menuList={menuList} selectedMenu={selectedTabMenu} onClick={tabChecking} />
                </div>
                <div css={[SearchBarWrapCss]}>
                    <SearchBarWithFilterButton
                            sendDataByPressingSearchBtn={sendDataByPressingSearchBtn}
                            sendDataPressingEnterKey={sendDataPressingEnterKey}
                            addInputValHandler={addInputValHandler}
                            showCategories={showCategories}
                            openFilterContainer={openFilterContainer}
                            clearInputValHandler={clearInputValHandler}
                            openFilterContainerHandler={openFilterContainerHandler}
                            inputVal={inputVal}
                            setInputVal={setInputVal}
                    />
                </div>
                <div css={[TableWrapCss]}>
                    {loadTable && loadTable.map((ts,k)=>{
                        return(<span key={k}>{JSON.stringify(ts)}</span>)
                    })}
                </div>
                <p css={[DescTitleCss]}>Description</p>
                <div css={[DescWrapCss]}>
                    <div css={[DescTableWrapCss]} onClick={getIUdesc}>
                        {loadDescription && loadDescription.map((ts,k)=>{
                            return(<span key={k}>{JSON.stringify(ts)}</span>)
                        })}
                    </div>
                    <div css={[DescInfoWrapCss]} onClick={getIUinfo}>
                        {loadInfo && loadInfo.map((ts,k)=>{
                            return(<span key={k}>{JSON.stringify(ts)}</span>)
                        })}
                    </div>
                </div>
                <div css={[ButtonWrapCss]}>
                    <Button 
                        width={248}
                        height={46}
                        borderCol={'#546A78'}
                        backCol={'#546A78'}
                        textCol={'#fff'}
                        text={'Add to Basket'}
                        onClick={onClick}
                    />
                    </div>
            </div>
        </div>
    )
}

export default RightMenuBody