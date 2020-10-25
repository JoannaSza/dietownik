import React from 'react';
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
        <FontAwesomeIcon icon={props.append} />
      </div>
    </div>
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
      {errorText}
    </div>
  );
};

export default Input;
