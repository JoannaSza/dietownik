import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import Accordion from '../../UI/Accordion/Accordion';
import Ingredient from '../../shared/Ingredient';

import * as actions from '../../../store/actions';
import Table from 'reactstrap/lib/Table';

class Own extends React.Component {
  state = {
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

  componentDidUpdate = () => {
    if (this.props.ingreds[this.state.ingredient.title]) {
      const ingredient = this.props.ingreds[this.state.ingredient.title];
      if (ingredient.isLoading) console.log('loading');
      else if (ingredient.data) {
        const categoryIngredients = {
          ...this.state.cardsData[ingredient.data.kategoria],
          [this.state.ingredient.title]: this.state.ingredient.value,
        };
        this.setState({
          ingredient: {
            title: '',
            value: '',
            category: '',
          },
          cardsData: {
            ...this.state.cardsData,
            [ingredient.data.kategoria]: categoryIngredients,
          },
        });
        console.log(this.state);
      } else if (ingredient.errorMessage) {
        const categoryIngredients = {
          ...this.state.cardsData.inne,
          [this.state.ingredient.title]: this.state.ingredient.value,
        };
        this.setState({
          ingredient: {
            title: '',
            value: '',
            category: '',
          },
          cardsData: {
            ...this.state.cardsData,
            inne: categoryIngredients,
          },
        });
      }
    }
  };

  render() {
    const renderCards = Object.keys(this.state.cardsData).map((category) => {
      const products = Object.keys(
        this.state.cardsData[category]
      ).map((ingred) => (
        <Ingredient
          key={'card' + ingred}
          title={ingred}
          value={this.state.cardsData[category][ingred]}
        />
      ));
      const content = (
        <Table className='text-light' borderless hover size='sm'>
          <tbody>{products}</tbody>
        </Table>
      );

      return { header: category, content };
    });
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
                  <Button
                    size='sm'
                    onClick={() =>
                      this.props.onGetIngredData(this.state.ingredient.title)
                    }
                  >
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
  return { ingreds: state.ingreds };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetIngredData: (title) => dispatch(actions.getIngred(title)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Own);
