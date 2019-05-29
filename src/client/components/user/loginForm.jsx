import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.scss';

class LoginForm extends React.Component {

    render() {

        return (
            <React.Fragment>
                <div className={styles.header}>
                  <h1 className={styles.textCenter}>LOGIN</h1><br/>
                </div>

                <div style={{marginTop: 150 + "px"}}>

                    <div class={styles.container}>
                        <form onSubmit={this.props.handleLoginSubmit} style={{textAlign: "center"}} autocomplete="off">
                            <input type="text" name="username" placeholder="Username" value={this.props.username} onChange={this.props.usernameChange} style={{marginBottom: 30 + "px"}} required />

                            <input type="password" placeholder="Password" name="password" value={this.props.password} onChange={this.props.passwordChange} style={{marginBottom: 40 + "px"}} required />


                            <button type="submit" className={styles.button} style={{marginRight: 20 + "px"}}><h2>Log In</h2></button>
                            <button className={styles.button} ><h2><a href="/register">Sign Up</a></h2></button>

                        </form>
                    </div>
                    <br />
                </div>

                <div className={styles.footer}></div>
            </React.Fragment>
        )


    }
}

LoginForm.propTypes = {
  username: PropTypes.string,
  password: PropTypes.password,
  handleLoginSubmit: PropTypes.func,
  usernameChange: PropTypes.func,
  passwordChange: PropTypes.func,
};

export default LoginForm;