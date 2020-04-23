import * as React from 'react';
import {Button} from 'antd';
import axios from '../../config/axios';

interface IIndexState {
  user: any
}

class Index extends React.Component<any, IIndexState> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {}
    };
  }

  logout = () => {
    localStorage.setItem('x-token','');
    this.props.history.push('/login');
  };

  async componentWillMount() {
    await this.getMe();
  }

  getMe = async () => {
    try {
      const response = await axios.get('me');
      this.setState({user: response.data});
    } catch (e) {
      console.error('获取用户失败');
    }
  };

  render() {
    return (
      <div className="Component">
        <p>欢迎 {this.state.user && this.state.user.account}</p>
        <Button onClick={this.logout}>退出登录</Button>
      </div>
    );
  }
}

export default Index;