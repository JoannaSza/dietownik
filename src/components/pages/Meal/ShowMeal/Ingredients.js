import React from 'react';
import styles from './Ingredients.module.css';
import { Container, Row, Input, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChild } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';

import Ingredient from './Ingredient';

class Ingredients extends React.Component {
  state = {
    mealsAmount: 1.0,
  };

  changeMealsAmountHandler = (event) => {
    this.setState({ mealsAmount: event.target.value });
  };

  render() {
    const ingredientsList = this.props.data
      ? Object.keys(this.props.data).map((ingredient) => (
          <Ingredient
            key={`${ingredient}-key`}
            title={ingredient}
            value={
              this.state.mealsAmount && !isNaN(this.props.data[ingredient]) > 0
                ? this.props.data[ingredient] * this.state.mealsAmount
                : this.props.data[ingredient]
            }
            isSpice={ingredient === 'przyprawy'}
          />
        ))
      : null;
    const listHeader = (
      <tr className='border-bottom text-uppercase'>
        <th scope='row'>nazwa</th>
        <th>waga</th>
        <th>kaloryczność</th>
        <th>ilość</th>
      </tr>
    );
    return (
      <Container className={styles.IngredientsContainer}>
        <Row className='font-weight-bold pt-2 px-3 d-flex justify-content-between'>
          <h4 className='mb-0 align-self-center'>Składniki</h4>
          <h4 className='d-flex mb-0'>
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
            />
          </h4>
        </Row>
        <hr className='border-light rounded mx-3 mt-2' />
        <Row className='px-5'>
          <Table className='text-light' borderless hover>
            <tbody>
              {listHeader}
              {ingredientsList}
            </tbody>
          </Table>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onGetIngredient: (title) => dispatch(actions.getIngred(title)),
});

export default connect(null, mapDispatchToProps)(Ingredients);
