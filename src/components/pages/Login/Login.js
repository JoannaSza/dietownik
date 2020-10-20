import React from 'react';
import {
  faUser,
  faKey,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import styles from './Login.module.css';
import GoogleAuth from './GoogleAuth';
import Input from '../../UI/Input';
import Checkbox from '../../UI/Checkbox';
import Logo from '../../UI/Logo';

class Login extends React.Component {
  state = {
    stayLoggedIn: false,
    inputs: {
      email: {
        icon: faUser,
        value: '',
        type: 'email',
        placeholder: 'Email',
        onChange: (event) => this.emailChangeHandler(event),
      },
      password: {
        icon: faKey,
        value: '',
        type: 'password',
        placeholder: 'Hasło',
        onChange: (event) => this.passwordChangeHandler(event),
        append: faEyeSlash,
        appendOnClick: () => this.toggleEye(),
      },
    },
  };

  emailChangeHandler = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      inputs: {
        ...prevState.inputs,
        email: { ...prevState.inputs.email, value: event.target.value },
      },
    }));
  };

  passwordChangeHandler = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      inputs: {
        ...prevState.inputs,
        password: { ...prevState.inputs.password, value: event.target.value },
      },
    }));
  };

  checkboxClickHandler = () => {
    this.setState((prevState) => ({
      stayLoggedIn: !prevState.stayLoggedIn,
    }));
  };

  toggleEye = () => {
    this.setState((prevState) => {
      const newType =
        prevState.inputs.password.type === 'password' ? 'text' : 'password';
      const newAppendIcon = newType === 'password' ? faEyeSlash : faEye;
      return {
        ...prevState,
        inputs: {
          ...prevState.inputs,
          password: {
            ...prevState.inputs.password,
            type: newType,
            append: newAppendIcon,
          },
        },
      };
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.inputs.email.value,
      this.state.inputs.password.value,
      'login'
    );
  };

  onReturnToken = (token) => {
    this.setState({
      inputs: { ...this.state.inputs, id: token },
    });
  };

  render() {
    const renderInput = (input) => (
      <Input
        icon={input.icon}
        type={input.type}
        placeholder={input.placeholder}
        value={input.value}
        onChange={input.onChange}
        append={input.append}
        appendOnClick={input.appendOnClick}
      />
    );

    return (
      <div className='d-flex no-gutters'>
        <div className={`col-5 vh-100 bigScreen ${styles.Background}`} />
        <div className='col d-flex vh-100 bg-rich-black'>
          <div className='card mx-auto my-auto p-3'>
            <div className='card-body text-center'>
              <Logo />
              <h4 className='card-title font-weight-bold font-italic mt-4 mb-5 text-celadon-blue'>
                Dietownik
              </h4>
              <h6 className='card-subtitle mb-3 text-ash-gray'>
                Zaloguj się do dietownika, aby rozpocząć
              </h6>

              <form
                onSubmit={this.submitHandler}
                className='container no-gutters'
              >
                <div className='mb-2 p-0'>
                  {renderInput(this.state.inputs.email)}
                </div>
                {renderInput(this.state.inputs.password)}
                <div className='w-100 text-right'>
                  <a
                    className={`btn p-0 text-ash-gray`}
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.onResetPassword(this.state.inputs.email);
                    }}
                    href='/'
                  >
                    <small>Zresetuj hasło</small>
                  </a>
                </div>

                <a
                  className={`row text-center mb-3 mt-2 p-0 btn text-ash-gray`}
                  onClick={(e) => e.preventDefault()}
                  href='/'
                >
                  <Checkbox
                    onClick={this.checkboxClickHandler}
                    checked={this.state.stayLoggedIn}
                  >
                    Nie wylogowuj mnie
                  </Checkbox>
                </a>

                <h6 className='mb-2 text-ash-gray'>
                  Nie masz konta?{' '}
                  <a
                    href='/'
                    className={`pl-2 py-0 btn text-ash-gray`}
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.onAuth(
                        this.state.inputs.email,
                        this.state.inputs.password.value,
                        'signup'
                      );
                    }}
                  >
                    <u>Zarejestruj się</u>
                  </a>
                </h6>
                <button
                  type='submit'
                  className='btn w-100 text-light mb-3 btn-celadon-blue'
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
