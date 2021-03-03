import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import ItemsTable from './ItemsTable';

class CSV extends React.Component {
  state = { areaContent: '', items: [] };

  componentDidMount = () => {
    this.props.onGetShoppingList('csv');
  };

  handleTextArea = (event) => {
    this.setState({ areaContent: event.target.value });
  };

  handleCreateList = () => {
    if (this.state.areaContent.length > 0) {
      const products = this.state.areaContent.split('\n');
      const items = products.map((product) => {
        const item = product.split('\t');
        this.props.onGetIngred(item[0]);
        if (!item[1]) item[1] = 0;
        return item;
      });
      this.setState({ items });
    }
  };

  render() {
    //create shopping list
    const createShoppingList = () => {
      if (this.props.ingreds && this.state.items.length > 0) {
        const ingreds = this.props.ingreds;
        this.state.items.forEach((item) => {
          const ingred = ingreds[item[0]];
          if (!ingred.isLoading) {
            let category;
            category = ingred.data ? ingred.data.kategoria : 'inne';
            const itemData = { [item[0]]: +item[1] };
            this.props.onAddShoppingItem('csv', category, itemData);
          }
        });
      }
    };

    //  createShoppingList(); cannot be called here - calls onAddShoppingItem non-stop

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
    onGetIngred: (title) => dispatch(actions.getIngred(title)),
    onAddShoppingItem: (type, category, itemData) =>
      dispatch(actions.addShoppingItem(type, category, itemData)),

    onGetShoppingList: (type) => dispatch(actions.getShoppingList(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CSV);
