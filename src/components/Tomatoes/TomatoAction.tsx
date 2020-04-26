import React from 'react';
import {Button} from 'antd';
import axios from '../../config/axios';
import {readdirSync} from 'fs';

class TomatoAction extends React.Component {


  tomatoStart = async () => {
    try {
      const response = await axios.post('tomatoes', {duration: 25 * 60 * 1000});
      console.log(response.data)
    } catch (e) {
      throw new Error(e);
    }
  };

  render() {
    return (
      <div className="TomatoAction" id="TomatoAction">
        <Button onClick={this.tomatoStart}>开始番茄</Button>
      </div>
    );
  }
}

export default TomatoAction;