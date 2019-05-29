import React from 'react';
import LoginForm from './loginForm';


class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            prompt: "",
            isLoggedIn: false
        }
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
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
        // console.log('reactThis', reactThis);

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
        .then(response => {
            //console.log(response.data)
            if (response.data === null) {
                reactThis.setState({prompt: "Username is invalid. Please try again or sign up."})

            } else if (response.data === false) {
                reactThis.setState({prompt: "Password is WRONG!"})

            } else if (response.data === true) {
                // redirect
                // set logged in to true
                reactThis.setState({isLoggedIn: true})
                window.location.href = '/';

            }
        })
        .catch(error => console.error('Error:', error));

    }  // end handle of login submit


    render() {

        return (
            <React.Fragment>
                <LoginForm username={this.state.username} password={this.state.password} usernameChange={this.usernameChange} passwordChange={this.passwordChange} handleLoginSubmit={this.handleLoginSubmit} />

                <p>{this.state.prompt}</p>
              </React.Fragment>

        )
    }
}

export default Login;