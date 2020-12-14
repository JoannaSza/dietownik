/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import mealStyle from './Meal.module.css';

import Meal from './Meal';
import ErrorText from '../../UI/ErrorText';

const MealsList = (props) => {
  const viewClickHandler = (meal) => {
    const oldPath = props.history.location.pathname;
    props.history.push(`${oldPath}/${meal}`);
  };
  const renderAddMeal = (
    <div
      onClick={() => props.history.push('/posilki/nowy')}
      className={`py-2 px-4 my-2 card-link rounded bg-light border-ash-gray border-rounded w-100 text-justify ${mealStyle.AddButton} ${mealStyle.MealTitle}`}
    >
      <h5 className='mb-1 text-center border-bottom border-rich-black'>
        <small>Dodaj nowy posiłek </small>
        <a href='#' className='px-2 py-0 btn text-celadon-blue'>
          <FontAwesomeIcon icon={faPlus} size='sm' />
        </a>
      </h5>
    </div>
  );
  const renderMeals = () => {
    if (props.isLoading)
      return (
        <div className='m-auto pt-5 text-center'>
          <Spinner
            style={{ width: '5rem', height: '5rem' }}
            color='celadon-blue'
            size='xl'
          />
        </div>
      );
    else if (props.meals.length >= 1) {
      return props.meals.map((meal, index) => (
        <Meal
          key={'meal' + index}
          meal={meal}
          onViewClick={() => viewClickHandler(meal)}
        />
      ));
    } else if (props.errorMessage)
      return <ErrorText errorMessage={props.errorMessage} />;
  };
  return (
    <div>
      {renderAddMeal}
      {renderMeals()}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state.meals,
});

export default connect(mapStateToProps)(MealsList);
