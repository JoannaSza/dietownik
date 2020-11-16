import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'reactstrap';
import {
  faSearch,
  faTimesCircle,
  faThumbtack,
} from '@fortawesome/free-solid-svg-icons';

import InputGroup from './../UI/InputGroup';
import { updateObject } from '../../shared/utility';

class Diet extends React.Component {
  state = {
    searchbar: {
      prepend: faSearch,
      value: '',
      elementConfig: {
        type: 'text',
        placeholder: 'Szukaj',
      },
    },
    showResetPswd: false,
    showLoginError: false,
    stayLoggedIn: false,
    isGoogleAuth: false,
    inputsAreValid: false,
    submitted: false,
    method: 'login',
  };

  componentDidUpdate = () => {
    console.log(this.state);
  };

  clearSearchbar = () => {
    this.setState({
      searchbar: updateObject(this.state.searchbar, { value: '' }),
    });
  };

  inputChangedHandler = (event) => {
    this.setState({
      searchbar: updateObject(this.state.searchbar, {
        value: event.target.value,
      }),
    });
  };

  render() {
    return (
      <div className='d-flex flex-grow-1 no-gutters bg-rich-black flex-column '>
        <Container className='my-3 border border-secondary rounded bg-ash-gray'>
          <InputGroup
            className={'m-3'}
            prepend={this.state.searchbar.prepend}
            elementConfig={this.state.searchbar.elementConfig}
            value={this.state.searchbar.value}
            append={faTimesCircle}
            appendOnClick={this.clearSearchbar}
            changed={this.inputChangedHandler}
            touched={false}
          />
        </Container>
        <Container className='text-light'>
          <Row>
            <Col className='pl-0 d-flex flex-column' xs='3'>
              <div className='border border-secondary rounded mb-1 bg-celadon-blue d-flex align-items-center justify-content-between'>
                <h5 className='m-0 p-1'>Filtruj</h5>
                <span className='p-1'>
                  <FontAwesomeIcon icon={faThumbtack} />
                </span>
              </div>
              <div className='border border-secondary rounded mb-1'>
                <div
                  className='border border-secondary rounded m-1'
                  style={{ width: '40px', height: '40px' }}
                ></div>
              </div>
              <div className='border border-secondary rounded mb-1'>3</div>
              <div className='border border-secondary rounded mb-1'>4</div>
            </Col>
            <Col className='border border-secondary rounded' xs='9'>
              right column
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Diet;
