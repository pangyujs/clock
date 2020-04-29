import * as React from 'react';
import {connect} from 'react-redux';
// @ts-ignore
import _ from 'lodash';
import {format, parseISO} from 'date-fns';
import {Tabs} from 'antd';
import './TodoHistory.scss';
import HistoryTodoItem from './HistoryTodoItem';

const {TabPane} = Tabs;

interface STodoHistoryProps {
  todos: any[]
}

class TodoHistory extends React.Component<STodoHistoryProps> {
  get finishedTodos() {
    return this.props.todos.filter((todo: any) => todo.completed && !todo.deleted);
  }

  get deletedTodos() {
    return this.props.todos.filter((todo: any) => todo.deleted);
  }

  get dailyFinishedTodos() {
    return _.groupBy(this.finishedTodos, (todo: any) => {
      return format(parseISO(todo.completed_at), 'yyyy-MM-d');
    });
  }

  get dailyDeletedTodos() {
    return _.groupBy(this.deletedTodos, (todo: any) => {
      return format(parseISO(todo.updated_at), 'yyyy-MM-d');
    });
  }

  weekDays = (date: any) => {
    const weekDay:any = {
      'Monday': '周一',
      'Tuesday': '周二',
      'Wednesday': '周三',
      'Thursday': '周四',
      'Friday': '周五',
      'Saturday': '周六',
      'Sunday': '周日',
    };
    const englishWeek = format(parseISO(date), 'eeee');
    return weekDay[`${englishWeek}`];
  };


  get finishedDates() {
    return Object.keys(this.dailyFinishedTodos).sort((a, b) =>
      Date.parse(b) - Date.parse(a));
  }

  get deletedDates() {
    return Object.keys(this.dailyDeletedTodos).sort((a, b) =>
      Date.parse(b) - Date.parse(a));
  }

  render() {
    const finishedTodoList = this.finishedDates.map(date => {
      return (
        <div key={date} className="dailyTodos">
          <div className="todosTitle">
            <p>
              <span className="date">{date}</span>
              <span className="week">{ this.weekDays(date) }</span>
            </p>
            <p className="mission">
              炖成了 {this.dailyFinishedTodos[date].length} 个土豆
            </p>
          </div>
          <div className="todosBody">
            {
              this.dailyFinishedTodos[date].map((todo: any) =>
                <HistoryTodoItem itemType="finished" key={todo.id} todo={todo}/>)
            }
          </div>
        </div>
      );
    });
    const deletedTodoList = this.deletedDates.map(date => {
      return (
        <div key={date} className="dailyTodos">
          <div className="todosTitle">
            <p>
              <span className="date">{date}</span>
              <span className="week">{ this.weekDays(date) }</span>
            </p>
            <p className="mission">
              扔掉了 {this.dailyDeletedTodos[date].length} 个土豆
            </p>
          </div>
          <div className="todosBody">
            {
              this.dailyDeletedTodos[date].map((todo: any) =>
                <HistoryTodoItem itemType="deleted" key={todo.id} todo={todo}/>)
            }
          </div>
        </div>
      );
    });
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="已完成的任务" key="1">
          <div className="TodoHistory" id="TodoHistory">
            {finishedTodoList}
          </div>
        </TabPane>
        <TabPane tab="已删除的任务" key="2">
          <div className="TodoHistory" id="TodoHistory">
            {deletedTodoList}
          </div>
        </TabPane>
      </Tabs>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  ...ownProps
});


export default connect(mapStateToProps)(TodoHistory);

