import React, { Component } from "react";
import styles from './index.module.css'

export default class SideNav extends Component {
  render() {
    return (
      <div className={styles["sider-wrapper"]}>
        <div className={styles.sider}></div>
      </div>
    );
  }
}
