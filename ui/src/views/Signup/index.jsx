import React, { Component, createRef } from "react";
import { Form, Input, message, Button } from "antd";
import styles from "./index.module.css";
import imgURL from '../../img/Diary.jpeg'

export default class Signup extends Component {
  myForm = createRef();
  onFinish = () => {
    message.success("Submit success!");
  };
  onFinishFailed = () => {
    message.error("Submit failed!");
  };

  onFill = () => {
    this.myForm.setFieldsValue({
      url: "https://taobao.com/",
    });
  };
  render() {
    return (
      <div className={styles["signup-wrapper"]}>
        <div className={styles["signup-main-wrapper"]}>
          <div className={styles["signup-focus-page"]}>
            <img src={imgURL} alt="gg" />
          </div>
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
                    {
                      type: "username",
                      warningOnly: true,
                    },
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
                    {
                      type: "password",
                      warningOnly: true,
                    },
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
                    {
                      type: "re-password",
                      warningOnly: true,
                    },
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
