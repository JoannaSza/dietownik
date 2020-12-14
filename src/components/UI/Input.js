import React from 'react';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Input = (props) => {
  const prepend = props.prepend ? (
    <div className='col-1 pl-0 pr-1 my-auto text-muted'>
      <FontAwesomeIcon icon={props.prepend} />
    </div>
  ) : null;
  const append = props.append ? (
    <div className='input-group-append' onClick={() => props.appendOnClick()}>
      <div className={`input-group-text bg-white text-secondary btn`}>
        <FontAwesomeIcon style={{ width: '22px' }} icon={props.append} />
      </div>
    </div>
  ) : null;
  const errorText =
    props.errorText && props.touched ? (
      <div className='row text-danger text-center'>
        <small className='w-100'>{props.errorText}</small>
      </div>
    ) : null;

  let renderInputBasedOnType;

  let validityClass = '';
  if (!props.touched) validityClass = '';
  else if (props.valid & props.touched) validityClass = 'is-valid';
  else validityClass = 'is-invalid';

  if (props.elementConfig.type === 'dropdown') {
    const dropdownItems = props.elementConfig.items.map((item) => (
      <DropdownItem key={item}>{item}</DropdownItem>
    ));
    renderInputBasedOnType = (
      <UncontrolledDropdown className='w-100 p-0'>
        <DropdownToggle>{props.value}</DropdownToggle>
        <DropdownMenu>{dropdownItems}</DropdownMenu>
      </UncontrolledDropdown>
    );
  } else
    renderInputBasedOnType = (
      <div className='row'>
        {prepend}
        <div className='input-group col p-0'>
          <input
            className={`form-control ${validityClass}`}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
          {append}
        </div>
      </div>
    );

  return (
    <div className={`mb-2 ${props.className}`}>
      {renderInputBasedOnType}
      {errorText}
    </div>
  );
};

export default Input;
