import * as React from 'react';
import {Checkbox} from 'antd';

interface TTodosItemProps {
  id: number
  description: string
  completed: boolean
  update: (id: number, params: any) => void

}

class TodosItem extends React.Component<TTodosItemProps> {
  constructor(props: TTodosItemProps) {
    super(props);
    console.log(this.props);
  }

  update = (todoOptions: any) => {
    this.props.update(this.props.id, todoOptions);
  };

  render() {
    return (
      <div className="TodosItem" id="TodosItem">
        <Checkbox checked={this.props.completed}
                  onChange={e => this.update({completed: e.target.checked})}
        >
        </Checkbox>
        <span>{this.props.description}</span>
      </div>
    );
  }
}

export default TodosItem;