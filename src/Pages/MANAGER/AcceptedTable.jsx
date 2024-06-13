import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Input,
  Popconfirm,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import Highlighter from "react-highlight-words";
import CareGiverSelectingModel from "./CareGiverSelectingModel";
import CareTakerShowingModel from "./CareTakerShowingModel";
import PaymentPopup from "./paymentPopup"; // Import the new PaymentPopup component

const AcceptedTable = ({ reservationResult, fetchPendingTasks }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [openCareGiverSelectingModel, setOpenCareGiverSelectingModel] =
    useState(false);
  const [selectedRequirment, setSelectedRequirment] = useState(null);
  const [careTakerShowingModelOpen, setCareTakerShowingModelOpen] =
    useState(false);
  const [selectedCareTaker, setSelectedCareTaker] = useState(null);
  const [paymentPopupVisible, setPaymentPopupVisible] = useState(false);
  const [selectedRequirementId, setSelectedRequirementId] = useState(null);

  const handleOpenModel = (rowData) => {
    setSelectedRequirment(rowData?.requirementId);
    setOpenCareGiverSelectingModel(true);
  };

  const handleOpenCaretakerModel = (rowData) => {
    setSelectedCareTaker(rowData?.caretakerId);
    setCareTakerShowingModelOpen(true);
  };

  const handleProceedPayment = (rowData) => {
    setSelectedRequirementId(rowData?.requirementId);
    setPaymentPopupVisible(true);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Requirment ID",
      dataIndex: "requirementId",
      key: "resultID",
      width: "10%",
    },
    {
      title: "Requirment",
      dataIndex: "requirement",
      key: "requirement",
      width: "20%",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      width: "10%",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      width: "10%",
    },
    {
      title: "preffGender",
      dataIndex: "preffGender",
      key: "preffGender",
      width: "10%",
    },
    {
      title: "Care taker Info",
      dataIndex: "caretakerId",
      key: "caretakerId",
      width: "10%",
      render: (pic, rowdata) => {
        return (
          <button onClick={() => handleOpenCaretakerModel(rowdata)}>
            View CareTaker
          </button>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
    },
    {
      title: "Assigned CareGiver",
      dataIndex: "assignee",
      key: "assignee",
      width: "10%",
    },
    {
      title: "Action",
      dataIndex: "userStatus",
      key: "userStatus",
      render: (pic, rowData) => {
        return rowData?.status === "finished" ? (
          <div className="w-full  flex flex-row justify-between">
            <button onClick={() => handleProceedPayment(rowData)}>
              Proceed Payment
            </button>
          </div>
        ) : (
          <p>Ongoing</p>
        );
      },
    },
  ];

  return (
    <>
      <CareTakerShowingModel
        selectedCareTaker={selectedCareTaker}
        careTakerShowingModelOpen={careTakerShowingModelOpen}
        setCareTakerShowingModelOpen={setCareTakerShowingModelOpen}
      />
      <CareGiverSelectingModel
        fetchPendingTasks={fetchPendingTasks}
        selectedRequirment={selectedRequirment}
        openCareGiverSelectingModel={openCareGiverSelectingModel}
        setOpenCareGiverSelectingModel={setOpenCareGiverSelectingModel}
      />
      <PaymentPopup
        isVisible={paymentPopupVisible}
        onClose={() => setPaymentPopupVisible(false)}
        requirementId={selectedRequirementId}
      />
      <Table
        pagination={{ pageSize: 5 }}
        columns={columns}
        dataSource={reservationResult}
      />
    </>
  );
};

export default AcceptedTable;
