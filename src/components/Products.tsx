import React from "react";
import { Table } from "antd";

interface ProductProps {
  data: any;
}

const Product: React.FC<ProductProps> = (props) => {
  const columns = [
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    }
  ];

  return <Table dataSource={props.data} columns={columns} />;
};

export default Product;