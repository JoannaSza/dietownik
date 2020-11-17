import React from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';

const MealButton = (props) => {
  return (
    <Button
      onClick={props.onClick}
      outline
      active={props.isActive}
      color='celadon-blue'
      className='rounded m-1 text-center p-0'
      style={{ width: '40px', height: '40px', lineHeight: '36px' }}
    >
      <img src={props.src} alt={props.alt} width={35} id={props.id} />
      <UncontrolledTooltip placement='top' target={props.id}>
        {props.alt}
      </UncontrolledTooltip>
    </Button>
  );
};

export default MealButton;
