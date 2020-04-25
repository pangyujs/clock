import * as React from 'react';
import TodosInput from './TodosInput';
import axios from '../../config/axios';
import './Todos.scss';
import {connect} from 'react-redux';
import TodosItem from './TodosItem';
import {addTodo} from '../../redux/actions';

interface TTodosState {
  todos: any[]
}

class Todos extends React.Component<any, TTodosState> {
  constructor(props: any) {
    super(props);
    this.state = {
      todos: []
    };
  }

  addTodo = async (todoData: any) => {
    const {todos} = this.state;
    try {
      const response = await axios.post('todos', todoData);
      this.setState({todos: [response.data.resource, ...todos]});
    } catch (e) {
      throw new Error(e);
    }
  };

  componentDidMount() {
    this.getTodos();
  }

  get onDeletedTodos() {
    return this.state.todos.filter(todo => !todo.deleted);
  }

  get onCompletedTodos() {
    return this.onDeletedTodos.filter(todo => !todo.completed);
  }

  get completedTodos() {
    return this.state.todos.filter(todo => todo.completed);
  }

  getTodos = async () => {
    try {
      const response = await axios.get('todos');
      const todos = response.data.resources.map((todo: any) => Object.assign({}, todo, {editing: false}));
      this.setState({todos});
    } catch (e) {
      throw new Error(e);
    }
  };

  updateTodo = async (id: number, todoData: any) => {
    const {todos} = this.state;
    try {
      const response = await axios.put(`todos/${id}`, todoData);
      const newTodo = todos.map(todo => {
        if (todo.id === id) {
          return response.data.resource;
        } else {
          return todo;
        }
      });
      this.setState({todos: newTodo});
    } catch (e) {
      throw new Error(e);
    }
  };


  toEditing = (id: number) => {
    const {todos} = this.state;
    const newTodos = todos.map(todo => {
      if (id === todo.id) {
        return Object.assign({}, todo, {editing: true});
      } else {
        return Object.assign({}, todo, {editing: false});
      }
    });
    this.setState({todos: newTodos});
  };

  render() {
    console.log(this.state.todos);
    console.log(this.onDeletedTodos);
    console.log(this.onCompletedTodos);
    return (
      <div className="Todos" id="Todos">
        <TodosInput/>
        <div className="todoList">
          {
            this.onCompletedTodos.map(todo =>
              <TodosItem key={todo.id}
                         {...todo}
                         toEditing={this.toEditing}
                         update={this.updateTodo}/>)
          }
          {
            this.completedTodos.map(todo =>
              <TodosItem key={todo.id}
                         {...todo}
                         toEditing={this.toEditing}
                         update={this.updateTodo}/>)
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
  addTodo
}

export default connect(mapStateToProps)(Todos);