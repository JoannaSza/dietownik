import React from 'react';

import { Spinner } from 'reactstrap';

import Logo from '../../UI/Logo';

const LoginCard = (props) => {
  return (
    <div className='card mx-auto my-auto p-3'>
      <div className='card-body text-center'>
        <Logo />
        <h4 className='card-title font-weight-bold font-italic mt-4 mb-5 text-celadon-blue'>
          Dietownik
        </h4>
        <h6 className='card-subtitle mb-3 text-ash-gray'>{props.cardTitle}</h6>

        <form
          onSubmit={props.onSubmit}
          className='container no-gutters'
          noValidate
        >
          {props.inputs}

          {props.additionalData}
          <div className='row mt-3'>
            <button
              type='submit'
              className='btn w-100 text-light mb-3 btn-celadon-blue'
            >
              {props.isLoading ? (
                <Spinner size='sm' color='text-light' />
              ) : (
                props.submitText
              )}
            </button>
          </div>
          <div className='row'>{props.googleAuth}</div>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
