import React from 'react';
import axios from 'axios';


import { Button, Form, Input, Label, Container, FormGroup, Col } from 'reactstrap';


class Signup extends React.Component {

    state = {
        username: '',
        password: '',
    }

    handleSignupChanges = (event) => {
        this.setState({...this.state, [event.target.name]:event.target.value})
    }

    handleSignupSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3300/api/register', this.state)
            .then(res => 
                {localStorage.setItem('token', res.data.token)
                this.props.history.push('/jokes')})
            .catch(err => {console.log(err)})
    }

    render () {
        return (  
            <Container className="signup">
                <h2>Register</h2>
                <Form onSubmit={this.handleSignupSubmit}>
                    <FormGroup>
                        <Col>
                            <Label>Name</Label>
                            <Input type="text" name="username" 
                            value={this.state.username} 
                            onChange={this.handleSignupChanges} />
                        </Col>
                    </FormGroup>
    
                    <FormGroup>
                        <Col>
                            <Label>password</Label>
                            <Input type="password" 
                            name="password" 
                            value={this.state.password} 
                            onChange={this.handleSignupChanges} />
                        </Col>
                    </FormGroup>
    
                    <Button type='submit' size='lg' color='primary'>Sign Up</Button>
                </Form>
            </Container>
        )
    }
    
} 

export default Signup;