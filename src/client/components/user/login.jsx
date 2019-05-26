import React from 'react';
import LoginForm from './loginForm';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            userValidation: undefined
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

    handleLoginSubmit = (e) => {
        let username = this.state.username;
        let password = this.state.password;

        fetch(`/users/${username}`)
          .then(function(response) {
            return response.json();
          })
          .then(function(myJson) {
            //const data = JSON.stringify(myJson);
            const data = myJson;
            // see if user is invalid
            if (data.rowCount === 0) {
                console.log("Username is invalid. Click here to Sign Up")
                this.setState({userValidation: null});

            // if username is valid, check if password is correct
            } else {
                console.log(data["rows"])
                const dataPW = data.rows[0].password;
                if (password === dataPW) {
                    console.log("Valid");
                    this.setState({userValidation: true});
                } else {
                    console.log("Password is wrong")
                    this.setState({userValidation: false});
                }
            }
          });

        e.preventDefault();
    }

    render() {
        return (
            <LoginForm username={this.state.username} password={this.state.password} usernameChange={this.usernameChange} passwordChange={this.passwordChange} handleLoginSubmit={this.handleLoginSubmit} userValidation={this.state.userValidation} />

        )
    }
}

export default Login;