import React from 'react';

import axios from 'axios';

import { Container, Col, Row } from 'reactstrap';

class Jokes extends React.Component {

    state = {
        jokes:[],
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if(token) {
            axios
            .create({
                headers: {authorization: token}
            })
            .get('http://localhost:3300/api/jokes')
            .then(res => {
                console.log(res)
                this.setState({jokes: res.data})
            })
            .catch(err => console.log(err))
        }
        else {
            window.alert("You need to login first");
            this.props.history.push('/signin')
        }
    }
 
    render() {
        return (
            <div className='users'>
                <Container>
                    <Row className='headers'>
                        <Col>index</Col>
                        <Col>joke</Col>

                    </Row>
                    {this.state.jokes.map((joke, index) => 
                        <Row key={joke.id} className='joke'>
                            <Col>{index}</Col>
                            <Col>{joke.joke}</Col>
                        </Row>
                    )}
                </Container>
            </div>
            
        )
    }
    
} 

export default Jokes;