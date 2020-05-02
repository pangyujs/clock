import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './redux/store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const upSvg: any = document.querySelector('.upSvg');
document.onscroll = (() => {
  if (window.scrollY >= 1000) {
    upSvg.classList.add('visible');
    upSvg.onclick = () => {
      window.scrollTo(0, -1);
    };
  } else {
    upSvg.classList.remove('visible');
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
