import React from 'react';
import { Spinner } from 'reactstrap';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { connect } from 'react-redux';

import Meal from './Meal';

const MealsList = (props) => {
  console.log(props);
  const renderMeals = () => {
    if (props.isLoading)
      return (
        <div
          className='m-auto pt-5 text-center'
          style={{ transform: 'scale(2.5)' }}
        >
          <Spinner color='celadon-blue' size='xl' />
        </div>
      );
    else if (props.meals.length >= 1) {
      return props.meals.map((meal, index) => (
        <Meal key={'meal' + index} meal={meal} />
        // <div key={'meal' + index} className='p-2 my-1 rounded'>
        //   <Toast>
        //     <ToastHeader>test</ToastHeader>
        //     <ToastBody>{meal}</ToastBody>
        //   </Toast>
        // </div>
      ));
    } else if (props.errorMessage)
      return (
        <h3 className='mt-5 mx-auto p-2 w-75 text-center border border-ash-gray rounded'>
          <div className='py-2 '>
            <FontAwesomeIcon
              className='text-danger'
              icon={faExclamationTriangle}
            />
            <p className='text-light mb-0'>{props.errorMessage}</p>
          </div>
        </h3>
      );
  };
  return <div>{renderMeals()}</div>;
};

const mapStateToProps = (state) => ({
  ...state.meals,
});

export default connect(mapStateToProps)(MealsList);
