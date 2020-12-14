import React from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

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

  let renderInputBasedOnType;
  if (props.elementConfig.type === 'dropdown') {
    const dropdownItems = props.elementConfig.items.map((item) => (
      <DropdownItem className='text-capitalize' key={item}>
        {item}
      </DropdownItem>
    ));
    renderInputBasedOnType = (
      <UncontrolledDropdown className='w-100 p-0'>
        <DropdownToggle
          color='white'
          className='w-100 text-right d-flex justify-content-between'
        >
          <div className='text-left text-capitalize'>{props.value}</div>
          <div>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
        </DropdownToggle>
        <DropdownMenu className='w-100'>{dropdownItems}</DropdownMenu>
      </UncontrolledDropdown>
    );
  } else
    renderInputBasedOnType = (
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
    );

  return (
    <div className={`mb-2 ${props.className}`}>
      <div className='row'>{renderInputBasedOnType}</div>
      {errorText}
    </div>
  );
};

export default completeInput;
