import React, { useEffect, useState } from "react";
import "./styles/datatable.scss";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import axios from "../api/axios";

export default function DataTable() {
  
  const [advice, setAdvice] = useState([]);

  const getAdviceData = async () => {
    try {
      const data = await axios.get(
        "https://franchise-hub-server.herokuapp.com/api/v1/admin/dashboard/forms/free-advice/1?quantity=1000"
      );
      console.log(data.data.payload);
      setAdvice(data.data.payload);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAdviceData();
  }, []);

  const columns = [
    { dataField: "_id", text: "ID", width: 70 },
    { dataField: "username", text: "User", width: 230 },
    {
      dataField: "content.email",
      text: "Email",
      width: 230,
    },
    {
      dataField: "mobile",
      text: "Mobile No.",
      width: 100,
    },
    {
      dataField: "advice",
      text: "Advice on",
      width: 2000,
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">Advices</div>
      <BootstrapTable
        keyField="id"
        data={advice}
        columns={columns}
        pagination={paginationFactory()}
        selectRow={{ mode: "checkbox" }}
        tabIndexCell
      />
    </div>
  );
}
