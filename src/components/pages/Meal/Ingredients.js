import React from 'react';
import styles from './Ingredients.module.css';
import { Container, Row, Input, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChild } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import Ingredient from './Ingredient';

const Ingredients = (props) => {
  const ingredientsList = props.data
    ? Object.keys(props.data).map((ingredient) => (
        <Ingredient
          key={`${ingredient}-key`}
          title={ingredient}
          weight={props.data[ingredient]}
        />
      ))
    : null;
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
          />
        </h4>
      </Row>
      <hr className='border-light rounded mx-3 mt-2' />
      <Row className='px-5'>
        <Table className='text-light' borderless hover>
          <tbody>{ingredientsList}</tbody>
        </Table>
      </Row>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onGetIngredient: (title) => dispatch(actions.getIngred(title)),
});

export default connect(null, mapDispatchToProps)(Ingredients);
