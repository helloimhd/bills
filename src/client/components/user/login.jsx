import React from 'react';
import LoginForm from './loginForm';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            userValidation: "",
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

    handleLoginSubmit = (e) => {
        e.preventDefault();

        let username = this.state.username;
        let password = this.state.password;
        let reactThis = this;

        fetch(`/users/${username}`)
          .then(function(response) {
            return response.json();
          })
          .then(function(myJson) {
            const data = myJson;

            // see if user is invalid
            if (data.rowCount === 0) {
                console.log("Username is invalid. Click here to Sign Up")
                userValidation = null;
                reactThis.setState({userValidation: null, prompt: "Username is invalid. Click here to Sign Up"})

            // if username is valid, check if password is correct
            } else {
                const dataPW = data.rows[0].password;
                if (password === dataPW) {
                    console.log("Valid");
                    reactThis.setState({userValidation: true, prompt: "Valid."})
                    //console.log(userValidation)

                } else {
                    console.log("Password is wrong")
                    reactThis.setState({userValidation: false, prompt: "Password is wrong"})
                    //console.log(userValidation)

                }
            }
          });  // end of fetch

    }

    render() {
        let userValidation = this.state.userValidation;
        //console.log("uservalidation", userValidation)

        return (
            <React.Fragment>
                <LoginForm username={this.state.username} password={this.state.password} usernameChange={this.usernameChange} passwordChange={this.passwordChange} handleLoginSubmit={this.handleLoginSubmit} userValidation={this.state.userValidation} />

                <p>{this.state.prompt}</p>
              </React.Fragment>

        )
    }
}

export default Login;