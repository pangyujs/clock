import React from 'react';
import './Tomatoes.scss'
import TomatoAction from './TomatoAction';
class Tomatoes extends React.Component {
  render() {
    return (
      <div className="Tomatoes" id="Tomatoes">
        <TomatoAction/>
      </div>
    );
  }
}

export default Tomatoes;