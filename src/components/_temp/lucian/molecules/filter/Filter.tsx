import React, { useState } from "react";
import FilterTemplate from "./filterContainer/FilterTemplate";
import fakeData from "@lucianComponents/molecules/filter/db.json";
import FilterBox from "./filterContainer/filterBox/FilterBox";
import FilterResultBox from "./filterContainer/filterResultBox/FilterResultBox";
import { FilteredWrap } from "./filterContainer/filterTemplateStyle";
import { Container } from "./filterStyle";
import axios from "axios";
import SearchBarWithFilterButton from "./searchbar/SearchBar";

/**
    allCheckedItems : Category 갯수만큼 배열을 만들고 각각의 배열에 해당하는 카테고리의 체크박스들을 담아주는 State
    openFilterContainer : Searchbox에서 필터 버튼 클릭 시 열리는 filter container open 여부를 결정하는 State
    inputVal : 검색창에 입력된 값을 가져오는 State
**/

const Filter = () => {
  const [allCheckedItems, setAllCheckedItems] = useState<Array<string[]>>(
    new Array(fakeData.length).fill([])
  );
  const [openFilterContainer, setOpenFilterContainer] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [inputVal, setInputVal] = useState("");

  // Search bar에 input한 텍스트값 추가 핸들러
  const addInputValHandler = (text: string) => {
    setInputVal(text);
  };

  // Input한 Text값을 clear해주는 핸들러
  const clearInputValHandler = () => {
    setInputVal("");
  };

  // 특정 카테고리에 해당하는 체크된 아이템들을 초기화 시켜주는 핸들러
  const clearFiltersHandler = (id: number) => {
    // Apply 전 필터링된 카테고리들은 삭제가되고 Apply 후 필터링된 카테고리들은 삭제가 되지않도록 하는 Logic
    if (!showCategories) {
      setAllCheckedItems((prev) => {
        const temp = [...prev];
        temp[id] = [];
        return temp;
      });
    }
  };

  // Apply 버튼 클릭 시, Filter Category list display 컨트롤 핸들러
  const changeCheckedItemsState = (idx: number, checkedArr: Array<string>) => {
    // 해당 카테고리에 해당하는 체크된 아이템들을 넣어주는 logic
    setAllCheckedItems((prev) => {
      const temp = [...prev];
      temp[idx] = checkedArr;
      return temp;
    });
  };

  // 3가지 params를 추가하여 api post call 보내는 logic
  const commonApiCallWithParams = async () => {
    let params = new URLSearchParams();
    params.append("inputVal", inputVal);
    params.append("allCheckedItems", JSON.stringify(allCheckedItems));
    params.append("isSorted", "true");

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

  // Apply 버튼 클릭 후 적용된 필터 정보 handler
  const sendDataByPressingApplyBtn = () => {
    commonApiCallWithParams();
    setShowCategories(true);
  };

  // Container 열렸을 경우 검색 버튼을 눌렀을 때는 필터 정보를 전송하지 않는다.
  const sendDataByPressingSearchBtn = () => {
    if (openFilterContainer === false || showCategories === true) {
      setShowCategories(true);
      commonApiCallWithParams();
    }
  };

  // Search bar Enter click  => Api call send handler
  const sendDataPressingEnterKey = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (inputVal !== "" && event.code === "Enter") {
      if (openFilterContainer === false || showCategories === true) {
        setShowCategories(true);
        addInputValHandler(inputVal);
        commonApiCallWithParams();
      }
    }
  };

  // Filter Container open control handler
  const openFilterContainerHandler = () => {
    if (!showCategories) {
      setOpenFilterContainer(!openFilterContainer);
    }
    setShowCategories(false);
  };

  // Filter Category Data
  const filterData = fakeData.map((el, idx) => (
    <FilterBox
      id={idx}
      key={el.id}
      data={el.list}
      title={el.title}
      changeCheckedItemsState={changeCheckedItemsState}
      clearFiltersHandler={clearFiltersHandler}
      checkedItems={allCheckedItems[idx]}
    />
  ));

  // Filtered & checked category list
  const filtersResult = allCheckedItems.map(
    (el, idx) =>
      // 선택된 체크박스가 1개 이상일 경우만 보여준다.
      el.length > 0 && (
        <FilteredWrap key={idx}>
          <FilterResultBox
            checkedElements={el}
            id={idx}
            title={fakeData[idx].title}
            showCategories={showCategories}
            clearFiltersHandler={clearFiltersHandler}
          />
        </FilteredWrap>
      )
  );

  return (
    <Container>
      {/* Search bar 전체 컴포넌트 */}
      <SearchBarWithFilterButton
        // width 조정
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
      {/* Filter Button을 누른 후 열렸을 떄 나오는 카테고리 리스트 및 필터된 리스트를 포함하고 있는 컴포넌트 */}
      {openFilterContainer && (
        <FilterTemplate
          // width 조정
          // width={1600}
          showCategories={showCategories}
          filterData={filterData}
          filtersResult={filtersResult}
          sendDataByPressingApplyBtn={sendDataByPressingApplyBtn}
        />
      )}
    </Container>
  );
};

export default Filter;
