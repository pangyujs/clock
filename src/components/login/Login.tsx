import axios from '../../config/axios';
import * as React from 'react';
import {Input, Button, message} from 'antd';
import {UserOutlined, MoreOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';

import './Login.scss';

interface ILoginState {
  account: string,
  password: string,
}

class Login extends React.Component<any, ILoginState> {
  // 第一个参数是声明 props 第二个参数声明 state
  constructor(props: any) {
    super(props);
    this.state = {
      account: '',
      password: '',
    };
  }

  onChange = (key: keyof ILoginState, value: string) => {
    const newState = {};
    // @ts-ignore
    newState[key] = value;
    this.setState(newState);
  };
  submit = async () => {
    if (this.state.account === '') {
      return message.warning('请输入用户名');
    } else if (this.state.password === '') {
      return message.warning('请输入密码');
    }
    const {account, password} = this.state;
    try {
      await axios.post('sign_in/user', {
        account,
        password
      });
      this.props.history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const {account, password} = this.state;
    return (
      <div className="Login" id="Login">
        <h1>番茄闹钟登录</h1>
        <Input
          placeholder="请输入用户名"
          value={account}
          prefix={<UserOutlined className="site-form-item-icon" style={{color: 'rgba(0,0,0,.25)'}}/>}
          onChange={(e) => this.onChange('account', e.target.value)}
        />
        <Input.Password
          prefix={<MoreOutlined className="site-form-item-icon" style={{color: 'rgba(0,0,0,.25)'}}/>}
          value={password}
          onChange={(e) => this.onChange('password', e.target.value)}
          placeholder="请输入密码"/>
        <Button className="LoginButton" onClick={this.submit} type={'primary'}>登录</Button>
        <p>如果你没有账号,请立即<Link to={'/signup'}>注册</Link></p>
      </div>
    );
  }
}

export default Login;