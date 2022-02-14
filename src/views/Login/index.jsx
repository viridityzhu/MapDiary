import React, { Component } from "react";
import { Form, Input, Button, Switch, Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./index.css";

export default class Login extends Component {
  render() {
    const onFinish = (values) => {
      console.log("Received values of form: ", values);
    };
    return (
      <div className="login-wrapper">
        <header className="login-header-wrapper">
          <Header className="login-header">
            <Menu className="login-header-menu" theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">Login</Menu.Item>
              <Menu.Item key="2">About Us</Menu.Item>
              <Menu.Item key="3">Register</Menu.Item>
              <Menu.Item key="4">Contact Us</Menu.Item>
            </Menu>
          </Header>
        </header>
        <main className="login-main-wrapper">
          <div className="login-logo-wrapper"></div>
          <div className="login-form-wrapper">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  className="login-form-input"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  className="login-form-input"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Form.Item>

              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Switch /><a href="www.baidu.com">&nbsp;&nbsp;Keep logged in</a> 
                </Form.Item>

                <a className="login-form-forgot" href="www.baidu.com">
                  Forgot password
                </a>
              </Form.Item>
              <Form.Item>
                <a className="login-form-signup" href="www.baidu.com">
                  CREATE AN ACCOUNT
                </a>
                <a className="login-form-help" href="www.baidu.com">
                  NEED HELP?
                </a>
              </Form.Item>
            </Form>
          </div>
        </main>
        <footer className="login-footer">
          <div className="login-footer-left">
            <a href="www.baidu.com">Documents</a>
            <a href="www.baidu.com">Privacy Polocy</a>
            <a href="www.baidu.com">Term of Use</a>
          </div>
          <div className="login-footer-right">
            <p>Copyright©SakuraFantasy 2022, All Rights Reserved</p>
          </div>
        </footer>
      </div>
    );
  }
}
