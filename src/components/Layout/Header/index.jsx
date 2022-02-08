import React, { Component } from "react";
import { Layout, Menu } from "antd";
import "./index.css";

const { Header } = Layout;

export default class HeaderMod extends Component {
  render() {
    return (
      <div className="header-wrapper">
        <Header style={{ height: "100%", width: "100vw" }}>
          <div className="logo">A serious logo serious logo</div>
          <div className="menu-wrapper">
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["3"]}>
              <Menu.Item key="1">Write a Diary</Menu.Item>
              <Menu.Item key="2">My Diaries</Menu.Item>
              <Menu.Item key="3">Map</Menu.Item>
              <Menu.Item key="4">Visit others</Menu.Item>
              <Menu.Item key="5">
                <div className="avatar">123</div>
              </Menu.Item>
          
            </Menu>
          </div>
        </Header>
      </div>
    );
  }
}
