import React from 'react';
import { Card, CardHeader, CardBody, Button, Collapse } from 'reactstrap';

const MyCard = (props) => {
  return (
    <Card color='rich-black'>
      <CardHeader className='p-0 m-0'>
        <Button
          onClick={props.onExpand}
          className='w-100 m-0 font-weight-bold text-uppercase'
        >
          {props.header}
        </Button>
      </CardHeader>
      <Collapse isOpen={props.isOpen}>
        <CardBody className='pt-1 px-3 pb-0'>{props.content}</CardBody>
      </Collapse>
    </Card>
  );
};

export default MyCard;
