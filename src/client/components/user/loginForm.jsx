import React from 'react';

class LoginForm extends React.Component {

    render() {

        return (
            <React.Fragment>
                <form onSubmit={this.props.handleLoginSubmit}  >
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={this.props.username} onChange={this.props.usernameChange} required />
                    <br />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={this.props.password} onChange={this.props.passwordChange} required />
                    <br />
                    <button type="submit">Log In</button>
                </form>
                <br />
                <button type="button"><a href="/register">Sign Up</a></button>
            </React.Fragment>
        )


    }
}

export default LoginForm;