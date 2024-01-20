import { useEffect, useState } from "react";
import "./App.css";
import ButtonStore from "./store/useStore";
import axios from "axios";
import { createColumnHelper, useReactTable } from "@tanstack/react-table";

function App() {
  // const columns = [];
  // const columnHelper = createColumnHelper();
  // const table = useReactTable({ columns, data });

  const { buttonValue, setButtonValue } = ButtonStore();
  const [fetchedData, setFetchedData] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [mode, setMode] = useState(false);

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

  const tHeader = [
    "이름",
    "1교시",
    "2교시",
    "3교시",
    "4교시",
    "5교시",
    "6교시",
    "7교시",
    "8교시",
  ];

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
        <button
          id={clicked ? "btnAni" : null}
          className="print_button"
          onClick={handlePrintBtn}
        >
          {buttonValue}
        </button>
        <div id={clicked ? "dateAni" : null} className="date">
          {today.toLocaleString()}
        </div>
        <div className="table_container">
          <table>
            <thead>
              <tr>
                {tHeader.map((item, index) => (
                  <th key={index}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fetchedData.map((item, index) => (
                <tr>
                  <td id={index} className="userName">
                    {item.name}
                  </td>

                  {item.checkList.map((v) => (
                    <td
                      style={{
                        backgroundColor:
                          v === 1
                            ? "rgb(0 222 0 / 90%)"
                            : v === 2
                            ? "rgb(200 200 200 / 90%)"
                            : v === 5
                            ? "rgb(125 125 125 / 90%)"
                            : null,
                      }}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <footer>Made by Y-CPK</footer>
    </div>
  );
}

export default App;
