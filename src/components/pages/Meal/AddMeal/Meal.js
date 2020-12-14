import React from 'react';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import { updateObject, checkValidity } from '../../../../shared/utility';

import Input from '../../../UI/InputGroup';

class Meal extends React.Component {
  state = {
    inputs: {
      title: {
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Tytuł',
        },
        validation: {
          required: true,
        },
        valid: false,
        errorMsg: '',
      },
      category: {
        value: 'śniadanie',
        elementConfig: {
          type: 'dropdown',
          items: [
            'śniadanie',
            'II śniadanie',
            'obiad',
            'podwieczorek',
            'kolacja',
            'Inne',
          ],
        },

        validation: {
          required: true,
        },
        valid: false,
        errorMsg: '',
      },
    },
    submitted: false,
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

  render() {
    const renderInputs = Object.keys(this.state.inputs).map((key) => {
      const input = this.state.inputs[key];
      return (
        <Input
          className='w-100'
          key={key}
          elementConfig={input.elementConfig}
          value={input.value}
          changed={(event) => this.inputChangedHandler(event, key)}
          valid={input.valid}
          errorText={input.errorMsg}
          touched={this.state.submitted}
        />
      );
    });

    return (
      <div className='flex-grow-1 bg-rich-black'>
        <Container>
          <Row className='mb-5'>
            <Col className='text-right'>
              <Button
                className='mt-2'
                color='ash-gray'
                size='sm'
                onClick={() => this.props.history.goBack()}
              >
                Wróć do listy posiłków
              </Button>
            </Col>
          </Row>
          <Row className='px-5'>
            <h3 className='mb-3 pb-2 text-celadon-blue text-center font-courgette w-100'>
              Dodaj nowy posiłek
            </h3>
            {renderInputs}
          </Row>
          <Row>
            <h5 className='w-100 text-center text-light'>
              Tutaj będzie component SKŁADNIKI
            </h5>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Meal;
