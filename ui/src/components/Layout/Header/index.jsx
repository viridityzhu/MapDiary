import React, { Component } from "react";
import { Layout, Switch, Avatar, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import logoImg from '../../../img/Logo.JPG'
import styles from "./index.module.css";
import {Link} from "react-router-dom";

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
  toggleShowOthers = (e) => {
    this.props.setShowOthers(e)
  }
  render() {
    return (
      <div className={styles["header-wrapper"]}>
        <Header>
          <div className={styles.logo}>
            <a href="/home">
              <img src={logoImg} alt="Broken img" style={{ height: '64px', width: '100px' }} />
            </a>
          </div>
          <div className={styles["avatar-wrapper"]} onMouseOver={this.showSettings} onMouseLeave={this.hideSettings} >
            <Avatar size={48} icon={<UserOutlined />} className={styles.avatar} />
            &nbsp;&nbsp;&nbsp;{this.props.username}
            <div className={styles.settings} style={{display:this.state.showSettings?"block":"none"}}>
              <Button className={styles.btn1} onClick={()=>{message.info("Sorry, this function hasn't been implemented :)")}}>Settings</Button>
              <Button className={styles.btn2}><Link to='/login'>Log out</Link></Button>
            </div>
          </div>
          <div className={styles["show-others"]}>
            <Switch onChange={this.toggleShowOthers} defaultChecked/>
            &nbsp;Show Others' Pins
          </div>
        </Header>
      </div>
    );
  }
}
