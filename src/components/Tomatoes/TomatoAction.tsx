import React from 'react';
import {Button, Input} from 'antd';
import axios from '../../config/axios';
import CountDown from './CountDown';
import {CloseCircleOutlined} from '@ant-design/icons';
import './TomatoAction.scss';
import {Modal} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';

const {confirm} = Modal;

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


  showConfirm = () => {
    confirm({
      title: '你正在烧特别香的牛肉, 你忍心取消?',
      icon: <ExclamationCircleOutlined/>,
      onOk: () => {
        this.abortTomato();
      },
      onCancel() {},
      okText: '确定',
      cancelText: '取消'
    });
  };


  updateTomato = async (tomatoData: any) => {
    try {
      const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`, tomatoData);
      this.props.updateTomato(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };

  abortTomato = () => {
    document.title = '土豆烧牛肉';
    this.updateTomato({aborted: true});
  };
  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.description !== '') {
      this.updateTomato({description: this.state.description, ended_at: new Date()});
      this.setState({description: ''});
    }
  };

  onFinish = () => {
    this.forceUpdate();
  };

  render() {
    let html = <div/>;
    if (this.props.unfinishedTomato === undefined) {
      html = <div className="button-wrapper">
        <Button onClick={() => this.props.tomatoStart()}>开始烧牛肉</Button>
      </div>;
    } else {
      const startAt = Date.parse(this.props.unfinishedTomato.started_at);
      const duration = this.props.unfinishedTomato.duration;
      const timeNow = new Date().getTime();
      if (timeNow - startAt > duration) {
        html = <div className="input-wrapper">
          <Input value={this.state.description}
                 onChange={(e) => this.setState({description: e.target.value})}
                 onKeyUp={this.onKeyUp}
                 placeholder="请说出刚刚烧的牛肉味道怎么样"
          />
          <CloseCircleOutlined className="closeIcon" onClick={this.showConfirm}/>
        </div>;
      } else if (timeNow - startAt < duration) {
        const timer = duration - timeNow + startAt;
        html = <div className="countDown-wrapper">
          <CountDown timer={timer} onFinish={this.onFinish} duration={duration}/>
          <CloseCircleOutlined className="closeIcon" onClick={this.showConfirm}/>
        </div>;
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