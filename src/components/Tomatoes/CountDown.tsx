import * as React from 'react';
import './CountDown.scss';

interface TCountDownProps {
  timer: number
  onFinish: () => any
  duration: number
}

interface TCountDownState {
  countDown: number
}

let timeID: any = null;

class CountDown extends React.Component<TCountDownProps, TCountDownState> {
  constructor(props: any) {
    super(props);
    this.state = {
      countDown: this.props.timer
    };
  }

  componentDidMount(): void {
    timeID = setInterval(() => {
      document.title = `${this.countDown} - 土豆烧牛肉`;
      const time = this.state.countDown;
      this.setState({countDown: time - 1000});
      if (time < 1000) {
        document.title = `土豆烧牛肉`;
        this.props.onFinish();
        clearInterval(timeID);
      }

    }, 1000);
  }

  componentWillUnmount(): void {
    clearInterval(timeID);
  }

  get countDown() {
    const mins = Math.floor(this.state.countDown / 1000 / 60);
    const seconds = Math.floor(this.state.countDown / 1000 % 60);
    return `${mins < 10 ? `0${mins}` : mins}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  render() {
    const percent = 1 - this.state.countDown / this.props.duration;
    return (
      <div className="CountDown" id="CountDown">
        <span style={{position: 'relative', zIndex: 1}}>
                  {this.countDown}
        </span>
        <div className="progress" style={{width: `${percent*100}%`}}/>
      </div>
    );
  }
}

export default CountDown;