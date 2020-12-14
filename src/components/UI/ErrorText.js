import React from 'react';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ErrorText = (props) => (
  <h3 className='mt-5 mx-auto p-2 w-75 text-center border border-ash-gray rounded'>
    <div className='py-2 '>
      <FontAwesomeIcon className='text-danger' icon={faExclamationTriangle} />
      <p className='text-light mb-0'>{props.errorMessage}</p>
    </div>
  </h3>
);

export default ErrorText;
