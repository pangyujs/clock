import * as React from 'react';
import {format,parseISO} from 'date-fns';
import './TomatoList.scss'
interface TTomatoListProps {
  finishedTomatoes: any
}

const TomatoItem = (props:any) => {
  return (
    <div className="TomatoItem">
      <span>{format(parseISO(props.started_at), 'HH:mm')}-{format(parseISO(props.ended_at), 'HH:mm')} :</span>
      <span>{props.description}</span>
    </div>
  );
};

class TomatoList extends React.Component<TTomatoListProps> {

  componentDidMount(): void {
    console.log(this.props.finishedTomatoes);
  }

  get dates() {
    const dates = Object.keys(this.props.finishedTomatoes);
    return dates.sort((a, b) => Date.parse(b) - Date.parse(a)).splice(0,3);
  }

  render() {
    const list = this.dates.map(date => {
      const tomatoes = this.props.finishedTomatoes[date];
      console.log(tomatoes);
      return (
        <div key={date}>
          <div className="title">
            <span>{date}</span>
            <span>烧了 {tomatoes.length} 个土豆牛肉</span>
          </div>
          {
            tomatoes.map((tomato:any)=><TomatoItem key={tomato.id} {...tomato} />)
          }
        </div>
      );
    });
    return (
      <div className="TomatoList" id="TomatoList">
        {list}
      </div>
    );
  }
}

export default TomatoList;