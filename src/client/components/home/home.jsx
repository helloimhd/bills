import React from 'react';
import { Redirect } from 'react-router-dom'
import Login from '../user/login';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: ""
        }
    }

    // checkLoggedIn = () => {
    //     let reactThis = this;
    //     fetch('/checkCookie')
    //     .then(function(response) {
    //         return response.json();
    //     })
    //     .then(function(myJson) {
    //        // console.log(myJson)
    //         if (myJson.isLoggedIn === true) {
    //             reactThis.setState({isLoggedIn: true})
    //             return true;

    //         } else if (myJson.isLoggedIn === false) {
    //             reactThis.setState({isLoggedIn: false})

    //         }
    //     });
    // }

    render() {
        return(
            <React.Fragment>
                <div>
                    <h1>HOME</h1>
                </div>
            </React.Fragment>
        )
    }
}

export default Home;