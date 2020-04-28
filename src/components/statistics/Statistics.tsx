import * as React from 'react';
import './Statistics.scss'
import {connect} from 'react-redux';

interface SStatisticsProps {
  todos: any[]
}

class Statistics  extends React.Component<SStatisticsProps> {

  get finishedTodos(){
    console.log(this.props.todos);
    return this.props.todos.filter(todo=> todo.completed && !todo.deleted)
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
            {this.finishedTodos.length}
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  ...ownProps
});


export default connect(mapStateToProps)(Statistics);

