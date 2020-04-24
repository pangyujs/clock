import * as React from 'react';
import {Input} from 'antd';
import {EnterOutlined} from '@ant-design/icons';

interface TTodosInputState {
  description: string
}

interface TTodosInputProps {
  addTodo: (todoData: any) => void
}

class TodosInput extends React.Component<TTodosInputProps, TTodosInputState> {
  constructor(props: any) {
    super(props);
    this.state = {
      description: ''
    };
  }

  onKeyup = (e: any) => {
    if (e.keyCode === 13 && this.state.description !== '') {
      this.addTodo();
    }
  };

  addTodo = () => {
    this.props.addTodo({description: this.state.description});
    this.setState({description: ''})
  };


  render() {
    const {description} = this.state;
    const suffix = description ? <EnterOutlined onClick={this.addTodo} className="site-form-item-icon"/> : <span/>;
    return (
      <div className="TodosInput" id="TodosInput">
        <Input
          suffix={suffix}
          value={description} placeholder="输入你要做的事情"
          onChange={(e) => this.setState({description: e.target.value})}
          onKeyUp={this.onKeyup}
        />
      </div>
    );
  }
}

export default TodosInput;