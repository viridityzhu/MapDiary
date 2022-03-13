import React, { Component } from "react";
import { Layout, Switch, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./index.module.css";

const { Header } = Layout;

export default class HeaderMod extends Component {
  render() {
    return (
      <div className={styles["header-wrapper"]}>
        <Header>
          <div className={styles.logo}>A serious logo</div>
          <div className={styles["avatar-wrapper"]}>
            <Avatar size={48} icon={<UserOutlined />} className={styles.avatar} />
            &nbsp;&nbsp;&nbsp;Jay.Liu
          </div>
          <div className={styles["show-others"]}>
            <Switch />
            &nbsp;Show Others' Pins
          </div>
        </Header>
      </div>
    );
  }
}
