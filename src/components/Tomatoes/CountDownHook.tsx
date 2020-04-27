import React, {useState, useEffect, FunctionComponent} from 'react';

interface TCountDownProps {
  timer: number
  onFinish: () => any
}

let timeID: any = null;

const CountDownHook: FunctionComponent<TCountDownProps> = (props) => {
  const [countDown, setCountDown] = useState(props.timer);

  const min = Math.floor(countDown / 1000 / 60);
  const seconds = Math.floor(countDown / 1000 % 60);
  const time = `${min}:${seconds < 10 ? `0${seconds}` : seconds}`;

  useEffect(() => {
    document.title = `${time} - 土豆烧牛肉`;
    timeID = setInterval(() => {
      setCountDown(countDown - 1000);
      if (countDown < 0) {
        props.onFinish();
        document.title = `土豆烧牛肉`;
        clearInterval(timeID);
      }
    }, 1000);
    return function cleanup(){
      clearInterval(timeID)
    }
  });


  return (
    <div>
      {time}
    </div>
  )
};

export default CountDownHook;