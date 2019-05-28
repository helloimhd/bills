import React from 'react';
import PropTypes from 'prop-types';

class RegisterForm extends React.Component {

    render() {

        return (
            <React.Fragment>
                <form onSubmit={this.props.handleRegisterSubmit}  >
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={this.props.username} onChange={this.props.usernameChange} required />
                    <br />
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" defaultValue={this.props.email} onChange={this.props.emailChange} required />
                    <br />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={this.props.password} onChange={this.props.passwordChange} required />
                    <br />
                    <button type="submit">Register</button>
                </form>

            </React.Fragment>
        )


    }
}

RegisterForm.propTypes = {
  username: PropTypes.string,
  email: PropTypes.email,
  password: PropTypes.password,
  handleRegisterSubmit: PropTypes.func,
  usernameChange: PropTypes.func,
  passwordChange: PropTypes.func,
  emailChange: PropTypes.func
};

export default RegisterForm;