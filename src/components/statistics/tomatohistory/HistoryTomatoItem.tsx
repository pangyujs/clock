import * as React from 'react';
import {format, parseISO} from 'date-fns';
import './HistoryTomatoItem.scss';
import {connect} from 'react-redux';
import {Modal, Input, message} from 'antd';
import axios from '../../../config/axios';
import {updateTomato} from '../../../redux/actions/tomatoes';

interface SHistoryTodoItemProps {
  tomato: any
  description: string
  itemType: string
  updateTomato: (payload: any) => any
}

interface SHistoryTodoItemState {
  visible: boolean
  description: string
}

class HistoryTomatoItem extends React.Component<SHistoryTodoItemProps, SHistoryTodoItemState> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      description: ''
    };
  }

  updateTomato = async (updateData: any) => {
    try {
      const response = await axios.put(`tomatoes/${this.props.tomato.id}`, updateData);
      this.props.updateTomato(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };
  onKeyUp = (e: any) => {
    if (this.state.description === '') {
      message.warning('您还没有输入修改的内容',1);
    } else if (e.keyCode === 13) {
      this.updateTomato({description: this.state.description});
      this.setState({
        visible: false
      });
    }
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    if (this.state.description !== '') {
      this.updateTomato({description: this.state.description});
    }
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    let action, time;
    if (this.props.itemType === 'finished') {
      time = this.props.tomato.ended_at;
      action = (<div className="action">
        <span onClick={this.showModal}>修改</span>
      </div>);
    }
    return (
      <div className="HistoryTomatoItem" id="HistoryTomatoItem">
        <div className="text">
          <span>{format(parseISO(time), 'HH:mm')}:</span>
          <span>{this.props.tomato.description}</span>
        </div>
        {action}
        <Modal
          title="修改描述"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="取消"
          okText="确定"
        >
          <Input placeholder="请输入修改的值"
                 value={this.state.description}
                 onChange={(e) => this.setState({description: e.target.value})}
                 onKeyUp={this.onKeyUp}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
});
const mapDispatchToProps = {
  updateTomato
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTomatoItem);

