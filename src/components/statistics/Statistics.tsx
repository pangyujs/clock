import * as React from 'react';
import './Statistics.scss';
import {connect} from 'react-redux';
import Ploygon from './Ploygon';
import TodoHistory from './todohistory/TodoHistory';
// @ts-ignore
import _ from 'lodash';
import {format, parseISO} from 'date-fns';
import TomatoHistory from './tomatohistory/TomatoHistory';


interface SStatisticsProps {
  todos: any[]
  tomatoes: any[]
}

class Statistics extends React.Component<SStatisticsProps> {

  get finishedTomatoes() {
    return this.props.tomatoes.filter(tomato => tomato.description && !tomato.aborted);
  }

  get dailyTomato() {
    return _.groupBy(this.finishedTomatoes, (tomato: any) => {
      return format(parseISO(tomato.ended_at), 'yyyy-MM-d');
    });
  }

  get finishedTodos() {
    return this.props.todos.filter(todo => todo.completed && !todo.deleted);
  }

  get dailyTodo() {
    return _.groupBy(this.finishedTodos, (todo: any) => {
      return format(parseISO(todo.completed_at), 'yyyy-MM-d');
    });
  }

  toTodoHistory = (description: string) => {
    if (description === 'todos') {
      return <TodoHistory/>;
    }
  };

  render() {
    const TodoHistoryUser = this.toTodoHistory;
    return (
      <div className="Statistics" id="Statistics">
        <ul>
          <li>统计</li>
          <li>
            <h2>
              番茄历史
            </h2>
            <div>
              <p style={{padding: '0', margin: '0'}}>累计完成番茄:</p>
              <h1>{this.finishedTomatoes.length}</h1>
            </div>
            <Ploygon data={this.dailyTomato} totalFinishedCount={this.finishedTomatoes.length}/>
          </li>
          <li onClick={()=>this.toTodoHistory('todos')}>
            <h2>
              任务历史
            </h2>
            <div>
              <p style={{padding: '0', margin: '0'}}>累计完成任务:</p>
              <h1>{this.finishedTodos.length}</h1>
            </div>
            <Ploygon data={this.dailyTodo} totalFinishedCount={this.finishedTodos.length}/>
          </li>
        </ul>
        <TomatoHistory/>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  tomatoes: state.tomatoes,
  todos: state.todos,
  ...ownProps
});


export default connect(mapStateToProps)(Statistics);

