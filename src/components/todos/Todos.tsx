import * as React from 'react';
import TodosInput from './TodosInput';
import axios from '../../config/axios';
import './Todos.scss';
import TodosItem from './TodosItem';

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
      console.log(response);
      this.setState({todos: [response.data.resource, ...todos]});
    } catch (e) {
      throw new Error(e);
    }
  };

  componentDidMount() {
    this.getTodos();
  }

  getTodos = async () => {
    try {
      const response = await axios.get('todos');
      this.setState({todos: response.data.resources});
    } catch (e) {
      throw new Error(e);
    }
  };

  updateTodo = async (id: number, todoData: any) => {
    console.log(todoData);
    const {todos} = this.state;
    try {
      const response = await axios.put(`todos/${id}`, todoData);
      console.log(response);
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


  render() {
    return (
      <div className="Todos" id="Todos">
        <TodosInput addTodo={(todoData: any) => this.addTodo(todoData)}/>
        <main>
          {
            this.state.todos.map(todo => <TodosItem key={todo.id} {...todo} update={this.updateTodo}/>)
          }
        </main>
      </div>
    );
  }
}

export default Todos;