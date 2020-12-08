import React from 'react';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import { correctEndOfLineWords } from '../../../shared/utility';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import Ingredients from './Ingredients';

class Meal extends React.Component {
  componentDidMount = () => {
    const mealTitle = this.props.match.params.title;
    const category = this.props.match.params.category;
    this.props.onGetMeal(category, mealTitle);
  };
  render() {
    const mealTitle = this.props.match.params.title;
    const ingredientsList = this.props.isLoading ? (
      <Spinner />
    ) : this.props.meal ? (
      <Ingredients data={this.props.meal.produkty} />
    ) : null;
    return (
      <div className='flex-grow-1 bg-rich-black'>
        <Container>
          <Row className='mb-5'>
            <Col className='text-right'>
              <Button className='mt-2' color='ash-gray' size='sm'>
                Wróć do listy posiłków
              </Button>
            </Col>
          </Row>
          <Row className='px-5'>
            <h3 className='mb-3 pb-2 text-celadon-blue text-center font-courgette w-100'>
              {correctEndOfLineWords(mealTitle)}
            </h3>
            <div className='px-2 w-100'>{ingredientsList}</div>
          </Row>
          <Row className='text-light px-5 my-5 text-justify'>
            <h6 className='px-5 text-center' style={{ lineHeight: '200%' }}>
              {this.props.meal ? this.props.meal.opis : ''}
            </h6>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    meal: state.meals.meal,
    isLoading: state.meals.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetMeal: (category, title) => dispatch(actions.getMeal(category, title)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Meal);
