import React from 'react';

class LoginForm extends React.Component {

    render() {
        let userValidation = this.props.userValidation;
        let prompt = "";
        if (userValidation === null) {
            return `<p>Username is invalid. Click here to Sign Up</p>`
        }

        return (
            /*<form method="post" action="/login">*/
            <form onSubmit={this.props.handleLoginSubmit} >
                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={this.props.username} onChange={this.props.usernameChange} required />
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={this.props.password} onChange={this.props.passwordChange} required />
                <br />
                <button type="submit">Log In</button>
            </form>
        )


    }
}

export default LoginForm;