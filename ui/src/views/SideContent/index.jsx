import React, { Component } from "react";
import { Button } from "antd";
import styles from "./index.module.less";
import './index.css'

import classNames from "classnames";


export default class SideContent extends Component {
  constructor(props) {
    super(props)
    this.state = {expand:false};
  }
  handleClickExpand = () => {
    // Trigger the state of expand onClick
    const curState = this.state.expand
    this.setState({expand:!curState})
  }
  render() {
    const sideWrapperConfig = this.state.expand?"side-wrapper-open":"side-wrapper-fold"
    const expandConfig = this.state.expand?"expand-open":"expand-fold"
    const postConfig = this.state.expand?"post-open":"post-fold"
    const classnames = classNames(styles["sider-wrapper"],sideWrapperConfig);
    const date = this.props.marker.created_time;
    const content = this.props.marker.content;
    return (
      <div className={classnames}>
        <div className={styles.sider}>
          <h3 className={styles.header}>{date.toString()}</h3>
          {/* <h3 className={styles.location}>Jurong East</h3> */}
          <div className={styles["edit-area"]}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
            
          </div>
          <div className={styles[postConfig]}>
            <Button type="primary" onClick={this.props.onChange}>Change</Button>
            <Button type="primary" onClick={this.props.onDelete}>Delete</Button>
          </div>
          <div className={styles[expandConfig]} onClick={this.handleClickExpand}></div>
          {/* TODO: add another expand button, onclick=not show this sideContent */}
        </div>
      </div>
    );
  }
}
