import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {modules,formats} from './settings'
export default class MyReactQuill extends Component {
  constructor(props) {
    super(props);
    this.state = {text:this.props.editContent};
  }
  componentWillReceiveProps(props) {
    const { editContent } = this.props;
    console.log("then editContent in myquill,", editContent) 
    if (editContent!=='') {
      console.log("editcnt is not null, then editContent in myquill,", editContent)
      this.setState({ text: editContent, editContent:'' });
      this.props.clearEditContent();
      this.props.changeText(editContent);
    }
  }
  handleChange = (value) => {
    this.setState({ text: value });
    this.props.changeText(value);
  };
  render() {
    return <ReactQuill modules={modules} formats={formats} value={this.state.text} onChange={this.handleChange} />;
  }
}
