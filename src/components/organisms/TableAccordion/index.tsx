import {css, useTheme} from "@emotion/react";
import {useTable, useSortBy, useExpanded, useFilters, useGlobalFilter } from "react-table";
import {motion, AnimatePresence} from "framer-motion";
import {MouseEventHandler, useState} from "react";
import {useCallback, useMemo} from "react";
import ClipLoader from "react-spinners/ClipLoader";


/**
 *
 * Ideally 외부에서 호출할 일이 없어야 함.
 *
 * expanded    - 열려있는 행(row) 의 id list
 *
 * */
const AccordionTr = ({ i, expanded, setExpanded, children, collapseComponent, collapseComponentHeight, ...props }) => {

  const isOpen = useMemo(()=>expanded.includes(i), [expanded]);

  const onClickRow: MouseEventHandler<HTMLElement>= useCallback(
    () => {
      if (isOpen)
        setExpanded(expanded.filter(e=>e!=i))
      else
        setExpanded([...expanded,i]);
    }
  ,[expanded, setExpanded]);


  return (
    <>
      <tr css={TblRowStyle} onClick={onClickRow }>
        {children}
      </tr>
      <AnimatePresence initial={false}>
        {isOpen && (
          <tr>
            <td colSpan={999} >
              <motion.div
                css={css`overflow: hidden; padding: 0.5rem;`}
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { height: collapseComponentHeight },
                  collapsed: { height: 0 }
                }}
                transition={{ duration: 0.2 }}
              >
                {collapseComponent}
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
};


///////////////////


const TblHeaderStyle = css`
  border-bottom: 1.5px solid gray;
  line-height:40px;
`;

const TblRowStyle = css`
  border-top: 0.02rem solid gray;
  border-bottom: 0.02rem solid gray;
`;


export const useTableAccordion = ({columns, data, ...plugins})=>{
  return useTable(
    { columns, data },
    // ...plugins
  );
};


const TableAccordion = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
  collapseRenderFn, collapseComponentHeight, loading, ...props})=>{

  const [expanded, setExpanded] = useState<Array<number>>([]);
  const theme = useTheme();

  return (
    <>
    <table css={css`width:100%; border-collapse:collapse;`} {...getTableProps()}>
      <thead>
      {
        headerGroups.map((headerGroup, k) => (
          <tr key={k} css={TblHeaderStyle} {...headerGroup.getHeaderGroupProps()}>
            {
              headerGroup.headers.map((column, k) => (

                <th key={k} {...column.getHeaderProps(
                    {
                      ...(props.useSortBy && {...column.getSortByToggleProps()}),
                      style: {width:column.width, maxWidth: column.maxWidth, minWidth: column.minWidth}
                    }
                )}>
                  {column.render('Header')}
                </th>
              ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      {
        loading && <tr><td colSpan={999}>
          <div css={css`display:flex; justify-content:center; height: 100px; padding-top: 40px;`}>
            <ClipLoader color={theme.colors.primary2} loading={true} size={25} />
          </div>
        </td></tr>
      }
      {
        rows.map(
          (row,i) => {
            prepareRow(row);
            return (
              <AccordionTr key={i} i={i} expanded={expanded} setExpanded={setExpanded}
                           collapseComponent={collapseRenderFn(row)} collapseComponentHeight={collapseComponentHeight}>
                {
                  row.cells.map((cell, k) => (
                      <td key={k} {...cell.getCellProps()}>
                        {cell.render('Cell', {expanded})}
                      </td>
                    )
                  )}
              </AccordionTr>
            );
        }

        )}
      </tbody>
    </table>
      </>
  )

};

export default TableAccordion;