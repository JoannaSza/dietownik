import React from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      {props.isImage ? (
        <img src={props.src} alt={props.alt} width={35} id={props.id} />
      ) : (
        <FontAwesomeIcon
          className='text-light'
          icon={props.src}
          id={props.id}
          size='lg'
        />
      )}
      <UncontrolledTooltip placement='top' target={props.id}>
        {props.alt}
      </UncontrolledTooltip>
    </Button>
  );
};

export default MealButton;
