import * as React from 'react';


interface TCountDownProps {
  timer: number
  onFinish: () => any
}

interface TCountDownState {
  countDown: number
}

let timeID:any = null;
class CountDown extends React.Component<TCountDownProps, TCountDownState> {
  constructor(props: any) {
    super(props);
    this.state = {
      countDown: this.props.timer
    };
  }

  componentDidMount(): void {
    timeID = setInterval(() => {
      const time = this.state.countDown;
      this.setState({countDown: time - 1000});
      if(time < 0){
        this.props.onFinish();
        clearInterval(timeID)
      }

    }, 1000);
  }

  componentWillUnmount(): void {
    clearInterval(timeID)
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