import TableAccordion from "@components/organisms/TableAccordion";
import PortfolioBrief from "@components/organisms/PortfolioBrief";
import { useMemo } from "react";
import { css } from "@emotion/react";
import HeaderSort from "@components/molecules/HeaderSort";
import TblEditableField from "@components/molecules/TblEditableField";
import RowMilestone from "@components/molecules/RowMilestone";
import TextButton from "@components/atoms/TextButton";
import Colors from "@styles/colors";
import { GoGraph } from "react-icons/go";
import Buttonable from "@components/atoms/Buttonable";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import {usePortfolioSel,usePortfolioSelValue} from "@recoil/hooks/usePortfolioSel";
import { CheckboxSelColumn } from "@components/organisms/TablePrimary";

const totalStepsList = [
  "Universe Select",
  "Model Select",
  "Post Process",
  "Analysis",
  "Reporting",
];

export const GenerationflowColumn = ({ accessor = "gflow", ...props }) => {
  return {
    accessor: "gflow",
    Header: ({ column }) => (
      <HeaderSort column={column} columnName={"Generation Flow"}  size={12} />
    ),
    Cell: ({ value }) => (
      <>
        <div
          css={css`
            display: flex;
          `}
        >
          <RowMilestone totalStepsList={totalStepsList} {...value} />
          {value.currentStep === 5 && (
            <TextButton
              containerCss={css`
                width: 25px;
                background-color: ${Colors.primary2};
                margin-left: 20px;
                height: 25px;
                border-radius: 0.25rem;
              `}
              disabled={value.currentStep === 5}
              title={""}
              onClick={(e) => {
                e.stopPropagation();
              }}
              color={"white"}
              left={
                <GoGraph
                  color={"white"}
                  css={css`
                    margin-left: 5px;
                  `}
                />
              }
            />
          )}
        </div>
      </>
    ),

    width: "40%",
  };
};

export const useTblPortfolioListColumns = () => {
  const portfolioSel = usePortfolioSelValue();
  const { setPortfolioSel } = usePortfolioSel();

  const columns = useMemo(() => {
    return [
      {
        ...CheckboxSelColumn({
          selects: portfolioSel,
          setSelects: setPortfolioSel,
        }),
      },
      {
        accessor: "name",
        Header: ({ column }) => (
          <HeaderSort column={column} columnName={"Portfolio Name"} size={12} />
        ),
        Cell: (c) => <TblEditableField {...c} />,
        width: "30%",
      },
      GenerationflowColumn({}),
      {
        accessor: "created_at",
        Header: ({ column }) => (
          <HeaderSort column={column} columnName={"Created date"}  size={12} />
        ),
        width: "15%",
      },
      {
        accessor: "updated_at",
        Header: ({ column }) => (
          <HeaderSort column={column} columnName={"Last Update"}  size={12} />
        ),
        width: "15%",
      },
      {
        accessor: "expand", // accessor is the "key" in the data
        Header: ({ column }) => <></>,
        Cell: ({ row, expanded }) => (
          <span>
            <Buttonable onClick={() => {}}>
              {parseInt(row.id) === parseInt(expanded) ? (
                <AiFillMinusCircle />
              ) : (
                <AiFillPlusCircle />
              )}
            </Buttonable>
          </span>
        ),

        minWidth: 30,
      },
    ];
  }, [portfolioSel, setPortfolioSel]);

  return columns;
};

const TblPortfolioList = (tableProps) => {
  return (
    <TableAccordion
      {...tableProps}
      useSortBy={true}
      useExpanded={true}
      useGlobalFilter={true}
      collapseRenderFn={(row) => <PortfolioBrief {...row.original} />}
      collapseComponentHeight={250}
    />
  );
};

export default TblPortfolioList;
