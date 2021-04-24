import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Table, Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import Ingredient from '../../shared/Ingredient';
import Accordion from '../../UI/Accordion/Accordion';

const ItemsTable = (props) => {
  let renderCards;
  if (props.shoppingList) {
    renderCards = Object.keys(props.shoppingList).map((category) => {
      const products = Object.keys(props.shoppingList[category]).map(
        (ingred) => (
          <Ingredient
            key={'card' + ingred}
            title={ingred}
            value={+props.shoppingList[category][ingred]}
            activeColumns={[true, true]}
            deleteIngredient={(e) => {
              e.stopPropagation();
              props.onDeleteSoppingItem(props.listType, category, ingred);
            }}
          />
        )
      );
      const content = (
        <Table className='text-light mb-1' borderless hover size='sm'>
          <tbody>{products}</tbody>
        </Table>
      );

      return { header: category, content };
    });
  }

  return (
    <div>
      <Row>
        <Col sm='12'>
          {renderCards ? <Accordion cards={renderCards} /> : ''}
        </Col>
      </Row>
      {props.shoppingList && Object.keys(props.shoppingList).length > 0 ? (
        <Row>
          <Col sm='12' className='text-center'>
            <hr className='bg-light mt-3 mb-2 mx-5' />
            <Button size='sm' className='mb-2 border border-danger'>
              <FontAwesomeIcon icon={faTrash} />
              <span
                className='pl-1'
                onClick={() => props.onDeleteShoppingList(props.listType)}
              >
                Wyczyść listę
              </span>
            </Button>
          </Col>
        </Row>
      ) : (
        ''
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteShoppingList: (type) => dispatch(actions.deleteShoppingList(type)),
    onDeleteSoppingItem: (type, category, itemName) =>
      dispatch(actions.deleteShoppingItem(type, category, itemName)),
  };
};

export default connect(null, mapDispatchToProps)(ItemsTable);
