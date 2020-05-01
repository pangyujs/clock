import * as React from 'react';
import ReactEcharts from 'echarts-for-react';
import {connect} from 'react-redux';
import {format, parseISO} from 'date-fns';
// @ts-ignore
import _ from 'lodash';

interface SEchartsProps {
  tomatoes: any[]
  todos: any[]
}

interface SEchartsState {
  days: object
  todosData: any
  tomatoesData: any
}

class Echarts extends React.Component<SEchartsProps, SEchartsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      days: [],
      todosData: [],
      tomatoesData: []
    };
  }


  get finishedTodos() {
    return this.props.todos.filter((todo: any) => todo.completed && !todo.deleted);
  }

  get dailyFinishedTodos() {
    return _.groupBy(this.finishedTodos, (todo: any) => {
      return format(parseISO(todo.completed_at), 'd');
    });
  }

  get todoDate() {
    return Object.keys(this.dailyFinishedTodos);
  }

  get finishedTomatoes() {
    return this.props.tomatoes.filter((tomato: any) => tomato.ended_at && !tomato.aborted);
  }


  get dailyFinishedTomatoes() {
    const dd = _.groupBy(this.finishedTomatoes, (tomato: any) => {
      return format(parseISO(tomato.ended_at), 'd');
    });
    console.log(dd)
    return dd
  }

  get todoMonth() {
    if(this.finishedTodos[0]){
      return format(parseISO(this.finishedTodos[0].completed_at), 'M');
    }
  }

  get tomatoMonth() {
    if(this.finishedTomatoes[0]){
      return format(parseISO(this.finishedTomatoes[0].ended_at), 'M');
    }
  }

  get tomatoDate() {
    return Object.keys(this.dailyFinishedTomatoes);
  }

  getOption = () => {
    return {
      title: {
        text: '汇总统计',
        subtext: `${new Date().getMonth()+1}月汇总`
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['土豆', '牛肉']
      },
      toolbox: {
        show: true,
        feature: {
          magicType: {show: true, type: ['line', 'bar']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: this.state.days
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '土豆',
          type: 'bar',
          data: this.state.todosData,
          itemStyle: {
            normal: {
              color: '#EBA6A6'
            }
          }
        },
        {
          name: '牛肉',
          type: 'bar',
          data: this.state.tomatoesData,
          itemStyle: {
            normal: {
              color: '#1890FF'
            }
          }
        }
      ]
    };
  };

  componentDidMount() {
    const baseDays = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'
      , '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'];
    let todosData = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
    let tomatoesData = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
    const nowMonth = new Date().getMonth() + 1;
    if ([1, 3, 5, 7, 8, 10, 12].indexOf(nowMonth) >= 0) {
      this.setState({days: [...baseDays, '29', '30', '31']});
      todosData.push('0', '0', '0');
      tomatoesData.push('0', '0', '0');
    } else if ([4, 6, 9, 11].indexOf(nowMonth) >= 0) {
      this.setState({days: [...baseDays, '29', '30']});
      todosData.push('0', '0');
      tomatoesData.push('0', '0');
    } else if (nowMonth === 2) {
      this.setState({days: [...baseDays]});
    }

    if (this.todoMonth && this.todoMonth === nowMonth.toString()) {
      this.todoDate.forEach((date: any) => {
        todosData[date - 1] = this.dailyFinishedTodos[date].length;
      });
    }
    if (this.tomatoMonth && this.tomatoMonth === nowMonth.toString()) {
      this.tomatoDate.forEach((date: any) => {
        tomatoesData[date - 1] = this.dailyFinishedTomatoes[date].length;
      });
    }

    this.setState({todosData: [...todosData]});
    this.setState({tomatoesData: [...tomatoesData]});

  }

  render() {
    return (
      <div className="Echarts" id="Echarts">
        <ReactEcharts option={this.getOption()}/>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  tomatoes: state.tomatoes,
  todos: state.todos,
  ...ownProps
});


export default connect(mapStateToProps)(Echarts);
