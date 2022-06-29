import React, { useState, useEffect, useRef } from "react";
import { BiCaretDown, BiSearchAlt2 } from "react-icons/bi";
import { css } from "@emotion/react";
import * as Typography from "@styles/typography";
import Colors from "@styles/colors";
import { flexCenter, flexColumn } from "@styles";

const PfDgDropdownContainerCss = css`
  height: auto;
  flex-direction: column;
  position: relative;
`;

const PfDgDropdownTitle = (selectedOneCondition: boolean) => css`
  width:100%
  height: 26px;
  padding: 4px 9px 5px 13px;
  background: ${
    selectedOneCondition ? Colors.backgroundWhite : Colors.filterTagContainerBg
  };
  border-radius: 12px;
  display: inline-flex;
  cursor: pointer;
`;

const PfDgDropdownSelectedNumberCss = css`
  border-radius: 12px;
  background: ${Colors.buttonSubmit};
  height: 16px;
  padding: 3px 9px;
  margin: 1px 6px 0 6px;
  ${flexCenter}
`;

const PfDgDropdownContents = css`
  position: absolute;
  top: 28px;
  z-index: 999;
  width: 180px;
  height: auto;
  background: ${Colors.backgroundWhite};
  border: 0.5px solid ${Colors.hint};
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  margin-top: 8px;
`;

const PfDgDropdownSearchBoxCss = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 0.3px solid ${Colors.hint};
  padding: 6px 0;

  input {
    width: 134px;
    outline: none;
    border: none;
    padding-left: 7.96px;
    font-size: 12px;

    &::placeholder {
      font-family: "Inter";
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      letter-spacing: -0.03em;
      color: ${Colors.primary4};
    }
  }
`;

const PfDgDropdownCheckboxWrapCss = css`
  padding: 9px 0 0 0;
  ${flexColumn};
`;

const PfDgDropdownCheckboxInnerCss = css`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  max-height: 135px;
  margin: 0 17px 8px 0;
  padding: 0;

  &::-webkit-scrollbar {
    background: ${Colors.button3DisabledText};
    border-radius: 1.5px;
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 1.5px;
    background: ${Colors.buttonSubmit};
  }
`;

const PfDgDropdownNoElementTxtCss = css`
  padding-left: 10px;
`;

const PfDgDropdownCheckboxListCss = css`
  width: 100%;
  padding: 5px 0 5px 20px;

  &:hover {
    background: rgba(196, 196, 196, 0.15);
    color: ${Colors.primary4};
    font-weight: 500;
  }

  &.clicked {
    background: rgba(196, 196, 196, 0.15);
    color: ${Colors.primary4};
    font-weight: 500;
  }
`;

const PfDgDropdownCheckboxLabelCss = css`
  font-size: 10px;
  font-weight: 400;
  line-height: 12px;
  color: ${Colors.primary4};
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const PfDgDropdownCheckboxInputCss = css`
  width: 13px;
  height: 13px;
  background: #fff;
  border: 1px solid ${Colors.borderPrimary};
  border-radius: 2px;
  flex-shrink: 0;
  cursor: pointer;
  -webkit-appearance: none;
  margin-right: 10px;

  &:checked[type="checkbox"],
  &:checked[type="radio"] {
    width: 13px;
    height: 13px;
    background-color: transparent;
    background: url("/img/lucian/checked.png") no-repeat center;
    background-size: 200%;
  }
`;

const PfDgDropdownClearCss = css`
  width: 100%;
  border-top: 0.3px solid ${Colors.selectBoxBorder};
  padding: 4px 0 6px 10px;
  cursor: pointer;
`;

interface Props {
  type: "checkbox" | "radio";
  radioData?: Array<{ id: number; name: string }>;
  checkboxData?: Array<{ id: number; name: string }>;
}

type CheckboxType = {
  name: string;
};

// Diagnosis 에 사용되는 Multi checkbox 및 single checkbox
const PfDiagnosisDropdown = ({ type, radioData, checkboxData }: Props) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  //선택된 체크박스 담는 배열
  const [selectedCheckbox, setSelectedCheckbox] = useState<Array<CheckboxType>>(
    []
  );
  // 선택된 라디오 담는 배열
  const [selectedRadio, setSelectedRadio] = useState("");
  const [inputValue, setInputValue] = useState("");

  // 검색 기능을 위한 filtered된 데이터
  const FILTERED_SEARCH_DATA = (
    type === "checkbox" ? checkboxData : radioData
  ).filter((el) => {
    return el.name.toLowerCase().includes(inputValue.toLowerCase());
  });

  const selectedBiggerThanOneCondition = selectedCheckbox.length > 1;
  const selectMoreThanOneCondition =
    selectedCheckbox.length >= 1 || selectedRadio;
  const selectedOneCondition = selectedCheckbox.length <= 1;

  const onOpenDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // 체크박스, 라디오냐에 따른 체크에 따른 배열 추가 제거 로직
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.currentTarget;

    if (type === "checkbox") {
      if (checked) {
        setSelectedCheckbox((prev) => {
          const temp = [...prev];
          temp.push({ name });
          return temp;
        });
      } else {
        setSelectedCheckbox((prev) => {
          const temp = [...prev];
          const index = temp.findIndex((el) => el.name === name);
          temp.splice(index, 1);
          return temp;
        });
      }
    } else {
      setSelectedRadio(name);
    }
  };

  // Clear 기능
  const clearSelection = () => {
    setSelectedCheckbox([]);
    setSelectedRadio("");
    setInputValue("");
    setShowDropdown(false);
  };

  useEffect(() => {
    // api 호출
    const apiHandler = async () => {};
    apiHandler();
  }, [selectedRadio]);

  useEffect(() => {
    let handler = (event: any) => {
      if (nodeRef.current && !nodeRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div css={PfDgDropdownContainerCss} ref={nodeRef}>
      {/* prettier-ignore */}
      <div css={[PfDgDropdownTitle(selectedOneCondition)]} onClick={onOpenDropdown}>
        {/* prettier-ignore */}
        <Typography.Body4 css={css`padding-right:3px`} color={selectedOneCondition? Colors.buttonSubmit : Colors.backgroundWhite}>Type</Typography.Body4>
        {/* prettier-ignore */}
        {selectMoreThanOneCondition && (
          <Typography.Body4
            /* prettier-ignore */
            css={selectedOneCondition && css`padding-right: 8px;`}
            color={
              selectedOneCondition
                ? Colors.buttonSubmit
                : Colors.backgroundWhite
            }
          >
            : {selectedCheckbox[0]?.name || selectedRadio}
          </Typography.Body4>
        )}
        {selectedBiggerThanOneCondition && (
          <span css={PfDgDropdownSelectedNumberCss}>
            <Typography.Body3 color={Colors.backgroundWhite}>
              +{selectedCheckbox.length}
            </Typography.Body3>
          </span>
        )}
        {/* prettier-ignore */}
        <BiCaretDown color={selectedOneCondition? Colors.buttonSubmit : Colors.backgroundWhite} />
      </div>
      {showDropdown && (
        <div css={PfDgDropdownContents}>
          <div css={[PfDgDropdownSearchBoxCss]}>
            <BiSearchAlt2 color={Colors.button1DisabledText} size={12.71} />
            <input
              placeholder="Search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <BiCaretDown size={12} />
          </div>
          <div css={PfDgDropdownCheckboxWrapCss}>
            <ul css={PfDgDropdownCheckboxInnerCss}>
              {FILTERED_SEARCH_DATA.length === 0 && (
                <Typography.Body6 css={PfDgDropdownNoElementTxtCss}>
                  Checklist Not Found
                </Typography.Body6>
              )}
              {FILTERED_SEARCH_DATA.map((item, idx) => (
                <li
                  css={PfDgDropdownCheckboxListCss}
                  key={idx}
                  className={
                    selectedCheckbox.some((el) => el.name === item.name) ||
                    selectedRadio === item.name
                      ? "clicked"
                      : ""
                  }
                >
                  <label css={PfDgDropdownCheckboxLabelCss}>
                    <input
                      css={PfDgDropdownCheckboxInputCss}
                      type={type === "checkbox" ? "checkbox" : "radio"}
                      id={String(item.id)}
                      name={item.name}
                      value={item.name}
                      checked={
                        type === "radio"
                          ? selectedRadio === item.name
                          : selectedCheckbox.some((el) => el.name === item.name)
                      }
                      onChange={handleChange}
                    />
                    {item.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div css={PfDgDropdownClearCss} onClick={clearSelection}>
            <Typography.Body6 color={Colors.primary4}>
              Clear selection
            </Typography.Body6>
          </div>
        </div>
      )}
    </div>
  );
};

export default PfDiagnosisDropdown;
