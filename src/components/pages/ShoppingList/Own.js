import React from 'react';
import { Row, Col } from 'reactstrap';
import Accordion from '../../UI/Accordion/Accordion';

const Cards = [
  { header: 'card1', content: <div>test1</div> },
  { header: 'card2', content: <div>test2</div> },
];

const Own = () => {
  return (
    <Row className='text-light'>
      <Col sm='12'>
        <Accordion cards={Cards} />
      </Col>
    </Row>
  );
};

export default Own;
