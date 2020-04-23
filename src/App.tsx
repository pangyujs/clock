import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from './components/index/Index'
import Login from './components/login/Login'
import SignUp from './components/signup/SignUp'
class App extends React.Component{
  render(){
    return (
      <Router>
        <div>
        <Route exact={true} path='/' component={Index}/>
        <Route  path='/login' component={Login}/>
        <Route  path='/signup' component={SignUp}/>
        </div>
      </Router>
    )
  }
}

export default App