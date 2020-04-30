import React from 'react';
import './Tomatoes.scss';
import TomatoAction from './TomatoAction';
import {connect} from 'react-redux';
import {addTomato, updateTomato} from '../../redux/actions/tomatoes';
import axios from '../../config/axios';
import TomatoList from './TomatoList';
// @ts-ignore
import _ from 'lodash';
import {format, parseISO} from 'date-fns';
import EmptySvg from '../emptysvg/EmptySvg';

interface TTomatoes {
  addTomato: (payload: Object) => Object
  tomatoes: any[]
  initTomatoes: (payload: any) => any
  updateTomato: (payload: any) => any
}

class Tomatoes extends React.Component<TTomatoes> {

  get unfinishedTomato() {
    return this.props.tomatoes.filter(tomato => !tomato.description && !tomato.ended_at && !tomato.aborted)[0];
  }

  get finishedTomato() {
    const finishTomatoes = this.props.tomatoes.filter(tomato => tomato.description && tomato.ended_at && !tomato.aborted);
    const tomatoDate = _.groupBy(finishTomatoes, (tomato: any) => {
        return format(parseISO(tomato.started_at), 'yyyy-MM-d');
      }
    );
    return tomatoDate;
  }

  tomatoStart = async () => {
    try {
      const response = await axios.post('tomatoes', {duration: 25 * 60 * 1000});
      this.props.addTomato(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };

  get onlineTomatoes(){
    return this.props.tomatoes.filter(tomato=>!tomato.aborted)
  }

  render() {
    return (
      <div className="Tomatoes" id="Tomatoes">
        <TomatoAction tomatoStart={this.tomatoStart}
                      updateTomato={this.props.updateTomato}
                      unfinishedTomato={this.unfinishedTomato}

        />
        {
          this.onlineTomatoes.length === 0 ?
            <EmptySvg/>:
            <TomatoList finishedTomatoes={this.finishedTomato}/>
        }

      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  tomatoes: state.tomatoes,
  ...ownProps
});
const mapDispatchToProps = {
  addTomato,
  updateTomato
};

export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes);