import React from 'react';
import { Row, Col } from 'reactstrap';

import ItemsTable from './ItemsTable';

class CSV extends React.Component {
  state = { areaContent: '' };
  handleTextArea = (event) => {
    this.setState({ areaContent: event.target.value });
    const products = event.target.value.split('\n');
    const items = products.map((product) => {
      const item = product.split('\t');
      return { [item[0]]: item[1] };
    });
    console.log(items);
  };
  render() {
    return (
      <div>
        <Row className='text-light'>
                  
          <Col sm='12'>
                      
            <textarea
              id='csvImport'
              rows='4'
              cols='50'
              value={this.state.areaContent}
              onChange={this.handleTextArea}
            />
                    
          </Col>
                
        </Row>
        {/* <ItemsTable shoppingList = {this.state.shoppingList} /> */}
      </div>
    );
  }
}
export default CSV;
