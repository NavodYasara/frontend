import React, { useState, useEffect } from "react";

import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

import { Table } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar";

const ManagerDashboard = () => {
  const [caretakers, setCaretakers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/caretakerDetails")
      .then((response) => response.json())
      .then((data) => setCaretakers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div
        className="vh-100 vw-100"
        style={{ width: "100%", marginTop: "50px" }}
      >
        <div className="calenderview">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={[
                "DatePicker",
                "MobileDatePicker",
                "DesktopDatePicker",
                "StaticDatePicker",
              ]}
            >
              <div className="bg-primary">
                <DemoItem label="Static variant">
                  <StaticDatePicker defaultValue={dayjs("2022-04-17")} />
                </DemoItem>
              </div>
            </DemoContainer>
          </LocalizationProvider>
        </div>

      </div>
    </div>
  );
};

export default ManagerDashboard;
