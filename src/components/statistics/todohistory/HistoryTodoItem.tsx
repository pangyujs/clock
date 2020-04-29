import * as React from 'react';
import {format, parseISO} from 'date-fns';
import './HistoryTodoItem.scss';
import {connect} from 'react-redux';
import {updateTodo} from '../../../redux/actions/todos';
import axios from '../../../config/axios'
interface SHistoryTodoItemProps {
  todo: any
  updated_at: any
  description: string
  itemType: string
  updateTodo: (payload:any) => any
}

class HistoryTodoItem extends React.Component<SHistoryTodoItemProps> {
  updateTodo = async (updateData:any)=>{
   try {
     const response = await axios.put(`todos/${this.props.todo.id}`,updateData)
     this.props.updateTodo(response.data.resource)
   }catch (e) {
     throw new Error(e)
   }
}
  render() {
    let action, time;
    if (this.props.itemType === 'finished') {
      time = this.props.todo.updated_at;
      action = (<div className="action">
        <span onClick={()=>this.updateTodo({completed:false})}>恢复</span>
        <span onClick={()=>this.updateTodo({deleted:true})}>删除</span>
      </div>);
    } else if (this.props.itemType === 'deleted') {
      time = this.props.todo.created_at;
      action = (<div className="action">
        <span onClick={()=>this.updateTodo({deleted:false})}>恢复</span>
      </div>);
    }
    return (
      <div className="HistoryTodoItem" id="HistoryTodoItem">
        <div className="text">
          <span>{format(parseISO(time), 'HH:mm')}:</span>
          <span>{this.props.todo.description}</span>
        </div>
        {action}
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
});
const mapDispatchToProps = {
  updateTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTodoItem);

