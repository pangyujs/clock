import * as React from 'react';
import TodosInput from './TodosInput';
import axios from '../../config/axios';
import './Todos.scss';
import {connect} from 'react-redux';
import TodosItem from './TodosItem';
import {initTodos} from '../../redux/actions/actions';
class Todos extends React.Component<any> {
  componentDidMount() {
    this.getTodos();
  }

  get onDeletedTodos() {
    return this.props.todos.filter((todo:any) => !todo.deleted);
  }

  get onCompletedTodos() {
    return this.onDeletedTodos.filter((todo:any) => !todo.completed);
  }

  get completedTodos() {
    return this.props.todos.filter((todo:any) => todo.completed);
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

  render() {
    return (
      <div className="Todos" id="Todos">
        <TodosInput/>
        <div className="todoList">
          {
            this.onCompletedTodos.map((todo:any) =>
              <TodosItem key={todo.id}
                         {...todo}
             />)
          }
          {
            this.completedTodos.map((todo :any)=>
              <TodosItem key={todo.id}
                         {...todo}
              />)
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  ...ownProps
});
const mapDispatchToProps = {
  initTodos
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);