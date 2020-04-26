import React from 'react';
import './Tomatoes.scss';
import TomatoAction from './TomatoAction';
import {connect} from 'react-redux';
import {addTomato, initTomatoes, updateTomato} from '../../redux/actions/tomatoes';
import axios from '../../config/axios';

interface TTomatoes {
  addTomato: (payload: Object) => Object
  tomatoes: any[]
  initTomatoes: (payload:any) => any
  updateTomato: (payload:any) => any
}

class Tomatoes extends React.Component<TTomatoes> {

  componentDidMount(){
    this.getTomatoes();
  }

  get unfinishedTomato() {
    return this.props.tomatoes.filter(tomato => !tomato.decription && !tomato.ended_at)[0];
  }

  getTomatoes = async () => {
    try {
      const response = await axios.get('tomatoes');
      this.props.initTomatoes(response.data.resources);
    } catch (e) {
      throw new Error(e);
    }
  };
  tomatoStart = async () => {
    try {
      const response = await axios.post('tomatoes', {duration: 25 * 60 * 1000});
      this.props.addTomato(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };

  render() {
    return (
      <div className="Tomatoes" id="Tomatoes">
        <TomatoAction tomatoStart={this.tomatoStart}
                      updateTomato={this.props.updateTomato}
                      unfinishedTomato={this.unfinishedTomato}

        />

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
  initTomatoes,
  updateTomato
};

export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes);