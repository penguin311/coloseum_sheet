import React, { useRef, useState } from "react";
import MOCK_DATA from "assets/MOCK_DATA.json";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import SortButton from "./SortButton";
import { useEffect } from "react";
import { currentRowActions } from "store";
import PortalButton from "layout/PortalButton";

const ItemSheet = () => {
  const dispatch = useDispatch();

  const [clickedId, setClickedId] = useState();
  const [clickedRowId, setClickedRowId] = useState();
  const tableData = useSelector((state) => state.data.tableData);

  const keys = Object.keys(MOCK_DATA[0]);
  const sortedData = useSelector((state) => state.sort);
  const [selColumn, setSelColumn] = useState(null);
  const outsideRef = useRef();

  const tableRef = useRef();
  const [tableHeight, setTableHeight] = useState();

  const isCheckedHandler = (event) => {
    const isChecked = event.target.checked;
    console.log(isChecked);
  };

  const setHighLightHandler = (event) => {
    const clickedId = Number(event.target.id);
    setClickedId(clickedId);
  };

  const setRowHighLightHandler = (event) => {
    const clickedTrId = Number(event.target.parentElement.id);
    setClickedRowId(clickedTrId);
  };

  useEffect(() => {
    const clickOutsideHandler = (event) => {
      if (outsideRef.current && !outsideRef.current.contains(event.target)) {
        dispatch(currentRowActions.setCurrentRow(-1));
      }
    };
    document.addEventListener("click", clickOutsideHandler);
    dispatch(currentRowActions.setCurrentRow(clickedRowId));
    setTableHeight(tableRef.current.getBoundingClientRect().height);
    return () => {
      document.removeEventListener("click", clickOutsideHandler);
    };
  }, [clickedRowId, outsideRef, tableRef]);

  const handleClick = (e) => {
    console.log(e.currentTarget.id);
    if (e.currentTarget.id === "upBtn") {
      outsideRef.current.scrollTop -= tableHeight * 0.2;
    } else if (e.currentTarget.id === "downBtn") {
      outsideRef.current.scrollTop += tableHeight * 0.2;
    }
  };

  return (
    <TableWrapper ref={outsideRef}>
      <PortalButton handleClick={handleClick} />
      <Table>
        <Thead>
          <tr>
            {keys.map((key, index) => (
              <Th key={index}>
                <div>
                  <span>{key}</span>
                  <SortButton
                    columnName={key}
                    index={index}
                    selColumn={selColumn}
                    setSelColumn={setSelColumn}
                  />
                  <span>
                    <input type="checkbox" onChange={isCheckedHandler} />
                  </span>
                </div>
              </Th>
            ))}
          </tr>
        </Thead>
        <tbody ref={tableRef}>
          {sortedData.map((data, index) => (
            <Tr
              key={index}
              id={index}
              onClick={setRowHighLightHandler}
              clickedId={clickedRowId}
            >
              {Object.values(data).map((value, index) => (
                <Td
                  key={index}
                  id={index}
                  onClick={setHighLightHandler}
                  clickedId={clickedId}
                >
                  {value}
                </Td>
              ))}
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  overflow: auto;
  height: 90vh;
  position: relative;
`;

const Table = styled.table`
  overflow: auto;
`;

const Thead = styled.thead`
  position: sticky;
  top: 1px;
  background-color: #fff;
`;

const Th = styled.th`
  position: sticky;
  padding: 10px;
  outline: 1px solid black;
  text-align: center;
  white-space: nowrap;

  div {
    display: flex;
  }

  span {
    display: flex;
    align-items: center;
    margin-right: 5px;
  }
`;

const Tr = styled.tr`
  padding: 100px;
  background-color: ${(props) => props.clickedId === props.id && "#D3DEDC"};
`;

const Td = styled.td`
  padding: 15px;
  text-align: center;
  outline: 1px solid black;
  white-space: nowrap;

  background-color: ${(props) => props.clickedId === props.id && "#D3DEDC"};
`;

export default ItemSheet;
