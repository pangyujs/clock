import * as React from 'react';
import './Statistics.scss';
import {connect} from 'react-redux';
import Ploygon from './Ploygon';
import TodoHistory from './history/TodoHistory';
// @ts-ignore
import _ from 'lodash';
import {format, parseISO} from 'date-fns';


interface SStatisticsProps {
  todos: any[]
}

class Statistics extends React.Component<SStatisticsProps> {

  get finishedTodos() {
    return this.props.todos.filter(todo => todo.completed && !todo.deleted);
  }

  get dailyTodo() {
    const obj = _.groupBy(this.finishedTodos, (todo: any) => {
      return format(parseISO(todo.completed_at), 'yyyy-MM-d');
    });
    console.log(obj);
    return obj;
  }

  render() {
    return (
      <div className="Statistics" id="Statistics">
        <ul>
          <li>统计</li>
          <li>目标</li>
          <li>番茄历史</li>
          <li>
            任务历史
            累计完成了 {this.finishedTodos.length} 个任务

            <Ploygon data={this.dailyTodo} totalFinishedCount={this.finishedTodos.length}/>
          </li>
        </ul>
        <TodoHistory/>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  ...ownProps
});


export default connect(mapStateToProps)(Statistics);

