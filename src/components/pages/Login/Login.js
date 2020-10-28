import React from 'react';
import {
  faUser,
  faKey,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import styles from './Login.module.css';
import GoogleAuth from './GoogleAuth';
import Input from '../../UI/Input';
import Checkbox from '../../UI/Checkbox';
import Logo from '../../UI/Logo';
import RstPswdModal from './RstPswdModal';
import { Spinner } from 'reactstrap';
import Modal from '../../UI/Modal/Modal';

import { updateObject, checkValidity } from '../../../shared/utility';

class Login extends React.Component {
  state = {
    showResetPswd: false,
    showLoginError: false,
    stayLoggedIn: false,
    isGoogleAuth: false,
    inputsAreValid: false,
    submitted: false,
    inputs: {
      email: {
        prepend: faUser,
        value: '',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        errorMsg: '',
      },
      password: {
        prepend: faKey,
        value: '',
        elementConfig: { type: 'password', placeholder: 'Hasło' },
        append: faEyeSlash,
        appendOnClick: () => this.toggleEye(),
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        errorMsg: '',
      },
    },
  };

  inputChangedHandler = (event, inputId) => {
    const updatedInputElement = updateObject(this.state.inputs[inputId], {
      value: event.target.value,
      ...checkValidity(
        event.target.value,
        this.state.inputs[inputId].validation
      ),
    });
    const updatedInputs = updateObject(this.state.inputs, {
      [inputId]: updatedInputElement,
    });

    let inputsAreValid = true;
    for (let inputId in updatedInputs) {
      inputsAreValid = updatedInputs[inputId].valid && inputsAreValid;
    }
    this.setState({ inputs: updatedInputs, inputsAreValid });
  };

  checkboxClickHandler = () => {
    this.setState((prevState) => ({
      stayLoggedIn: !prevState.stayLoggedIn,
    }));
  };

  toggleEye = () => {
    const newType =
      this.state.inputs.password.elementConfig.type === 'password'
        ? 'text'
        : 'password';
    const newAppendIcon = newType === 'password' ? faEyeSlash : faEye;
    const updatedInputConfig = updateObject(
      this.state.inputs.password.elementConfig,
      { type: newType }
    );
    const updatedInputElement = updateObject(this.state.inputs.password, {
      append: newAppendIcon,
      elementConfig: updatedInputConfig,
    });
    const updatedInputs = updateObject(this.state.inputs, {
      password: updatedInputElement,
    });
    this.setState({ inputs: updatedInputs });
  };

  submitHandler = (event) => {
    event.preventDefault();
    if (this.state.inputsAreValid) {
      this.props.onAuth(
        this.state.inputs.email.value,
        this.state.inputs.password.value,
        'login'
      );
    } else this.setState({ submitted: true });
  };

  googleAuthHandler = (id_token) => {
    console.log('googleAuthHandler');
    this.props.onAuth(id_token, null, 'google');
  };

  onShowResetPswd = () => {
    this.setState((prevState) => ({ showResetPswd: !prevState.showResetPswd }));
  };

  render() {
    const formInputsArray = [];
    for (let key in this.state.inputs) {
      formInputsArray.push({
        id: key,
        config: this.state.inputs[key],
      });
    }
    const renderInputs = (className) =>
      formInputsArray.map((input) => (
        <Input
          className={className}
          key={input.id}
          prepend={input.config.prepend}
          elementConfig={input.config.elementConfig}
          value={input.config.value}
          append={input.config.append}
          appendOnClick={input.config.appendOnClick}
          changed={(event) => this.inputChangedHandler(event, input.id)}
          valid={input.config.valid}
          errorText={input.config.errorMsg}
          touched={this.state.submitted}
        />
      ));

    let errorMessage = '';
    switch (this.props.error) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Podany adres email nie istnieje.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Nieprawidłowe hasło.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'Użytkownik zablokowany przez administratora.';
        break;
      default:
        errorMessage = 'Error';
        break;
    }

    return (
      <div>
        {/* ---------------------- MODALS ------------------------------ */}
        {/* reset password */}
        <RstPswdModal
          isOpen={this.state.showResetPswd}
          toggle={this.onShowResetPswd}
          onReject={this.onShowResetPswd}
        />
        <Modal
          isOpen={Boolean(this.props.error)}
          toggle={this.props.onClearError}
          onReject={this.props.onClearError}
          onSubmit={this.props.onClearError}
          btn1='OK'
          title='Błąd'
        >
          <div
            className={`container no-gutters mx-auto text-center ${styles.Modal}`}
          >
            {errorMessage}
          </div>
        </Modal>
        <div className='d-flex no-gutters'>
          <div className={`col-5 min-vh-100 bigScreen ${styles.Background}`} />
          <div className='col d-flex min-vh-100 bg-rich-black'>
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
                  noValidate
                >
                  {renderInputs()}

                  <div className='w-100 text-right'>
                    <a
                      className={`btn btn-sm p-0 text-ash-gray`}
                      onClick={(e) => {
                        e.preventDefault();
                        this.onShowResetPswd();
                      }}
                      href='/'
                    >
                      Zresetuj hasło
                    </a>
                  </div>

                  <a
                    className='row text-center mb-3 mt-2 p-0 btn text-ash-gray'
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
                          this.state.inputs.email.value,
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
                    {this.props.loading && !this.state.isGoogleAuth ? (
                      <Spinner size='sm' color='text-light' />
                    ) : (
                      'Zaloguj'
                    )}
                  </button>
                </form>
                <GoogleAuth
                  onLogIn={(token) => {
                    this.setState({ isGoogleAuth: true });
                    this.googleAuthHandler(token);
                  }}
                  logout={this.props.logout}
                  onLogout={this.props.onLogoutEnd}
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
    onClearError: () => dispatch(actions.clearError()),
    onLogoutEnd: () => dispatch(actions.logoutEnd()),
  };
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  actionSuccess: state.auth.actionSuccess,
  logout: state.auth.logout,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
