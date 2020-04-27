import * as React from 'react';
import {Button, Dropdown, Menu} from 'antd';
import {UserOutlined,DownOutlined } from '@ant-design/icons';
import axios from '../../config/axios';
import history from '../../config/history';
import './Home.scss'
import Todos from '../todos/Todos'
import Tomatoes from '../Tomatoes/Tomatoes';

interface IIndexState {
  user: any
}

const logout = () => {
  localStorage.setItem('x-token', '');
  history.push('/login');
};

const menu = (
  <Menu>
    <Menu.Item key="1">
      <UserOutlined/>
      偏好设置
    </Menu.Item>
    <Menu.Item key="2" onClick={logout}>
      <UserOutlined/>
      退出登录
    </Menu.Item>
  </Menu>
);

class Home extends React.Component<any, IIndexState> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {}
    };
  }


  async componentDidMount() {
    await this.getMe();
  }

  getMe = async () => {
    const response = await axios.get('me');
    this.setState({user: response.data});
  };


  render() {
    return (
      <div className="Index" id="Index">
        <header>
          <h2 className="logo"><strong >土豆烧牛肉</strong></h2>
          <Dropdown overlay={menu}>
            <Button className="userButton">
              <span><strong>欢迎 {this.state.user && this.state.user.account}</strong></span>
              <DownOutlined className="userIcon" />
            </Button>
          </Dropdown>
        </header>
        <main>
          <Todos/>
          <Tomatoes/>
        </main>
      </div>
    );
  }
}

export default Home;