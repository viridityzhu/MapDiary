import React, { Component } from "react";
import { Layout, Switch, Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./index.module.css";

const { Header } = Layout;

export default class HeaderMod extends Component {
  constructor(props) {
    super(props)
    this.state = {showSettings:false}
  }
  showSettings = () => {
    this.setState({showSettings:true})
  }
  hideSettings = () => {
    this.setState({showSettings:false})
  }
  render() {
    return (
      <div className={styles["header-wrapper"]}>
        <Header>
          <div className={styles.logo}>A serious logo</div>
          <div className={styles["avatar-wrapper"]} onMouseOver={this.showSettings} onMouseLeave={this.hideSettings} >
            <Avatar size={48} icon={<UserOutlined />} className={styles.avatar} />
            &nbsp;&nbsp;&nbsp;Jay.Liu
            <div className={styles.settings} style={{display:this.state.showSettings?"block":"none"}}>
              <Button className={styles.btn1} >Settings</Button>
              <Button className={styles.btn2}>Log out</Button>
            </div>
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
