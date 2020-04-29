import * as React from 'react';
import {Button, Dropdown, Menu, Row, Col} from 'antd';
import {UserOutlined, DownOutlined, SmileOutlined} from '@ant-design/icons';
import axios from '../../config/axios';
import history from '../../config/history';
import './Home.scss';
import Todos from '../todos/Todos';
import Tomatoes from '../Tomatoes/Tomatoes';
import Statistics from '../statistics/Statistics';
import {connect} from 'react-redux';
import {initTodos} from '../../redux/actions/todos';
import {initTomatoes} from '../../redux/actions/tomatoes';


interface IIndexState {
  user: any
}

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

  getTodos = async () => {
    try {
      const response = await axios.get('todos');
      const todos = response.data.resources.map((todo: any) => Object.assign({}, todo, {editing: false}));
      this.props.initTodos(todos);
    } catch (e) {
      throw new Error(e);
    }
  };

  getTomatoes = async () => {
    try {
      const response = await axios.get('tomatoes');
      this.props.initTomatoes(response.data.resources);
    } catch (e) {
      throw new Error(e);
    }
  };

  async componentDidMount() {
    await this.getMe();
    await this.getTodos();
    await this.getTomatoes();
  }

  getMe = async () => {
    const response = await axios.get('me');
    this.setState({user: response.data});
  };


  render() {
    return (
      <div className="Index" id="Index">
        <header>
          <h2 className="logo">
            <strong style={{margin: '4px', fontWeight: 'bold'}}><SmileOutlined/></strong>
            <strong>土豆烧牛肉</strong></h2>
          <Dropdown overlay={menu}>
            <Button className="userButton">
              <span><strong>欢迎 {this.state.user && this.state.user.account}</strong></span>
              <DownOutlined className="userIcon"/>
            </Button>
          </Dropdown>
        </header>
        <main>
          <Todos/>
          <Tomatoes/>
        </main>
        <Statistics/>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
});
const mapDispatchToProps = {
  initTodos,
  initTomatoes
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
