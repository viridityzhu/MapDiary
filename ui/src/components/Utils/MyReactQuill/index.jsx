import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {modules,formats} from './settings'
export default class MyReactQuill extends Component {
  constructor(props) {
    super(props);
    this.state = {text:null};
  }
  handleChange = (value) => {
    this.setState({ text: value });
    this.props.changeText(value);
  };
  render() {
    return <ReactQuill modules={modules} formats={formats} value={this.state.text} onChange={this.handleChange} />;
  }
}
