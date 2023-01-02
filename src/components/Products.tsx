import React from "react";
import { Table } from "antd";

export default () => {
  const [dataSource, setDataSource] = React.useState([]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
    },
    {
      title: "Category_id",
      dataIndex: "category_id",
      key: "category_id",
    },
    {
      title: "Nhat",
      dataIndex: "nhat",
      key: "nhat",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};
