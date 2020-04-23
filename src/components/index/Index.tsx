import * as React from 'react';
import {Button} from 'antd';

class Component extends React.Component<any> {
  constructor(props:any) {
    super(props);
  }

  login = () => {
    this.props.history.push('/login')
  };

  signup = () => {
    this.props.history.push('/signup')
  };
  render() {
    return (
      <div className="Component">
        <Button onClick={this.login}>登录</Button>
        <Button onClick={this.signup}>注册</Button>
      </div>
    );
  }
}

export default Component;