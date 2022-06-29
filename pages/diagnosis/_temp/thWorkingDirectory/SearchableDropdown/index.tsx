import React, { useState, useEffect, useRef } from "react";
import { BiCaretDown, BiChevronDown, BiSearchAlt2 } from "react-icons/bi";
import { css } from "@emotion/react";
import * as Typography from "@styles/typography";
import Colors from "@styles/colors";
import { flexRow, flexRowBetween } from "@styles";
import { ContentsType } from "@lucian2Components/organisms/PfOverlayFilterBox";
import PortfolioRadioSelection from "@lucian2Components/atoms/PortfolioRadioSelection";

const PfOlContainerCss = (width: number = 185) => css`
  width: ${width}px;
  position: relative;
`;

const PfOlTitleWrapCss = (top: number = 0) => css`
  width: 100%;
  height: 26px;
  ${flexRowBetween};
  background: ${Colors.backgroundWhite};
  border: 1px solid ${Colors.hint};
  border-radius: 4px;
  padding-left: 11px;
  cursor: pointer;
  position: absolute;
  z-index: 1;
  top: ${top};
`;

const PfOlContentsWrapCss = css`
  width: 100%;
  height: auto;
  background: ${Colors.backgroundWhite};
  border-radius: 4px;
  border: 1px solid ${Colors.hint};
  border-bottom: 0.3px solid ${Colors.hint} !important;
  position: absolute;
  z-index: 1;
  top: -10px;
`;

const PfOlSearchbarWrapCss = css`
  ${flexRowBetween};
  width: 100%;
  height: 26px;
  padding-left: 10.33px;

  input {
    width: 100%;
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

const PfOlUListWrapCss = css`
  width: 100%;
  background: ${Colors.backgroundWhite};
  border-top: 0.3px solid ${Colors.hint};
  border-bottom: 0.3px solid ${Colors.hint};
  padding: 13px 12px 14px 16px;
`;

const PfOlUListCss = css`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  max-height: 125px;
  padding: 0;

  &::-webkit-scrollbar {
    background: #ececec;
    border-radius: 1.5px;
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 1.5px;
    background: #2f3b43;
  }
`;

const PfOlListCss = css`
  ${flexRow};
  height: 100%;
  padding: 4px 0;
  cursor: pointer;

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

const PfOlDropdownNoElementTxtCss = css`
  padding-left: 10px;
`;

const PfOlDropdownClearCss = css`
  width: 100%;
  padding: 4px 0 2px 10px;
  cursor: pointer;
`;

interface Props {
  radioData: Array<{ id: number; name: string }>;
  type?: "benchmark" | "rebalancing";
  handleChangeBenchmark?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeRebalancing?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  contents?: ContentsType;
  width?: number;
}

const SearchableDropdown = ({
  radioData,
  type,
  handleChangeBenchmark,
  handleChangeRebalancing,
  contents,
  width,
}: Props) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const FILTERED_SEARCH_DATA = radioData?.filter((el) => {
    return el.name.toLowerCase().includes(inputValue.toLowerCase());
  });

  const typeCondition = type === "benchmark" ? contents.benchmark : contents.rebalancing;

  const onOpenDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const clearSelection = () => {
    if (type === "benchmark") {
      contents.benchmark = "";
    }
    if (type === "rebalancing") {
      contents.rebalancing = "";
    }
    setInputValue("");
    setShowDropdown(false);
  };

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

  useEffect(() => {
    if (contents.benchmark !== "" || contents.rebalancing !== "") {
      setShowDropdown(false);
    }
  }, [contents.benchmark, contents.rebalancing]);

  return (
    <div css={[PfOlContainerCss(width)]} ref={nodeRef}>
      {showDropdown === false && (
        <div css={[PfOlTitleWrapCss(0)]} onClick={onOpenDropdown}>
          <Typography.Body3>{typeCondition}</Typography.Body3>
          <BiChevronDown size={30} color={Colors.dropdownChevronColor} />
        </div>
      )}
      {showDropdown && (
        <div css={PfOlContentsWrapCss}>
          <div css={PfOlSearchbarWrapCss}>
            <BiSearchAlt2 color={Colors.button1DisabledText} size={15} />
            <input
              css={css`
                flex: 1;
              `}
              placeholder="Search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <BiChevronDown size={30} color={Colors.dropdownChevronColor} />
          </div>
          <div css={PfOlUListWrapCss}>
            <ul css={PfOlUListCss}>
              {FILTERED_SEARCH_DATA?.length === 0 && (
                <Typography.Body6 css={PfOlDropdownNoElementTxtCss}>Checklist Not Found</Typography.Body6>
              )}
              {FILTERED_SEARCH_DATA?.map((item, idx) => (
                <li css={PfOlListCss} key={idx} className={typeCondition === item.name ? "clicked" : ""}>
                  <PortfolioRadioSelection
                    fontSize={10}
                    fontWeight={400}
                    id={type === "benchmark" ? `benchmark${item.id}` : `rebalancing${item.id}`}
                    name={item.name}
                    value={item.name}
                    checked={typeCondition === item.name}
                    label={item.name}
                    handleChange={type === "benchmark" ? handleChangeBenchmark : handleChangeRebalancing}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div css={PfOlDropdownClearCss} onClick={clearSelection}>
            <Typography.Body6 color={Colors.primary4}>Clear selection</Typography.Body6>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;

// import React, { useState } from "react";
// import { css } from "@emotion/react";
// import ConditionalRenderList from "./ConditionalRenderList";
// import Input from "./Input";

// const searchableDropdownContainerStyle = css`
//   display: inline-block;
//   position: relative;
//   background-color: red;
//   /* padding: 10px; */
// `;
// const SearchableDropdown = () => {
//   const [value, setValue] = useState("");
//   const [toggle, setToggle] = useState(false);
//   // console.log(value)
//   return (
//     <>
//       <h2>SearchableDropdown</h2>
//       <div css={searchableDropdownContainerStyle}>
//         <Input
//           setToggle={setToggle}
//           onChange={(inputValue) => {
//             setValue(inputValue);
//           }}
//           value={value}
//         />
//         <ConditionalRenderList value={value} list={list} setValue={setValue} toggle={toggle} setToggle={setToggle} />
//       </div>
//     </>
//   );
// };

// export default SearchableDropdown;

// const list = [
//   { id: 1, option: "aa" },
//   { id: 2, option: "ab" },
//   { id: 3, option: "ac" },
//   { id: 4, option: "ad" },
//   { id: 5, option: "e" },
//   { id: 6, option: "f" },
//   { id: 7, option: "g" },
//   { id: 8, option: "h" },
//   { id: 9, option: "i" },
// ];
