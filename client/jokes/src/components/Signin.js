import React from 'react';

import { Button, Form, Input, Label, Container, FormGroup, Col } from 'reactstrap';
import Axios from 'axios';



class Signin extends React.Component {

    state = {
        username:'',
        password: '',
    }

    render () {
        return (  
            <Container className="signin">
                <h2>Login</h2>
                <Form onSubmit={this.handleSigninSubmit} >
                    <FormGroup>
                        <Col>
                            <Label>Name</Label>
                            <Input type="text" 
                            name="username" 
                            value={this.state.username} 
                            onChange={this.handleSigninChanges} />
                        </Col>
                    </FormGroup>
    
                    <FormGroup>
                        <Col>
                            <Label>password</Label>
                            <Input type="password" 
                            name="password" 
                            value={this.state.password} 
                            onChange={this.handleSigninChanges} />
                        </Col>
                    </FormGroup>
    
                    <Button type='submit' size='lg' color='primary'>Sign In</Button>
                </Form>
            </Container>
        )
    }


    handleSigninChanges = (event) => {
        this.setState({...this.state, [event.target.name]:event.target.value})
    }

    handleSigninSubmit = (event) => {
        event.preventDefault();
        Axios.post('http://localhost:3300/api/login', this.state)
            .then(res => {
                const token = res.data.token;
                if (token) {
                    localStorage.setItem('token', res.data.token)
                    this.props.history.push('/jokes');
                }
                else {
                    Window.alert("Wrong credentials")
                }
            })
            .catch(err => console.log(err.response))
    }
    
} 



export default Signin;