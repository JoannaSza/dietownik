import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const completeInput = (props) => {
  const prepend = props.prepend ? (
    <InputGroupAddon addonType='prepend'>
      <InputGroupText className='bg-white text-secondary btn'>
        <FontAwesomeIcon style={{ width: '22px' }} icon={props.prepend} />
      </InputGroupText>
    </InputGroupAddon>
  ) : null;

  const append = props.append ? (
    <InputGroupAddon addonType='append' onClick={() => props.appendOnClick()}>
      <InputGroupText className='bg-white text-secondary btn'>
        <FontAwesomeIcon style={{ width: '22px' }} icon={props.append} />
      </InputGroupText>
    </InputGroupAddon>
  ) : null;

  const errorText =
    props.errorText && props.touched ? (
      <div className='row text-danger text-center'>
        <small className='w-100'>{props.errorText}</small>
      </div>
    ) : null;

  let validityClass = '';
  if (!props.touched) validityClass = '';
  else if (props.valid & props.touched) validityClass = 'is-valid';
  else validityClass = 'is-invalid';

  return (
    <div className={`mb-2 ${props.className}`}>
      <div className='row'>
        <InputGroup>
          {prepend}
          <Input
            className={`form-control ${validityClass}`}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
          {append}
        </InputGroup>
      </div>
      {errorText}
    </div>
  );
};

export default completeInput;
