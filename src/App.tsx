import React from 'react';
import './App.css';
import history from './config/history';
import { Router, Route } from "react-router-dom";
import Home from './components/home/Home'
import Login from './components/login/Login'
import SignUp from './components/signup/SignUp'
class App extends React.Component{
  render(){
    return (
      <Router history={history}>
        <div>
        <Route exact={true} path='/' component={Home}/>
        <Route  path='/login' component={Login}/>
        <Route  path='/signup' component={SignUp}/>
        </div>
      </Router>
    )
  }
}

export default App