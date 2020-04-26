import * as React from 'react';


interface TCountDownProps {
  timer: number
}

interface TCountDownState {
  countDown: number
}

class CountDown extends React.Component<TCountDownProps, TCountDownState> {
  constructor(props: any) {
    super(props);
    this.state = {
      countDown: this.props.timer
    };
  }

  componentDidMount(): void {
    setInterval(() => {
      const time = this.state.countDown;
      this.setState({countDown: time - 1000});
      if(time < 0){
        // 告诉父组件可以停止了
      }

    }, 1000);
  }

  render() {
    const mins = Math.floor(this.state.countDown / 1000 / 60);
    const seconds = Math.floor(this.state.countDown / 1000 % 60);
    const time = `${mins}:${seconds < 10 ? `0${seconds}` : seconds}`;
    return (
      <div className="CountDown" id="CountDown">
        {time}
      </div>
    );
  }
}

export default CountDown;