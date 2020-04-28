import * as React from 'react';
import {Checkbox} from 'antd';
import {DeleteOutlined, CheckOutlined} from '@ant-design/icons';
import './TodosItem.scss';
import {connect} from 'react-redux';
import {editTodo, updateTodo} from '../../redux/actions/todos';

// @ts-ignore
import classNames from 'classnames';
import axios from '../../config/axios';

interface TTodosItemProps {
  id: number
  description: string
  completed: boolean
  editing: boolean
  updateTodo: (payload: any) => any
  editTodo: (id: number) => any
}

interface TTodosItemState {
  editText: string
}

class TodosItem extends React.Component<TTodosItemProps, TTodosItemState> {
  constructor(props: TTodosItemProps) {
    super(props);
    this.state = {
      editText: this.props.description
    };
  }

  updateTodo = async (todoData: any) => {
    if (todoData.completed) {
      todoData.completed_at = new Date();
    }
    try {
      const response = await axios.put(`todos/${this.props.id}`, todoData);
      this.props.updateTodo(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };

  toEditing = () => {
    this.props.editTodo(this.props.id);
  };

  onKeyup = (e: any) => {
    if (e.keyCode === 13 && this.state.editText !== '') {
      this.updateTodo({description: this.state.editText});
    }
  };

  onClick = () => {
    if (this.state.editText !== '') {
      this.updateTodo({description: this.state.editText});
    }
  };

  render() {
    const Editing = (
      <div className="editing">
        <input value={this.state.editText}
               onKeyUp={this.onKeyup}
               onChange={e => this.setState({editText: e.target.value})}
        />
        <span className="icon-wrapper">
             <CheckOutlined className="successIcon" onClick={this.onClick}/>
          <DeleteOutlined className="deleteIcon" onClick={e => this.updateTodo({deleted: true})}/>
        </span>
      </div>
    );

    const Text = <span className="text" onDoubleClick={this.toEditing}>{this.props.description}</span>;
    const todoItemClass = classNames({
      TodosItem: true,
      editing: this.props.editing,
      completed: this.props.completed
    });
    return (
      <div className={todoItemClass} id="TodosItem">
        <Checkbox checked={this.props.completed}
                  onChange={e => this.updateTodo({completed: e.target.checked})}
        >
        </Checkbox>
        {
          this.props.editing ? Editing : Text
        }
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
});
const mapDispatchToProps = {
  editTodo,
  updateTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodosItem);