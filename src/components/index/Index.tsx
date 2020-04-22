import * as React from 'react';
import {Button} from 'antd';

class Component extends React.Component<any> {
  constructor(props:any) {
    super(props);
  }

  login = () => {
    this.props.history.push('/login')
  };

  render() {
    return (
      <div className="Component">
        <Button onClick={this.login}>按钮</Button>
      </div>
    );
  }
}

export default Component;