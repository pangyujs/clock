import React from 'react';
import {Button, Input} from 'antd';
import axios from '../../config/axios';
import CountDown from './CountDown';
import {start} from 'repl';

interface TTomatoActionProps {
  tomatoStart: () => void
  unfinishedTomato: any
  updateTomato: (payload: any) => any
}

interface TTomatoActionState {
  description: string
}

class TomatoAction extends React.Component<TTomatoActionProps, TTomatoActionState> {
  constructor(props: any) {
    super(props);
    this.state = {
      description: ''
    };
  }

  addDescription = async () => {
    try {
      const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`, {
        description: this.state.description,
        ended_at: new Date()
      });
      this.props.updateTomato(response.data.resource);
      this.setState({description: ''});
    } catch (e) {
      throw new Error(e);
    }
  };

  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.description !== '') {
      this.addDescription();
    }
  };

  render() {
    let html = <div/>;
    if (this.props.unfinishedTomato === undefined) {
      html = <Button onClick={() => this.props.tomatoStart()}>开始番茄</Button>;
    } else {
      const startAt = Date.parse(this.props.unfinishedTomato.started_at);
      const duration = this.props.unfinishedTomato.duration;
      const timeNow = new Date().getTime();
      if (timeNow - startAt > duration) {
        html = <div>
          <Input value={this.state.description}
                 onChange={(e) => this.setState({description: e.target.value})}
                 onKeyUp={this.onKeyUp}
                 placeholder="请输入刚刚完成的任务"
          />
        </div>;
      } else if (timeNow - startAt < duration) {
        const timer = duration - (timeNow - startAt);
        html = <CountDown timer={timer}/>;
      }
    }
    return (
      <div className="TomatoAction" id="TomatoAction">
        {html}
      </div>
    );
  }
}

export default TomatoAction;