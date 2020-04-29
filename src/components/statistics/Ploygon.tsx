import * as React from 'react';

interface SPloygonProps {
  data: any
  totalFinishedCount: any
}

class Ploygon extends React.Component<SPloygonProps> {
  point = () => {
    const dates = Object.keys(this.props.data).sort((a, b) => {
      return Date.parse(a) - Date.parse(b);
    });
    const firstDay = dates[0];
    const range = new Date().getTime() - Date.parse(firstDay);
    if (firstDay) {
      let finishCount = 0;
      let finishY;
      const pointArray = dates.map(date => {
        const x = (Date.parse(date) - Date.parse(firstDay)) / range * 300;
        finishCount += this.props.data[date].length;
        const y = (1 - finishCount / this.props.totalFinishedCount) * 60;
        finishY = y;
        return `${x},${y}`;
      });
      return ['0,60', ...pointArray, `300,${finishY}`, '300,60'].join(' ');
    }
    return '0,60 300,60';
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