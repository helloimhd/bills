import React from 'react';
import { Redirect } from 'react-router-dom'
import LoginForm from './loginForm';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            prompt: "",
            isLoggedIn: ""
        }
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    // checkIsLoggedIn = () => {
    //     fetch('/checkCookie')
    //       .then(function(response) {
    //         return response.json();
    //       })
    //       .then(function(myJson) {
    //         if (myJson.isLoggedIn === true) {
    //             this.setState({isLoggedIn: true})
    //         }
    //       });
    // }

    renderRedirect = () => {
        let reactThis = this;
        fetch('/checkCookie')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
           // console.log(myJson)
            if (myJson.isLoggedIn === true) {
                window.location = '/'
            } else if (myJson.isLoggedIn === false) {
                window.location = '/login'
            }
            // if (myJson.isLoggedIn === true) {
            //     reactThis.setState({isLoggedIn: true})
            //     <Redirect to='/' />

            // } else {
            //     reactThis.setState({isLoggedIn: false})
            //     <Redirect to='/login' />
            // }
        });
    }

    usernameChange = e => {
        //console.log(e.target.value)
        this.setState({username: e.target.value});
    }

    passwordChange = e => {
        //console.log(e.target.value)
        this.setState({password: e.target.value});
    }

    handleLoginSubmit(e) {
        e.preventDefault();

        let username = this.state.username;
        let password = this.state.password;
        let reactThis = this;
        console.log('reactThis', reactThis);

        let url = '/checkUser';
        let userData = {username: username, password: password};

        fetch(url, {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(userData), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(function(res) {
            return res.json()
        })
        .then(function(response) {
            console.log(response.data)
            if (response.data === null) {
                reactThis.setState({prompt: "Username is invalid. Click here to Sign Up"})

            } else if (response.data === false) {
                reactThis.setState({prompt: "Password is WRONG!"})

            } else if (response.data === true) {
                // redirect
                //reactThis.setState({prompt: "Valid"})
                // set logged in to true
                //reactThis.setState({isLoggedIn: true})
                window.location = '/'
            }
        })
        .catch(error => console.error('Error:', error));

    }  // end handle of login submit

    render() {
        return (
            <React.Fragment>
                {this.renderRedirect()}
                <LoginForm username={this.state.username} password={this.state.password} usernameChange={this.usernameChange} passwordChange={this.passwordChange} handleLoginSubmit={this.handleLoginSubmit} />

                <p>{this.state.prompt}</p>
              </React.Fragment>

        )
    }
}

export default Login;