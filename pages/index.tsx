import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Col, Layout, Menu, Row, Space } from "antd";
import React, { useState, useEffect } from "react";
import Products from "../src/components/Products";
import { invoke } from "@tauri-apps/api/tauri";
import { tauri } from "@tauri-apps/api";
const { Header, Sider, Content } = Layout;

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);

  invoke("init")
    .then((message) => console.log(message))
    .catch((error) => console.error(error));

  // Products::setDataSource([
  //   { id: 1, barcode: "123456", name: "Foo" },
  //   { id: 2, barcode: "789012", name: "Bar" },
  // ]);

  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
          }}
        >
          <Row>
            <Col span={24}>
              {" "}
              <Button type="primary">Primary Button</Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Products />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
