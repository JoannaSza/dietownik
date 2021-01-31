import React from 'react';
import styles from './Ingredients.module.css';
import { Container, Row, Input, Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChild } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import Ingredient from '../../shared/Ingredient';

class Ingredients extends React.Component {
  state = {
    mealsAmount: 1.0,
  };

  changeMealsAmountHandler = (event) => {
    this.setState({ mealsAmount: event.target.value });
  };

  updateIngredientHandler = (event, ingredient, name) => {
    //event.preventDefault();
    const newData = {
      target: ingredient,
      name,
      value: event,
    };
    this.props.updateIngredient(newData);
  };

  render() {
    let ingredientsList;
    if (this.props.add) {
      ingredientsList = this.props.data
        ? Object.keys(this.props.data).map((ingredient, index) => (
            <Ingredient
              addNew='true'
              key={`ingredient-${index}-key`}
              title={ingredient}
              value={
                this.state.mealsAmount &&
                !isNaN(this.props.data[ingredient]) > 0
                  ? this.props.data[ingredient] * this.state.mealsAmount
                  : this.props.data[ingredient]
              }
              isSpice='false'
              updateTitle={(event) =>
                this.updateIngredientHandler(event, ingredient, 'title')
              }
              updateValue={(event) =>
                this.updateIngredientHandler(event, ingredient, 'value')
              }
              deleteIngredient={(event) =>
                this.updateIngredientHandler(event, ingredient, 'delete')
              }
              addNextInput={this.props.addIngredient}
            />
          ))
        : null;
    } else {
      ingredientsList = this.props.data
        ? Object.keys(this.props.data).map((ingredient) => (
            <Ingredient
              key={`${ingredient}-key`}
              title={ingredient}
              value={
                this.state.mealsAmount &&
                !isNaN(this.props.data[ingredient]) > 0
                  ? this.props.data[ingredient] * this.state.mealsAmount
                  : this.props.data[ingredient]
              }
              isSpice={ingredient === 'przyprawy'}
            />
          ))
        : null;
    }
    const listHeader = (
      <tr className='border-bottom text-uppercase'>
        <th scope='row'>nazwa</th>
        <th>waga</th>
        <th>kaloryczność</th>
        <th>ilość</th>
      </tr>
    );

    const renderAddButton = (
      <tr>
        <td className='text-center' colSpan='4'>
          <Button size='sm' onClick={this.props.addIngredient}>
            Dodaj składnik
          </Button>
        </td>
      </tr>
    );

    return (
      <Container className={styles.IngredientsContainer}>
        <Row className='font-weight-bold pt-2 px-3 d-flex justify-content-between'>
          <h5 className='mb-0 align-self-center'>Składniki</h5>
          <h5 className='d-flex mb-0'>
            <div className='pr-2 align-self-center'>
              <FontAwesomeIcon icon={faChild} />
            </div>
            <Input
              className='align-self-center'
              type='number'
              bsSize='sm'
              style={{ width: '60px', height: '80%' }}
              value={this.state.mealsAmount}
              onChange={this.changeMealsAmountHandler}
              disabled={Boolean(this.props.add)}
            />
          </h5>
        </Row>
        <hr className='border-light rounded mx-1 mt-1' />
        <Row className='px-4'>
          <small className='w-100' style={{ minHeight: '200px' }}>
            <Table className='text-light' borderless hover size='sm'>
              <thead>{listHeader}</thead>
              <tbody>
                {ingredientsList}
                {this.props.add ? renderAddButton : null}
              </tbody>
            </Table>
          </small>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onGetIngredient: (title) => dispatch(actions.getIngred(title)),
});

export default connect(null, mapDispatchToProps)(Ingredients);
