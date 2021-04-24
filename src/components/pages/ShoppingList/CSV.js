import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import ItemsTable from './ItemsTable';

class CSV extends React.Component {
  state = { areaContent: '' };

  componentDidMount = () => {
    this.props.onGetShoppingList('csv');
  };

  handleTextArea = (event) => {
    this.setState({ areaContent: event.target.value });
  };

  handleCreateList = () => {
    if (this.state.areaContent.length > 0) {
      const products = this.state.areaContent.split('\n');
      products.forEach((product) => {
        const item = product.split('\t'); //product and its weight
        if (!item[1]) item[1] = 0;
        this.onAddShoppingItem('csv', { [item[0]]: [item[1]] });
      });
      // this.createShoppingList();
    }
  };

  render() {
    return (
      <div>
        <Row className='text-light mt-2 mb-1 mx-0'>
          <Col className='text-center'>
                    
            <textarea
              id='csvImport'
              rows='4'
              value={this.state.areaContent}
              onChange={this.handleTextArea}
              className='w-100'
            />
          </Col>
        </Row>
        <Row className='text-light'>
          <Col sm='12' className='text-center'>
            <Button size='sm' className='mb-2 border border-danger'>
              <span className='pl-1' onClick={this.handleCreateList}>
                Generuj listę
              </span>
            </Button>
          </Col>
               
        </Row>
        <ItemsTable shoppingList={this.props.shoppingList} listType='csv' />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingreds: state.ingreds,
    shoppingList: state.shoppingList.shoppingList.csv,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddShoppingItem: (type, itemData) =>
      dispatch(actions.addShoppingItem(type, itemData)),

    onGetShoppingList: (type) => dispatch(actions.getShoppingList(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CSV);
