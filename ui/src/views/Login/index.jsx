import React, { Component } from "react";
import { Form, Input, Button, Switch, Menu, message } from "antd";
import { Header } from "antd/lib/layout/layout";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import graphQLFetch from '../../browser/graphQLFetch';

import { Link, Navigate } from 'react-router-dom';

class Login extends Component {
  constructor (){
    super();
    this.state = {
      ifRedirect: false
    };
  }
  
  onHandleChange = (e) =>{
    // e: true/false
    console.log(e);
  }
  async login(e) { // {username: 'xxx', password: 'fff'}
    const query = `mutation login($username: String!, $pwd: String!) {
      login(username: $username, pwd: $pwd) {
        signedIn username
      }
    }`;
    const { showError } = this.props;
    const data = await graphQLFetch(query, { username:e.username,pwd:e.password }, showError);
    console.log(data);
    if(data.login.signedIn) { // login success
      message.success("Login success!");
      // const user = useContext(UserContext);
      this.props.onUserChange({signedIn:true, username:data.login.username});
      this.setState({ifRedirect: true});
    }
    else if(!data.login.username) { // the username is not in the db
      message.error("Did you forget to signup before login?");
    }
    else { // username is in the db, but password incorrect.
      message.error("Incorrect password. Try again :)");
    }
    // return data;
  }
  render() {
    const onFinish = (values) => {
      console.log("Received values of form: ", values);
      this.login(values);

    };
    return (
      <div className={styles["login-wrapper"]}>
        <header className={styles["login-header-wrapper"]}>
          <Header className={styles["login-header"]}>
            <Menu className={styles["login-header-menu"]} theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">Login</Menu.Item>
              <Menu.Item key="2">About Us</Menu.Item>
              <Menu.Item key="3"><Link to="/signup">Register</Link></Menu.Item>
              <Menu.Item key="4">Contact Us</Menu.Item>
            </Menu>
          </Header>
        </header>
        <main className={styles["login-main-wrapper"]}>
          <div className={styles["login-logo-wrapper"]}></div>
          {
          this.state.ifRedirect===true ? <div><Navigate to='/home'/> <Link to='/home'>Trying to automatically jump to Home... Click here if we messed up. </Link></div> : <div></div>
          }
          <div className={styles["login-form-wrapper"]}>
            <Form
              name="normal_login"
              className={styles["login-form"]}
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
                  className={styles["login-form-input"]}
                  prefix={<UserOutlined className={styles["site-form-item-icon"]} />}
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
                  className={styles["login-form-input"]}
                  prefix={<LockOutlined className={styles["site-form-item-icon"]} />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles["login-form-button"]}
                >
                  Log in
                </Button>
              </Form.Item>

              {/* Cannot assign a name property to the switch, use ref instead? */}
              <Form.Item>
                <Form.Item valuePropName="checked" noStyle>
                  <Switch onChange={this.onHandleChange}/><a href="www.baidu.com">&nbsp;&nbsp;Keep logged in</a> 
                </Form.Item>

                <a className={styles["login-form-forgot"]} onClick={()=>{message.error("Waiting to be implemented... Sorry for that XD.");}}>
                  Forgot password
                </a>
              </Form.Item>
              <Form.Item>
                <a className={styles["login-form-signup"]} href="/signup">
                  CREATE AN ACCOUNT
                </a>
                <a className={styles["login-form-help"]} onClick={()=>{message.success("If you already have an account, just login. If you're new here, simply signup.");}}>
                  NEED HELP?
                </a>
              </Form.Item>
            </Form>
          </div>
        </main>
        <footer className={styles["login-footer"]}>
          <div className={styles["login-footer-left"]}>
            <a href="www.baidu.com">Documents</a>
            <a href="www.baidu.com">Privacy Polocy</a>
            <a href="www.baidu.com">Term of Use</a>
          </div>
          <div className={styles["login-footer-right"]}>
            <p>Copyright©SakuraFantasy 2022, All Rights Reserved</p>
          </div>
        </footer>
      </div>
    );
  }
}
export default Login;