import React from 'react';

import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import Ingredient from '../../shared/Ingredient';

import * as actions from '../../../store/actions';
import ItemsTable from './ItemsTable';

class Own extends React.Component {
  state = {
    ingredient: {
      title: '',
      value: 0,
    },
  };

  componentDidMount = () => {
    this.props.onGetShoppingList('own');
  };

  addItemHandler = () => {
    if (this.state.ingredient.title.length > 0) {
      this.props.onAddShoppingItem('own', {
        [this.state.ingredient.title]: this.state.ingredient.value,
      });
      this.setState({
        ingredient: {
          title: '',
          value: 0,
          category: '',
        },
        isItemToAdd: false,
      });
    }
  };

  render() {
    return (
      <div className='text-light'>
        <Row className='m-0'>
          <Col>
            <Container className='p-1 my-3 rounded bg-ash-gray'>
              <Row className='m-0'>
                <Col className='p-0'>
                  <table>
                    <tbody>
                      <Ingredient
                        addNew={true}
                        key={`ingredient--key`}
                        title={this.state.ingredient.title}
                        value={this.state.ingredient.value}
                        isSpice={false}
                        addNextInput={this.addItemHandler}
                        updateTitle={(value) =>
                          this.setState({
                            ingredient: {
                              ...this.state.ingredient,
                              title: value,
                            },
                          })
                        }
                        updateValue={(value) =>
                          this.setState({
                            ingredient: {
                              ...this.state.ingredient,
                              value,
                            },
                          })
                        }
                      />
                    </tbody>
                  </table>
                </Col>
                <Col xs='2' className='text-right p-0'>
                  <Button size='sm' onClick={this.addItemHandler}>
                    Dodaj
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <ItemsTable shoppingList={this.props.shoppingList} listType='own' />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shoppingList: state.shoppingList.shoppingList.own,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetShoppingList: (type) => dispatch(actions.getShoppingList(type)),
    onAddShoppingItem: (type, itemData) =>
      dispatch(actions.addShoppingItem(type, itemData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Own);
