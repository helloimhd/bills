import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.scss';

class RegisterForm extends React.Component {

    render() {

        return (
            <React.Fragment>
                <div className={styles.header}>
                  <h1 className={styles.textCenter}>REGISTER</h1><br/>
                </div>

                <div style={{marginTop: 150 + "px"}}>
                    <div className={styles.container}>
                        <form onSubmit={this.props.handleRegisterSubmit}  style={{textAlign: "center"}} autocomplete="off">
                            <input type="text" name="username" placeholder="Username" value={this.props.username} onChange={this.props.usernameChange} style={{marginBottom: 30 + "px"}} required />

                            <input type="email" name="email" placeholder="Email" defaultValue={this.props.email} onChange={this.props.emailChange} style={{marginBottom: 30 + "px"}} required />

                            <input type="password" name="password" placeholder="Password" value={this.props.password} onChange={this.props.passwordChange} style={{marginBottom: 40 + "px"}} required />

                            <button type="submit" className={styles.button} style={{marginRight: 20 + "px"}}><h2>Register</h2></button>
                        </form>
                    </div>
                </div>

                <div className={styles.footer}></div>
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