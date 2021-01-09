import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  Button,
  Collapse,
} from 'reactstrap';

const MyCard = (props) => {
  return (
    <Card color='rich-black'>
      <CardHeader className='p-0 m-0'>
        <Button onClick={props.onExpand} className='w-100 m-0 font-weight-bold'>
          {props.header}
        </Button>
      </CardHeader>
      <Collapse isOpen={props.isOpen}>
        <CardBody>
          <CardText>{props.content}</CardText>
        </CardBody>
      </Collapse>
    </Card>
  );
};

export default MyCard;
