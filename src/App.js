import React, { useEffect, useState } from "react";
import "./App.css";
import ButtonStore from "./store/useStore";
import axios from "axios";
import { createColumnHelper, useReactTable } from "@tanstack/react-table";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import Search from "./Component/Search";

function App() {
  // const columns = [];
  // const columnHelper = createColumnHelper();
  // const table = useReactTable({ columns, data });

  const { buttonValue, setButtonValue } = ButtonStore();
  const [fetchedData, setFetchedData] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [mode, setMode] = useState(false);

  const columns = React.useMemo(
    () => [
      {
        Header: "이름",
        accessor: "name",
      },
      // CheckList 항목을 개별 셀로 분리
      ...Array.from({ length: 8 }).map((_, i) => ({
        Header: `${i + 1}교시`,
        accessor: (d) => d.checkList[i],
        id: `checkList-${i}`,
        // Cell에 조건부 스타일 적용
        Cell: ({ value }) => (
          <div
            className="cell-check-list"
            style={{
              backgroundColor: value === 1 ? "#43A200" : value === 5 ? "#5C5C5C" : "inherit",
            }}
          >
            {value}
          </div>
        ),
      })),
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter } =
    useTable({ columns, data: fetchedData }, useGlobalFilter, useSortBy);

  const apiUrl = "https://processlogic.link/example";

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);

      const { data } = await response.json();

      setFetchedData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrintBtn = () => {
    setButtonValue("출결상태 재출력");
    fetchData();
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 500);
  };

  const handleMode = () => {
    setMode((prevMode) => !prevMode);

    if (document.querySelector("body").dataset.theme === "dark") {
      document.body.dataset.theme = "light";
    } else {
      document.body.dataset.theme = "dark";
    }
  };

  const today = new Date();

  return (
    <div className="app_body">
      <div className="title">
        <div className="title_text">ZOOM 출결 관리</div>
      </div>
      <div
        className={`sunMoon material-icons`}
        style={{ color: mode ? "#252525" : "white" }}
        onClick={handleMode}
      >
        {mode ? "dark_mode" : "light_mode"}
      </div>
      <div className="main_body">
        <button id={clicked ? "btnAni" : null} className="print_button" onClick={handlePrintBtn}>
          {buttonValue}
        </button>
        <div id={clicked ? "dateAni" : null} className="date">
          {today.toLocaleString()}
        </div>
        <Search onSubmit={setGlobalFilter} />
        <div className="table_container">
          <table {...getTableProps()} className="table">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} className="tr">
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())} className="th">
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="tr">
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className="td">
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <footer>Made by Y-CPK</footer>
    </div>
  );
}

export default App;
