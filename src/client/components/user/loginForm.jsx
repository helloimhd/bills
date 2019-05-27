import React from 'react';

class LoginForm extends React.Component {

    render() {
        // let userValidation = this.props.userValidation;
        // console.log("uservalidation", userValidation)
        // let prompt = "";
        // if (userValidation === null) {
        //     prompt = "Username is invalid. Click here to Sign Up"
        // } else if (userValidation === false) {
        //     prompt = "Password is wrong"
        // } else if (userValidation === true) {
        //     prompt = "Valid."
        // } else {
        //     prompt = ""
        // }

        return (
            <React.Fragment>
                <form onSubmit={this.props.handleLoginSubmit} >
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={this.props.username} onChange={this.props.usernameChange} required />
                    <br />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={this.props.password} onChange={this.props.passwordChange} required />
                    <br />
                    <button type="submit">Log In</button>
                </form>

            </React.Fragment>
        )


    }
}

export default LoginForm;