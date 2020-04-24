import * as React from 'react';
import {Checkbox, Input} from 'antd';
import {DeleteOutlined, CheckOutlined} from '@ant-design/icons';
import './TodosItem.scss'
interface TTodosItemProps {
  id: number
  description: string
  completed: boolean
  editing: boolean
  update: (id: number, params: any) => void
  toEditing: (id: number) => void
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

  update = (todoOptions: any) => {
    this.props.update(this.props.id, todoOptions);
  };
  toEditing = () => {
    this.props.toEditing(this.props.id);
  };

  onKeyup = (e: any) => {
    if (e.keyCode === 13 && this.state.editText !== '') {
      this.update({description: this.state.editText});
    }
  };

  onClick = () => {
    if (this.state.editText !== '') {
      this.update({description: this.state.editText});
    }
  };

  render() {
    const Editing = (
      <div className="editing">
        <Input value={this.state.editText}
               onKeyUp={this.onKeyup}
               onChange={e => this.setState({editText: e.target.value})}
        />
        <span className="icon-wrapper">
          <CheckOutlined className="todo-item-icon"onClick={this.onClick}/>
          <DeleteOutlined className="todo-item-icon" onClick={e => this.update({deleted: true})}/>
        </span>
      </div>
    );

    const Text = <span onDoubleClick={this.toEditing}>{this.props.description}</span>;
    return (
      <div className="TodosItem" id="TodosItem">
        <Checkbox checked={this.props.completed}
                  onChange={e => this.update({completed: e.target.checked})}
        >
        </Checkbox>
        {
          this.props.editing ? Editing : Text
        }
      </div>
    );
  }
}

export default TodosItem;