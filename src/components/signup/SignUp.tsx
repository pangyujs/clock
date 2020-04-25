import axios from '../../config/axios';
import * as React from 'react';
import {Input, Button} from 'antd';
import {UserOutlined, MoreOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';

import './SignUp.scss';

interface ISignUpState {
  account: string,
  password: string,
  passwordConfirmation: string
}

class SignUp extends React.Component<any, ISignUpState> {
  // 第一个参数是声明 props 第二个参数声明 state
  constructor(props: any) {
    super(props);
    this.state = {
      account: '',
      password: '',
      passwordConfirmation: ''
    };
  }

  onChangeAccount = (e: any) => {
    this.setState({account: e.target.value});
  };

  onChangePassword = (e: any) => {
    this.setState({password: e.target.value});
  };
  onChangePasswordConfirmation = (e: any) => {
    this.setState({passwordConfirmation: e.target.value});
  };
  submit = async () => {
    const {account, password, passwordConfirmation} = this.state;
    try {
      await axios.post('sign_up/user', {
        password_confirmation: passwordConfirmation,
        account,
        password
      });
      this.props.history.push('/');
    } catch (e) {
      throw new Error(e);
    }
  };

  render() {
    const {account, password, passwordConfirmation} = this.state;
    return (
      <div className="Component" id="SignUp">
        <h1>番茄闹钟注册</h1>
        <Input
          placeholder="请输入用户名"
          value={account}
          prefix={<UserOutlined className="site-form-item-icon" style={{color: 'rgba(0,0,0,.25)'}}/>}
          onChange={this.onChangeAccount}
        />
        <Input.Password
          prefix={<MoreOutlined className="site-form-item-icon" style={{color: 'rgba(0,0,0,.25)'}}/>}
          value={password} onChange={this.onChangePassword} placeholder="请输入密码"/>
        <Input.Password
          prefix={<MoreOutlined className="site-form-item-icon" style={{color: 'rgba(0,0,0,.25)'}}/>}
          value={passwordConfirmation} onChange={this.onChangePasswordConfirmation} placeholder="请确认密码"/>
        <Button className="SignUpButton" onClick={this.submit} type={'primary'}>注册</Button>
        <p>如果你有账号,请立即<Link to={'/login'}>登录</Link></p>
      </div>
    );
  }
}

export default SignUp;