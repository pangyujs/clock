import * as React from 'react';

interface SPloygonProps {
  data: any
  totalFinishedCount: any
}

class Ploygon extends React.Component<SPloygonProps> {
  constructor(props: any) {
    super(props);
  }

  point = () => {
    console.log(this.props.data);
    const dates = Object.keys(this.props.data).sort((a, b) => {
      return Date.parse(a) - Date.parse(b);
    });
    const firstDay = dates[0];
    console.log(firstDay);
    const range = new Date().getTime() - Date.parse(firstDay);
    console.log(range);
    if (firstDay) {
      let finishCount = 0;
      let finishY;
      const pointArray = dates.map(date => {
        const x = (Date.parse(date) - Date.parse(firstDay)) / range * 240;
        console.log(Date.parse(date) - Date.parse(firstDay));
        finishCount += this.props.data[date].length;
        console.log(this.props.totalFinishedCount);
        const y = (1 - finishCount / this.props.totalFinishedCount) * 60;
        finishY = y;
        return `${x},${y}`;
      });
      console.log(pointArray);
      return ['0,60', ...pointArray, `240,${finishY}`, '240,60'].join(' ');
    }
    return '0,60 240,60';
  };

  render() {
    return (
      <div className="Ploygon" id="Ploygon">
        <svg>
          <polygon fill="rgba(215,78,78,0.1)" stroke="rgba(215,78,78,0.5)" strokeWidth="1" points={this.point()}/>
        </svg>
      </div>
    );
  }
}

export default Ploygon;