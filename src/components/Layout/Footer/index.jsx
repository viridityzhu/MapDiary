import React, { Component } from "react";
import { Footer } from "antd/lib/layout/layout";
import styles from './index.module.css'

export default class FooterMod extends Component {
  render() {
    return (
      <div>
        <Footer style={{ width: "100vw" }} className={styles.footer}>
          Copyright © 2022 Sakura Fantasy, All Rights Reserved
        </Footer>
      </div>
    );
  }
}
