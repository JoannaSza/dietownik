import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarrot, faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import styles from './Login.module.css';
import GoogleAuth from './GoogleAuth';

class Login extends React.Component {
  state = {
    stayLoggedIn: false,
    inputs: {
      email: '',
      password: '',
      id: '',
    },
  };

  emailChangeHandler = (event) => {
    this.setState({
      inputs: { ...this.state.inputs, email: event.target.value },
    });
  };

  passwordChangeHandler = (event) => {
    this.setState({
      inputs: { ...this.state.inputs, password: event.target.value },
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.inputs.email,
      this.state.inputs.password,
      'login'
    );
  };

  onReturnToken = (token) => {
    this.setState({
      inputs: { ...this.state.inputs, id: token },
    });
  };

  render() {
    return (
      <div className='d-flex no-gutters'>
        <div className='col-5'>
          <div className={`vh-100 ${styles.Background}`} />
        </div>
        <div className='col'>
          <div className={`d-flex h-100 ${styles.CardBackground}`}>
            <div className='card mx-auto my-auto p-3'>
              <div className='card-body text-center'>
                <div className='m-4 display-4 text-warning'>
                  <span className='border border-dark rounded-circle p-3'>
                    <FontAwesomeIcon icon={faCarrot} size='lg' />
                  </span>
                </div>

                <h4
                  className='card-title font-weight-bold font-italic mt-4 mb-5'
                  style={{ color: '#247ba0' }}
                >
                  Dietownik
                </h4>
                <h6 className='card-subtitle mb-3' style={{ color: '#CBD4C2' }}>
                  Zaloguj się do dietownika, aby rozpocząć
                </h6>

                <form
                  onSubmit={this.submitHandler}
                  className='container no-gutters'
                >
                  <div className='row mb-2'>
                    <div className='col-1 pl-0 pr-1 my-auto text-muted'>
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <input
                      className='form-control col'
                      type='email'
                      placeholder='Email'
                      value={this.state.inputs.email}
                      onChange={this.emailChangeHandler}
                    />
                  </div>
                  <div className='row mb-0'>
                    <div className='col-1 pl-0 pr-1 my-auto text-muted'>
                      <FontAwesomeIcon icon={faKey} />
                    </div>
                    <input
                      className='form-control col'
                      type='password'
                      placeholder='Hasło'
                      value={this.state.inputs.password}
                      onChange={this.passwordChangeHandler}
                    />
                  </div>
                  <div className='row text-right'>
                    <div
                      className={`w-100 py-1 pr-2 ${styles.AddHover}`}
                      onClick={() =>
                        this.props.onResetPassword(this.state.inputs.email)
                      }
                    >
                      <small>Zresetuj hasło</small>
                    </div>
                  </div>

                  <div className={`row text-center mb-4 ${styles.AddHover}`}>
                    <div
                      className='w-100'
                      onClick={() =>
                        this.setState({
                          stayLoggedIn: !this.state.stayLoggedIn,
                        })
                      }
                    >
                      {this.state.stayLoggedIn ? (
                        <FontAwesomeIcon icon={faCheckSquare} />
                      ) : (
                        <FontAwesomeIcon icon={faSquare} />
                      )}
                      <span className='pl-2'>Nie wylogowuj mnie</span>
                    </div>
                  </div>

                  <h6 className='mb-2' style={{ color: '#CBD4C2' }}>
                    Nie masz konta?{' '}
                    <u
                      className={`pl-2 ${styles.AddHover}`}
                      onClick={() =>
                        this.props.onAuth(
                          this.state.inputs.email,
                          this.state.inputs.password,
                          'signup'
                        )
                      }
                    >
                      Zarejestruj się
                    </u>
                  </h6>
                  <button
                    type='submit'
                    className={`btn w-100 text-light mb-3 ${styles.SubmitBtn}`}
                  >
                    Zaloguj
                  </button>
                </form>
                <GoogleAuth
                  onLogIn={(id_token) =>
                    this.props.onAuth(id_token, null, 'google')
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (user, password, method) =>
      dispatch(actions.auth(user, password, method)),
    onResetPassword: (email) => dispatch(actions.resetPswd(email)),
  };
};
export default connect(null, mapDispatchToProps)(Login);
