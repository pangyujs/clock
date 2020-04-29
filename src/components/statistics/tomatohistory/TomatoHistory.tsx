import * as React from 'react';
import {connect} from 'react-redux';
// @ts-ignore
import _ from 'lodash';
import {format, parseISO} from 'date-fns';
import {Tabs} from 'antd';
import './TomatoHistory.scss';
import HistoryTomatoItem from './HistoryTomatoItem';

const {TabPane} = Tabs;

interface STodoHistoryProps {
  tomatoes: any[]
}

class TomatoHistory extends React.Component<STodoHistoryProps> {
  get finishedTomatoes() {
    return this.props.tomatoes.filter((tomato: any) => tomato.ended_at && !tomato.aborted);
  }

  get dailyFinishedTomatoes() {
    return _.groupBy(this.finishedTomatoes, (tomato: any) => {
      return format(parseISO(tomato.ended_at), 'yyyy-MM-d');
    });
  }

  get finishedDates() {
    return Object.keys(this.dailyFinishedTomatoes).sort((a, b) =>
      Date.parse(b) - Date.parse(a));
  }

  get abortedTomatoes() {
    return this.props.tomatoes.filter((tomato: any) => tomato.aborted);
  }

  get dailyAbortedTomatoes() {
    return _.groupBy(this.abortedTomatoes, (tomato: any) => {
      return format(parseISO(tomato.created_at), 'yyyy-MM-d');
    });
  }

  get abortedDates() {
    return Object.keys(this.dailyAbortedTomatoes).sort((a, b) =>
      Date.parse(b) - Date.parse(a));
  }

  render() {
    console.log(this.dailyAbortedTomatoes)
    const finishedTomatoList = this.finishedDates.map(date => {
      return (
        <div key={date} className="dailyTodos">
          <div className="todosTitle">
            <p>
              <span className="date">{date}</span>
              <span className="week">周五</span>
            </p>
            <p className="mission">
              完成了 {this.dailyFinishedTomatoes[date].length} 个番茄
            </p>
          </div>
          <div className="todosBody">
            {
              this.dailyFinishedTomatoes[date].map((todo: any) =>
                <HistoryTomatoItem itemType="finished" key={todo.id} todo={todo}/>)
            }
          </div>
        </div>
      );
    });
    const abortedTomatoList = this.abortedDates.map(date => {
      return (
        <div key={date} className="dailyTodos">
          <div className="todosTitle">
            <p>
              <span className="date">{date}</span>
            </p>
            <p className="mission">
              中止了 {this.dailyAbortedTomatoes[date].length} 个番茄
            </p>
          </div>
        </div>
      );
    });
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="已完成的任务" key="1">
          <div className="TomatoHistory" id="TomatoHistory">
            {finishedTomatoList}
          </div>
        </TabPane>
        <TabPane tab="已删除的任务" key="2">
          <div className="TomatoHistory" id="TomatoHistory">
            {abortedTomatoList}
          </div>
        </TabPane>
      </Tabs>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  tomatoes: state.tomatoes,
  ...ownProps
});


export default connect(mapStateToProps)(TomatoHistory);

