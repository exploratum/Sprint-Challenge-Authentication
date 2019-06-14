import React from 'react';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Jokes from './components/Jokes';
import {NavLink, withRouter, Route} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';



import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <Container>
              <Row >
                <Col xs={6} className='title'>
                  Your dad's jokes
                </Col>
  
                <Col>
                  <NavLink to='/signin'>Login</NavLink>
                </Col>
  
                <Col>
                  <NavLink to='/signup'>Sign Up</NavLink>
                </Col>
  
                <Col>
                  <button onClick={this.logout}>Logout</button>
                </Col>
              </Row>
            </Container>
        </header>
  
        <Route path="/signin" component={Signin} />
        <Route path='/signup' component={Signup} />
        <Route path='/jokes' component={Jokes} />
      </div>
    );
  }
  logout = () => {
    localStorage.removeItem('token');
    this.props.history.push('/signin');
  };
}




export default withRouter(App);
