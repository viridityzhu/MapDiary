import React, { Component, createRef } from "react";
import { Form, Input, message, Button } from "antd";
import styles from "./index.module.css";
import imgURL from '../../img/Diary.jpeg';
import graphQLFetch from '../../browser/graphQLFetch';
import { Link, Navigate } from 'react-router-dom';

export default class Signup extends Component {
  constructor (){
    super();
    this.state = {
      ifRedirect: false
    };
  }
  myForm = createRef();
  onFinish = () => {
    message.success("Submit success!");
  };
  onFinishFailed = () => {
    message.error("Submit failed!");
  };
  async signup(username, email, password) {
    const query = `mutation signup($username: String!, $email: String!, $pwd: String!) {
      signup(username: $username, email: $email, pwd: $pwd) {
        signedIn username
      }
    }`;
    // const { showError } = this.props;
    const data = await graphQLFetch(query, { username:username,email:email,pwd:password }, null);
    console.log(data);
    if(data.signup.signedIn) { // login success
      message.success("Signup success! Automatically logging in...");
      // const user = useContext(UserContext);
      this.props.onUserChange({signedIn:true, username:data.signup.username});
      this.setState({ifRedirect: true});
    }
    else { // username is used.
      message.error("Username already used. Try another one :)");
    }
  }
  onFill = () => {
    const username =this.myForm.current.getFieldValue('username') ;
    const email =this.myForm.current.getFieldValue('email') ;
    const password =this.myForm.current.getFieldValue('password') ;
    const re_password =this.myForm.current.getFieldValue('re-password') ;
    if (password !== re_password) {
      message.error("Password and Re-password are different. Please try again."); 
    } 
    else {
      this.signup(username, email, password);
    }
    // console.log(this.myForm.current.getFieldValue('password'));
    // this.myForm.setFieldsValue({
    //   url: "https://taobao.com/",
    // });
  };
  render() {
    return (
      <div className={styles["signup-wrapper"]}>
        <div className={styles["signup-main-wrapper"]}>
          <div className={styles["signup-focus-page"]}>
            <img src={imgURL} alt="gg" />
          </div>
          {
          this.state.ifRedirect===true ? <div><Navigate to='/home'/> <Link to='/home'>Trying to automatically jump to Home... Click here if we messed up. </Link></div> : <div></div>
          }
          <div className={styles["signup-form-wrapper"]}>
            <h3>Sign Up</h3>
            <div className={styles["signup-form-main"]}>
              <Form
                size="small"
                className={styles["signup-form"]}
                ref={this.myForm}
                layout="vertical"
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    {
                      required: true,
                    },
                    // {
                    //   type: "username",
                    //   warningOnly: true,
                    // },
                    {
                      type: "string",
                      min: 6,
                    },
                  ]}
                >
                  <Input placeholder="Please input a username" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                    },
                    {
                      type: "email",
                      warningOnly: true,
                    },
                    {
                      type: "string",
                      min: 6,
                    },
                  ]}
                >
                  <Input placeholder="Please input a valid email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                    },
                    // {
                    //   type: "password",
                    //   warningOnly: true,
                    // },
                    {
                      type: "string",
                      min: 6,
                    },
                  ]}
                >
                  <Input placeholder="Please input a valid password" />
                </Form.Item>
                <Form.Item
                  name="re-password"
                  label="Re-enter password"
                  rules={[
                    {
                      required: true,
                    },
                    // {
                    //   type: "re-password",
                    //   warningOnly: true,
                    // },
                    {
                      type: "string",
                      min: 6,
                    },
                  ]}
                >
                  <Input placeholder="Please re-enter your password" />
                </Form.Item>
                <Form.Item>
                  <Button
                    className={styles["signup-form-button"]}
                    type="primary"
                    htmlType="button"
                    onClick={this.onFill}
                  >
                    Sign Up
                  </Button>
                </Form.Item>
                <Form.Item>
                  <div className={styles["signup-form-signin"]}>
                    Already have an account?
                    <a href="/login">&nbsp;&nbsp;&nbsp;Sign in</a>{" "}
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
