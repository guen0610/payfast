import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Col, Layout, Menu, Row, Space } from "antd";
import React, { useState, useEffect } from "react";
import Main from "../src/components/Main";
import Products from "../src/components/Products";
import Search from "../src/components/Search";
import { invoke } from "@tauri-apps/api/tauri";
import { tauri } from "@tauri-apps/api";
const { Header, Sider, Content } = Layout;

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = React.useState<Array<{ [key: string]: any }>>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (value: string) => {
    setInputValue(value);
    console.log(value);
  };

  const handleSearchPressed = () => {
    console.log(inputValue);
  };

  React.useEffect(() => {
    console.log("invoking init from js");
    invoke("init")
      .then((message) => {
        setData(message);
      })
      .catch((error) => console.error(error));
  }, []);

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
            <Col span={16}>
              <Row>
                <Col span={12}>
                  <Button type="primary">Primary Button</Button>
                </Col>
                <Col span={12}></Col>
              </Row>
              <Row>
                <Col span={24}><Main data={data}/></Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={24}>
                  <Search
                    inputValue={inputValue}
                    onInputChange={handleInputChange}
                    onSearchPressed={handleSearchPressed}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Products data={data} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
