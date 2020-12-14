import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import Modal from '../../UI/Modal/Modal';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import styles from './Login.module.css';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Input from '../../UI/InputGroup';
import { updateObject, checkValidity } from '../../../shared/utility';

class RstPswdModal extends Component {
  state = {
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
    submitted: false,
  };

  inputChangedHandler = (event) => {
    const updatedInputElement = updateObject(this.state.email, {
      value: event.target.value,
      ...checkValidity(event.target.value, this.state.email.validation),
    });
    this.setState({ email: updatedInputElement });
  };

  checkboxClickHandler = () => {
    this.setState((prevState) => ({
      stayLoggedIn: !prevState.stayLoggedIn,
    }));
  };

  submitHandler = (e, step) => {
    e.preventDefault();
    if (step === 'askEmail' && this.state.email.valid) {
      this.props.onResetPassword(this.state.email.value);
      this.setState({ submitted: true });
    } else if (step === 'askEmail' && !this.state.email.valid)
      this.setState({ submitted: true });
    else this.rejectHandler();
  };

  rejectHandler = () => {
    this.props.onReject();
    this.setState({
      submitted: false,
      email: { ...this.state.email, value: '' },
    });
  };

  render() {
    let step = 'askEmail';
    if (this.state.submitted) {
      if (this.props.loading) step = 'loading';
      else if (this.props.error) {
        step = 'error';
      } else if (this.props.actionSuccess) step = 'approved';
    }
    let renderContent;
    switch (step) {
      case 'askEmail':
        renderContent = (
          <div className={`container no-gutters mx-auto ${styles.Modal}`}>
            <h6 className='text-center'>
              Na podany adres email zostanie wysłany email z instrukcją:
            </h6>
            <Input
              className='px-4'
              prepend={this.state.email.prepend}
              elementConfig={this.state.email.elementConfig}
              value={this.state.email.value}
              changed={this.inputChangedHandler}
              valid={this.state.email.valid}
              errorText={this.state.email.errorMsg}
              touched={this.state.submitted}
            />
          </div>
        );
        break;
      case 'loading':
        renderContent = (
          <div
            className={`container no-gutters mx-auto text-center ${styles.Modal}`}
          >
            <Spinner size='md' color='celadon-blue' />
          </div>
        );
        break;
      case 'approved':
        renderContent = (
          <div className={`container no-gutters mx-auto ${styles.Modal}`}>
            <h6 className='text-center'>
              Email został wysłany. Sprawdź skrzynkę mailową.
            </h6>
          </div>
        );
        break;
      case 'error':
        renderContent = (
          <div className={`container no-gutters mx-auto ${styles.Modal}`}>
            {this.props.error === 'EMAIL_NOT_FOUND' ? (
              <h6 className='text-center'>
                Użytkownik z podanym adresem email nie istnieje!
              </h6>
            ) : (
              <h6 className='text-center'>Błąd!</h6>
            )}
          </div>
        );
        break;
      default:
        break;
    }

    return (
      <Modal
        title='Resetowanie hasła'
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        onReject={this.rejectHandler}
        onSubmit={(e) => this.submitHandler(e, step)}
        btn1={step === 'askEmail' ? 'Wyślij' : 'OK'}
        btn2='Anuluj'
      >
        {renderContent}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  actionSuccess: state.auth.actionSuccess,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onResetPassword: (email) => dispatch(actions.resetPswd(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RstPswdModal);
