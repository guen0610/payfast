import React from "react";
import { Table } from "antd";

interface MainProps {
  data: any;
}

const Main: React.FC<MainProps> = (props) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Unit Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Total Price",
      dataIndex: "total",
      key: "total",
    }
  ];

  return <Table dataSource={props.data} columns={columns} />;
};

export default Main;