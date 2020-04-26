import React from 'react';
import {Button} from 'antd';


interface TTomatoActionProps {
  tomatoStart: () => void
}
class TomatoAction extends React.Component<TTomatoActionProps> {

  constructor(props:any) {
    super(props);

  }


  render() {
    return (
      <div className="TomatoAction" id="TomatoAction">
        <Button onClick={()=>this.props.tomatoStart()}>开始番茄</Button>
      </div>
    );
  }
}

export default TomatoAction;