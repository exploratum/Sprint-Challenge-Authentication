import React from 'react';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Jokes from './components/Jokes';
import {NavLink, withRouter, Route} from 'react-router-dom';


import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Employee Web Site
        <NavLink to='/signin'>Login</NavLink>
        <NavLink to='/signup'>Sign Up</NavLink>
        <button onClick={logout}>Logout</button>
      </header>

      <Route path="/signin" component={Signin} />
      <Route path='/signup' component={Signup} />
      <Route path='/jokes' component={Jokes} />
    </div>
  );
}

const logout = () => {
  localStorage.removeItem('token');
  this.props.history.push('/signin');
};


export default withRouter(App);
