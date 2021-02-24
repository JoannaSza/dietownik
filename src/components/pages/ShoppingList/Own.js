import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import Accordion from '../../UI/Accordion/Accordion';
import Ingredient from '../../shared/Ingredient';

import * as actions from '../../../store/actions';
import Table from 'reactstrap/lib/Table';

class Own extends React.Component {
  state = {
    isItemToAdd: false,
    ingredient: {
      title: '',
      value: '',
      category: '',
    },
    cardsData: {},
    cards: [
      { header: 'card1', content: <div>test1</div> },
      { header: 'card2', content: <div>test2</div> },
    ],
  };

  componentDidMount = () => {
    this.props.onGetShoppingList(this.props.userId, 'own');
  };

  componentDidUpdate = () => {
    if (
      this.props.ingreds[this.state.ingredient.title] &&
      this.state.isItemToAdd
    ) {
      const ingredient = this.props.ingreds[this.state.ingredient.title];
      if (ingredient.isLoading) console.log('loading');
      else if (ingredient.data && this.state.ingredient.title.length > 0) {
        // const categoryIngredients = {
        //   ...this.state.cardsData[ingredient.data.kategoria],
        //   [this.state.ingredient.title]: this.state.ingredient.value,
        // };
        this.props.onAddShoppingItem(
          this.props.userId,
          'own',
          [ingredient.data.kategoria],
          { [this.state.ingredient.title]: this.state.ingredient.value }
        ); //userId, type, category, itemData
        this.setState({
          ingredient: {
            title: '',
            value: '',
            category: '',
          },
          isItemToAdd: false,
          // cardsData: {
          //   ...this.state.cardsData,
          //   [ingredient.data.kategoria]: categoryIngredients,
          // },
        });
        console.log(this.state);
      } else if (
        ingredient.errorMessage &&
        this.state.ingredient.title.length > 0
      ) {
        this.props.onAddShoppingItem(this.props.userId, 'own', 'inne', {
          [this.state.ingredient.title]: this.state.ingredient.value,
        });
        this.setState({
          ingredient: {
            title: '',
            value: '',
            category: '',
          },
          isItemToAdd: false,
        });
      }
    }
  };

  addItemHandler = () => {
    if (!this.props.ingreds[this.state.ingredient.title]) {
      this.props.onGetIngredData(this.state.ingredient.title);
    }
    this.setState({ isItemToAdd: true });
  };

  render() {
    let renderCards;
    if (this.props.shoppingList) {
      renderCards = Object.keys(this.props.shoppingList).map((category) => {
        const products = Object.keys(
          this.props.shoppingList[category]
        ).map((ingred) => (
          <Ingredient
            key={'card' + ingred}
            title={ingred}
            value={this.props.shoppingList[category][ingred]}
            addNextInput={() => console.log('key pressed')}
          />
        ));
        const content = (
          <Table className='text-light' borderless hover size='sm'>
            <tbody>{products}</tbody>
          </Table>
        );

        return { header: category, content };
      });
    }

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
                        addNew='true'
                        key={`ingredient--key`}
                        title={this.state.ingredient.title}
                        value={this.state.ingredient.value}
                        isSpice='false'
                        addNextInput={() => console.log('key pressed')}
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
        <Row>
          <Col sm='12'>
            <Accordion cards={renderCards} />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingreds: state.ingreds,
    userId: state.auth.userId,
    shoppingList: state.shoppingList.shoppingList.own,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetIngredData: (title) => dispatch(actions.getIngred(title)),
    onGetShoppingList: (userId, type) =>
      dispatch(actions.getShoppingList(userId, type)),
    onAddShoppingItem: (userId, type, category, itemData) =>
      dispatch(actions.addShoppingItem(userId, type, category, itemData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Own);
