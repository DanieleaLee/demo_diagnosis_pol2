import React, { useState, useEffect, useRef } from "react";
import { BiCaretDown, BiChevronDown, BiSearchAlt2 } from "react-icons/bi";
import { css } from "@emotion/react";
import * as Typography from "@styles/typography";
import Colors from "@styles/colors";
import { flexRow, flexRowBetween } from "@styles";
import {ContentsType} from "@components/template/OverlayResultTemplate/FilterBox";
import RadioSelection from "@components/template/OverlayConfigTemplate/customComponents/OverlayConfigSidebar/RadioSelection";

const PfOlContainerCss = (width: number = 185) => css`
  width: ${width}px;
  position: relative;
`;

const PfOlTitleWrapCss = (type: "benchmark" | "rebalancing") => css`
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
  top: ${type === "rebalancing" ? "-12px" : "-10px"};
`;

const PfOlContentsWrapCss = css`
  width: 100%;
  height: auto;
  background: ${Colors.backgroundWhite};
  border-radius: 4px;
  border: 1px solid ${Colors.hint};
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
  padding: 13px 12px 14px 10px;
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
  padding-left:6px;


  &:hover {
    background: rgba(196, 196, 196, 0.15);
    color: ${Colors.primary4};
    font-weight: 500;
  }
  &.clicked {
    background: rgba(196, 196, 196, 0.15);
    color: ${Colors.primary4};
    font-weight: 500;
    padding-left:6px;
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

const Dropdown = ({
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

  const typeCondition =
    type === "benchmark" ? contents.benchmark : contents.rebalancing;

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
        <div css={[PfOlTitleWrapCss(type)]} onClick={onOpenDropdown}>
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
                <Typography.Body6 css={PfOlDropdownNoElementTxtCss}>
                  Checklist Not Found
                </Typography.Body6>
              )}
              {FILTERED_SEARCH_DATA?.map((item, idx) => (
                <li
                  css={PfOlListCss}
                  key={idx}
                  className={typeCondition === item.name ? "clicked" : ""}
                >
                  <RadioSelection
                    fontSize={10}
                    fontWeight={400}
                    id={
                      type === "benchmark"
                        ? `benchmark${item.id}`
                        : `rebalancing${item.id}`
                    }
                    name={item.name}
                    value={item.name}
                    checked={typeCondition === item.name}
                    label={item.name}
                    handleChange={
                      type === "benchmark"
                        ? handleChangeBenchmark
                        : handleChangeRebalancing
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
          <div css={PfOlDropdownClearCss} onClick={clearSelection}>
            <Typography.Body6 color={Colors.primary4}>
              Clear selection
            </Typography.Body6>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
