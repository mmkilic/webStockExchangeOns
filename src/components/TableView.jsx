import React from "react";
import { Table } from "antd";

export default function TableView({ data }) {
  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Value", dataIndex: "value", key: "value" }
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="date"
      pagination={{ pageSize: 10 }}
    />
  );
}
