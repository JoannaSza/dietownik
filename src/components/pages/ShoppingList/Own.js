import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Accordion from '../../UI/Accordion/Accordion';
import Ingredient from '../../shared/Ingredient';

const Cards = [
  { header: 'card1', content: <div>test1</div> },
  { header: 'card2', content: <div>test2</div> },
];

const Own = () => {
  return (
    <div className='text-light'>
      <Row className='m-0'>
        <Col>
          <Container className='p-1 my-3 rounded bg-ash-gray'>
            <Row className='m-0'>
              <Col className='p-0'>
                <Ingredient
                  addNew='true'
                  key={`ingredient--key`}
                  title={'ingredient'}
                  value={'400'}
                  isSpice='false'
                  // updateTitle={(event) =>
                  //   this.updateIngredientHandler(event, ingredient, 'title')
                  // }
                  // updateValue={(event) =>
                  //   this.updateIngredientHandler(event, ingredient, 'value')
                  // }
                  // deleteIngredient={(event) =>
                  //   this.updateIngredientHandler(event, ingredient, 'delete')
                  // }
                  //addNextInput={this.props.addIngredient}
                />
              </Col>
              <Col xs='2' className='text-right p-0'>
                <Button size='sm' className>
                  Dodaj
                </Button>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col sm='12'>
          <Accordion cards={Cards} />
        </Col>
      </Row>
    </div>
  );
};

export default Own;
