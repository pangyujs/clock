import * as React from 'react';
import './Statistics.scss';
import {connect} from 'react-redux';
import Ploygon from './Ploygon';
import TodoHistory from './todohistory/TodoHistory';
// @ts-ignore
import _ from 'lodash';
import {format, parseISO} from 'date-fns';
import TomatoHistory from './tomatohistory/TomatoHistory';
import Echarts from './Echarts';
import {message} from 'antd';


interface SStatisticsProps {
  todos: any[]
  tomatoes: any[]
}

interface SStatisticsState {
  visible: any
}


class Statistics extends React.Component<SStatisticsProps, SStatisticsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: ''
    };
  }


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

  toggleHistory = (history: string) => {
    if (history === 'echarts') {
      this.setState({visible: <Echarts/>});
    } else if (history === 'tomatoes') {
      if(this.finishedTomatoes.length === 0){
        message.warning('还没有完成的牛肉')
      }else{
        this.setState({visible: <TomatoHistory/>});
      }
    } else if (history === 'todos') {
      if(this.finishedTodos.length === 0){
        message.warning('还没有完成的土豆')
      }else{
        this.setState({visible: <TodoHistory/>});
      }
    }
  };

  render() {
    console.log(this.finishedTodos.length);
    console.log(this.finishedTomatoes.length);
    return (
      <div className="Statistics" id="Statistics">
        <ul className="ulNode">
          <li onClick={() => this.toggleHistory('echarts')}>
            <h2>
              统计
            </h2>
            <div>
              <p style={{padding: '0', margin: '0'}}>{new Date().getMonth() + 1}月累积</p>
              <h1>{this.finishedTomatoes.length + this.finishedTodos.length}</h1>
            </div>
            <div className="echartsPloygon">
              <svg width="100%" height="60">
                  <rect fill="rgba(215,78,78,0.5)" x="84.39999999999999" y="0" width="16" height="60"></rect>
                  <rect fill="rgba(215,78,78,0.5)" x="115.2" y="50" width="16" height="20"></rect>
                  <rect fill="rgba(215,78,78,0.5)" x="146" y="40.00000000000001" width="16"
                        height="19.999999999999993"></rect>
                  <rect fill="rgba(215,78,78,0.5)" x="176.79999999999998" y="59" width="16" height="1"></rect>
                  <rect fill="rgba(215,78,78,0.5)" x="207.6" y="59" width="16" height="10"></rect>
                  <rect fill="rgba(215,78,78,0.5)" x="238.4" y="59" width="16" height="1"></rect>
                  <rect fill="rgba(215,78,78,0.5)" x="269.2" y="59" width="16" height="1"></rect>
              </svg>
            </div>
          </li>
          <li onClick={() => this.toggleHistory('tomatoes')}>
            <h2>
              牛肉历史
            </h2>
            <div>
              <p style={{padding: '0', margin: '0'}}>累计烧成牛肉:</p>
              <h1>{this.finishedTomatoes.length}</h1>
            </div>
            <Ploygon data={this.dailyTomato} totalFinishedCount={this.finishedTomatoes.length}/>
          </li>
          <li onClick={() => this.toggleHistory('todos')}>
            <h2>
              土豆历史
            </h2>
            <div>
              <p style={{padding: '0', margin: '0'}}>累计炖成土豆:</p>
              <h1>{this.finishedTodos.length}</h1>
            </div>
            <Ploygon data={this.dailyTodo} totalFinishedCount={this.finishedTodos.length}/>
          </li>
        </ul>
        {
          this.state.visible
        }
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

