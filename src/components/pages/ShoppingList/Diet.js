import React from 'react';

import { connect } from 'react-redux';
import { Container, Row, Input, Spinner, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChild } from '@fortawesome/free-solid-svg-icons';

import * as actions from '../../../store/actions';
import ItemsTable from './ItemsTable';

////COMPONENT COPIED FROM OWN -> NEEDS ADJUSTING!!! TBD
class Diet extends React.Component {
  state = {
    mealsAmount: 1.0,
  };

  componentDidMount = () => {
    this.props.onGetShoppingList('diet');
  };

  changeMealsAmountHandler = (e) => {
    this.setState({ mealsAmount: +e.target.value });
  };

  render() {
    const showSpinner = this.props.isLoading ? (
      <h5 className='mb-0 ml-4'>
        <Spinner />
      </h5>
    ) : (
      ''
    );
    return (
      <div className='text-light'>
        <Container>
          <Row className='font-weight-bold pt-2 px-3 d-flex justify-content-center'>
            <h5 className='d-flex mb-0'>
              <div className='pr-2 align-self-center'>
                <FontAwesomeIcon icon={faChild} />
              </div>
              <Input
                className='align-self-center'
                type='number'
                step='0.5'
                bsSize='sm'
                style={{ width: '60px', height: '80%' }}
                value={this.state.mealsAmount}
                onChange={this.changeMealsAmountHandler}
                disabled={Boolean(this.props.add)}
              />
            </h5>
            <h5 className='mb-0 ml-4 align-self-center'>
              <Button size='sm' className='border border-danger'>
                <span
                  className='pl-1'
                  onClick={() =>
                    this.props.onGenerateShoppingList(this.state.mealsAmount)
                  }
                >
                  Generuj listę
                </span>
              </Button>
            </h5>
            {showSpinner}
          </Row>
        </Container>
        <hr className='bg-light mt-3 mb-2 mx-5' />
        <ItemsTable shoppingList={this.props.shoppingList} listType='diet' />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shoppingList: state.shoppingList.shoppingList.diet,
    isLoading: state.shoppingList.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetIngredData: (title) => dispatch(actions.getIngred(title)),
    onGetShoppingList: (type) => dispatch(actions.getShoppingList(type)),
    onAddShoppingItem: (type, category, itemData) =>
      dispatch(actions.addShoppingItem(type, category, itemData)),
    onGenerateShoppingList: (multiplier) =>
      dispatch(actions.generateShoppingList(multiplier)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Diet);
