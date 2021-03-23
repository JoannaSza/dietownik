import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

const Meal = (props) => {
  return (
    <div
      onClick={props.onClick}
      className='container mb-2 btn btn-outline-dark'
    >
      <div className='d-flex justify-content-between'>
        <div className='d-flex justify-content-between'>
          <h6 className='mb-1 font-weight-bold text-capitalize'>
            {props.title}
          </h6>
          <div className='col text-right my-auto'>
            <span className='mx-2 text-secondary'>
              <i className='fas fa-pen'></i>
            </span>
            <span className='mx-2 text-secondary'>
              <i className='fas fa-trash'></i>
            </span>
          </div>
        </div>
        {/* <div className='text-right'>
          <span className='mr-3 text-secondary'>
            <FontAwesomeIcon icon={faPen} />
          </span>
          <span className='mx-2 text-secondary'>
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </div> */}
      </div>
      <div className='pl-3 text-justify'>
        <small>{props.meal}</small>
      </div>
    </div>
  );
};

export default Meal;
