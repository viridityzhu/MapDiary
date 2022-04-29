import React, { Component } from "react";
import { Button } from "antd";
import styles from "./index.module.less";
import './index.css'
import MyReactQuill from "../../Utils/MyReactQuill";
import classNames from "classnames";


export default class SideNav extends Component {
  constructor(props) {
    super(props)
    this.state = {expand:false};
  }
  handleClickExpand = () => {
    // Trigger the state of expand onClick
    const curState = this.state.expand
    this.setState({expand:!curState})
  }
  // componentWillReceiveProps(props) {
  //   const { editContent } = this.props;
  //   console.log("sideNav receive props. then editContent in sideNav,", this.state.editContent);
  //   if (editContent!=='') {
      
  //     this.setState({editContent:editContent});
  //     console.log("then editContent in sideNav,", this.state.editContent);
  //   }
  // }
  render() {
    const sideWrapperConfig = this.state.expand?"side-wrapper-open":"side-wrapper-fold"
    const expandConfig = this.state.expand?"expand-open":"expand-fold"
    const postConfig = this.state.expand?"post-open":"post-fold"
    const classnames = classNames(styles["sider-wrapper"],sideWrapperConfig)
    return (
      <div className={classnames}>
        <div className={styles.sider}>
          <h2 className={styles.header}>Create a Diary Here</h2>
          {/* <h3 className={styles.location}>Jurong East</h3> */}
          <div className={styles["edit-area"]}>
            <MyReactQuill editContent={this.props.editContent} clearEditContent={this.props.clearEditContent} text={this.props.text} setEditFalse={this.props.setEditFalse} changeText={this.props.changeText}/>
          </div>
          <div className={styles[postConfig]}>
          <Button type="primary" onClick={this.props.onSubmit}>{this.props.isEdit? "Edit": "Submit"}</Button>
            
            <Button type="primary" onClick={this.props.onClear}>Clear</Button>
          </div>
          <div className={styles[expandConfig]} onClick={this.handleClickExpand}></div>
        </div>
      </div>
    );
  }
}
