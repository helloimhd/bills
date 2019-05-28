import React from 'react';
import RegisterForm from './registerForm';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            email: "",
            prompt: ""
        }

    }

    usernameChange = e => {
        //console.log(e.target.value)
        this.setState({username: e.target.value});
    }

    passwordChange = e => {
        //console.log(e.target.value)
        this.setState({password: e.target.value});
    }

    emailChange = e => {
        //console.log(e.target.value)
        this.setState({email: e.target.value});
    }

    handleRegisterSubmit = (e) => {
        e.preventDefault();

        let username = this.state.username;
        let password = this.state.password;
        let email = this.state.email;
        let reactThis = this;

        let url = '/register';
        let userData = {username: username, password: password, email: email};

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
            //console.log(response.status)
            if (response.status === "duplicate") {
                reactThis.setState({prompt: "Username is already taken. Choose another username."})

            } else if (response.status === "created") {
                // reactThis.setState({prompt: "User created! Click here to "})
                // or redirect
                window.location.href = '/login';
            }
        })
      //  .catch(error => console.error('Error:', error));

    }  // end handle of login submit

    render() {

        return (
            <React.Fragment>
                <RegisterForm
                username={this.state.username}
                usernameChange={this.usernameChange}

                password={this.state.password}
                passwordChange={this.passwordChange}

                email={this.state.email}
                emailChange={this.emailChange}
                handleRegisterSubmit={this.handleRegisterSubmit} />

                <p>{this.state.prompt}</p>

            </React.Fragment>

        )
    }
}

export default Register;