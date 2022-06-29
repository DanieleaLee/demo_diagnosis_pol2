import {css, useTheme} from "@emotion/react";
import React, {useCallback, useState} from "react";
import MainHeader from "../../organisms/MainHeader/index";
import {MAIN_HEADER_HEIGHT} from "src/config/constants/index";
import { safeMarginTop } from "@styles";
import {useUserValue} from "@recoil/hooks/useUser";
import {GetServerSideProps, NextPage, NextPageContext} from "next";
import ColumnMilestonee from "@components/molecules/ColumnMilestone";
import RowMilestone from "@alvinComponents/molecules/RowMilestone";

    /**
     * Test Template 위 경로에서 각자 이름을 바꿔주면 됨
     *  "@alvinComponents/*": ["src/components/temp/alvin/*"],
     *  "@alvinComponents": ["src/components/temp/alvin"],
     *  "@lucianComponents/*": ["src/components/temp/lucian/*"],
     *  "@lucianComponents": ["src/components/temp/lucian"],
     *  "@taehyunComponents/*": ["src/components/temp/taehyun/*"],
     *  "@taehyunComponents": ["src/components/temp/taehyun"],
     */



    const mainContainerWrap = css`
        ${safeMarginTop(MAIN_HEADER_HEIGHT)}
        border: 1px solid black;
        margin-top: 100px;
        height: 650px;
    `;


    const tableContainerCss = css`
        border: 1px solid blue;
        width: 100%;
        height: 570px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `;

    const BTSContainerCss = css`
        border: 1px solid red;
        /* position: absolute;
        bottom: 0; */
        width: 100%;
        height: 46px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `;

    // [ 태현 ] Table에 쓰임
    const headerStyle = css`
    /* 헤더 컨테이너의 스타일 설정 */
    /* 이래는 예시 */
    /* margin-top: 20px; */
    /* padding-bottom: 20px; */
    /* height: 100px; */
    /* background-color: yellow; */
    `;

    const bottomContainerCss = css`
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100vw;
        z-index: 20;
        background-color: #b5dbff;
    `;


    const TestTemplate = (props)=>{

        const user = useUserValue();
        const [allSteps, setAllSteps] = useState(totalStepsList)


        function incrementCount() {
            const addIndex = allSteps.length%totalStepsList.length
            const newallSteps = [...allSteps, totalStepsList[addIndex]]
            // TABLE ROW INSERT TEST!
            setRows((prev) => [...prev, ...prev.slice(0,1)]);
            setAllSteps(newallSteps);
        }
        function decrementCount() {
            const newallSteps = [...allSteps].slice(0,-1)
            setAllSteps(newallSteps);
        }

        // [태현] Modal
        const { isOpen, openModal, closeModal } = useModal();
        const [ openedModal, setOpenedModal ] = useState('')

        const openModalHandler = (modalName)=>{
            setOpenedModal(modalName);
            openModal()
        }



        useEffect(() => {
            console.log('isOpen : ', isOpen)
          }, [isOpen]);

        // [태현] Table
        const [titles, setTitles] = useState<string[]>();
        const [columns, setColumns] = useState<TColumn[]>();
        const [rows, setRows] = useState<TRow[]>();

        // const fetchInfinite = useCallback(async (page: number) => {
        //     try {
        //         const result = await axios(`http://10.10.1.4:4444/api/v1/temp/iu/list?cnt=${perPage}&page=${page}`);
        //         if (result.status === 200) {
        //             setRows((prev) => [...prev, ...result.data.contents]);
        //         }
        //     } catch (err) {
        //         console.log(err);
        //     }
        // }, []);

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
            const fetchData = async (perPage) => {
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

            fetchData(10);
            // mockdata이용
            // setColumns(_columns);
            // setRows(_rows);
        }, []);


    return(
        <>

        {/* LEFT MUNU !!!  */}
        <div css={[css`top: 120px; left: 0px; position: absolute; /* border: 1px solid red; */`]}>
            <MpTitle
                mpTitle={'QRAFT All weather is very good'}
                memoContent={memoContent}
                tags={tagsDummy}
            />
            <ColumnMilestone totalStepsList={allSteps} currentStep={1} />
        </div>


        {/* RIGHT LOAD MENU */}
            <RightMenu {...props} />

            {/* INCREASING, TABLE, BUTTONS */}
            <div className={'container-md'} css={mainContainerWrap}>

                {/* INCREASING */}
                <button onClick={incrementCount}>+</button>
                <button onClick={decrementCount}>-</button>

                {/* [태현] TABLE */}
                <div css={tableContainerCss}>
                    {columns && rows && (
                        <CustomTable
                            columns={columns} //columns Data Array
                            rows={rows} // Rows Data Array
                            headerStyle={headerStyle} // 헤더 컨테이너의 스타일 설정
                            rowHeight={50} //rowHeight를 지정 하고 싶다면
                            selectable // Check Box Option
                            perPage={10}
                            // fetchData={fetchInfinite} // infiniteScroll할때 필요
                            // infiniteScroll // infiniteScroll할때 필요
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

                {/* BUTTONS */}
                <div css={BTSContainerCss}>
                    <div css={css`display: flex;`}>
                        <Button
                            width={107} height={46} borderCol={'#546A78'}
                            backCol={'#FFFFFF'} textCol={'#546A78'}
                            text={'Delete'} onClick={''}
                        />
                        <Button
                            width={107} height={46} borderCol={'#546A78'}
                            backCol={'#546A78'} textCol={'#fff'}
                            text={'+ Add'} onClick={()=>openModalHandler('addIU')}
                        />
                        {openedModal == 'addIU' && isOpen && (
                            <Modal closeModal={closeModal}>
                                <div css={css`
                                    display: flex;
                                    flex-direction: column;
                                    align-items: flex-start;
                                    justify-content: flex-start;
                                    width: 1579px;
                                    height: 656px;
                                    background-color: #ffffff;
                                    padding-top: 71px;
                                    padding-left: 108px;
                                `}>

                                <span>
                                    {/* 성재 Modal Filter */}
                                    <Filter />
                                    {columns && rows && (
                                        <CustomTable
                                            columns={columns} //columns Data Array
                                            rows={rows} // Rows Data Array
                                            headerStyle={headerStyle} // 헤더 컨테이너의 스타일 설정
                                            rowHeight={50} //rowHeight를 지정 하고 싶다면
                                            selectable // Check Box Option
                                            perPage={5}
                                            // fetchData={fetchInfinite} // infiniteScroll할때 필요
                                            // infiniteScroll // infiniteScroll할때 필요
                                            actions={[
                                            {
                                                icon: <Image width={23} height={23} src={`/img/taehyun/bx-trash-alt.png`} alt="bx-trash-alt" />,
                                                tooltip: 'action1',
                                                onClick: () => console.log('action1'),
                                            },
                                            ]}
                                        />
                                    )}
                                </span>

                                </div>
                            </Modal>
                        )}
                    </div>

                    <div css={css`display: flex;`}>
                        {/* [태현] SAVE INVESTMENT UNIVERSE MODAL BUTTON */}
                        <Button
                            width={306} height={46} borderCol={'#546A78'}
                            backCol={'#FFFFFF'} textCol={'#546A78'}
                            text={'Save Investment Universe'} onClick={()=>openModalHandler('saveIU')}
                        />
                        {openedModal == 'saveIU' && isOpen && (
                            <Modal closeModal={closeModal}>
                                <SaveInvestmentUniverse closeModal={closeModal} />
                            </Modal>
                        )}

                        <Button
                            width={107} height={46} borderCol={'#546A78'}
                            backCol={'#2E3B43'} textCol={'#fff'}
                            text={'Next'} onClick={''}
                        />
                    </div>

                </div>

            </div>

        {/* MINIMAP + TECHTREE */}
            <div css={[bottomContainerCss]}>
                <TechTree UniverseInfo={UniverseInfo}/>
            </div>

        </>
    );
};

    export default TestTemplate;