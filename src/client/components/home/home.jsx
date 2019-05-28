import React from 'react';
import { Redirect } from 'react-router-dom'
import Login from '../user/login';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            receipts: []
        }
    }

    // fetch the data
    getUserReceipts = () => {
        fetch('/getUserReceipts')
        .then(response => {
            return response.json();
        })
        .then(response => {
            console.log(response)
           // this.setState({receipts: response});
        })
    }



    render() {
        return(
            <React.Fragment>
                {this.getUserReceipts()}
                <div>
                    <h1>HOME</h1>
                    <button type="button"><a href='/group'>Split a Bill</a></button>
                </div>
            </React.Fragment>
        )
    }
}

export default Home;