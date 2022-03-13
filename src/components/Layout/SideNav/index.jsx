import React, { Component } from "react";
import { Button } from "antd";
import styles from "./index.module.less";

export default class SideNav extends Component {
  render() {
    return (
      <div className={styles["sider-wrapper"]}>
        <div className={styles.sider}>
          <h2 className={styles.header}>Create a Diary Here</h2>
          <h3 className={styles.location}>Jurong East</h3>
          <div className={styles["edit-area"]}>
          </div>
          <div className={styles.post}>
            <Button type="primary">Submit</Button>
            <Button type="primary">Clear</Button>
          </div>
          <div className={styles.expand}></div>
        </div>
      </div>
    );
  }
}
