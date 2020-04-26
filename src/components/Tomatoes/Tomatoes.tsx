import React from 'react';
import './Tomatoes.scss';
import TomatoAction from './TomatoAction';
import {connect} from 'react-redux';
import {addTomato, initTomatoes} from '../../redux/actions/tomatoes';
import axios from '../../config/axios';

interface TTomatoes {
  addTomato: (payload: Object) => Object
}

class Tomatoes extends React.Component<TTomatoes> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  componentDidMount(): void {
    this.getTomatoes();
  }

  getTomatoes = async () => {
    try {
      const response = await axios.get('tomatoes');
      console.log(response.data);
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
        <TomatoAction tomatoStart={this.tomatoStart}/>
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
  initTomatoes
};

export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes);