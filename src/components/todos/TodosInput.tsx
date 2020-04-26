import * as React from 'react';
import {Input} from 'antd';
import {EnterOutlined} from '@ant-design/icons';
import axios from '../../config/axios';
import {connect} from 'react-redux';
import {addTodo} from '../../redux/actions/actions';

interface TTodosInputState {
  description: string
}

interface TTodosInputProps {
  addTodo: (payload: any) => any
}

class TodosInput extends React.Component<TTodosInputProps, TTodosInputState> {
  constructor(props:any) {
    super(props);
    this.state = {
      description: ''
    };
  }

  onKeyup = (e: any) => {
    if (e.keyCode === 13 && this.state.description !== '') {
      this.postTodo();
    }
  };

  postTodo = async () => {
    try {
      const response = await axios.post('todos',{description: this.state.description});
      console.log(response);
      this.props.addTodo(response.data.resource)
    } catch (e) {
      throw new Error(e);
    }
    this.setState({description: ''});
  };


  render() {
    const {description} = this.state;
    const suffix = description ? <EnterOutlined onClick={this.postTodo} className="site-form-item-icon"/> : <span/>;
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


const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
});
const mapDispatchToProps = {
  addTodo
};

export default connect(mapStateToProps,mapDispatchToProps)(TodosInput);