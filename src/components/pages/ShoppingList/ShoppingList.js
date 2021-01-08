import React from 'react';
import Tabs from '../../UI/Tabs/Tabs';
import { Container } from 'reactstrap';
import Diet from './Diet';
import Own from './Own';
import CSV from './CSV';
import Summary from './Summary';

const tabNames = ['Dieta', 'Własne', 'CSV', 'Podsumowanie'];

class ShoppingList extends React.Component {
  render() {
    return (
      <div className='d-flex flex-grow-1 no-gutters bg-rich-black flex-column'>
        <Container className='mt-4'>
          <Tabs tabNames={tabNames}>
            <Diet />
            <Own />
            <CSV />
            <Summary />
          </Tabs>
        </Container>
      </div>
    );
  }
}

export default ShoppingList;
