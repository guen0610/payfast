import React from "react";
import { Table } from "antd";

interface ProductProps {
  data: any;
}

const Product: React.FC<ProductProps> = (props) => {
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

  return <Table dataSource={props.data} columns={columns} />;
};

export default Product;