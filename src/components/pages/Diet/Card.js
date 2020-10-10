import React from 'react';
import Meal from './Meal';
import styles from './Card.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faCalendarAlt,
  faPlus,
  faWindowRestore,
} from '@fortawesome/free-solid-svg-icons';

const Card = (props) => {
  const categoryNames = [
    'śniadanie',
    'II śniadanie',
    'obiad',
    'podwieczorek',
    'kolacja',
  ];

  const collapseHandler = () => {
    props.onCollapse();
  };

  const renderMeals = () => {
    return categoryNames.map((categoryName, idx) => (
      <Meal key={idx} title={categoryName} />
    ));
  };

  const cardClasses = props.collapse
    ? `d-flex flex-column overflow-auto ${styles.smallCard}`
    : 'vh-100 d-flex flex-column overflow-auto';

  return (
    <div className={cardClasses}>
      {/* W widoku komórkowym - nazwa dnia tygodnia 
      wędruje na środek, navbar zwija sie do burger 
      button po lewej stronie - wtedy znika problem height=100 - navbar
            
      Pomyśleć nad menu 3 kropkowym zamiast kalendarza*/}

      <div className='container px-2 py-2 bg-dark text-light border'>
        <div className='row no-gutters align-items-center'>
          <div className='col'></div>
          <div className='col text-center'>
            <h5 className='mb-0'>{props.day.name}</h5>
            <h6 className='text-muted m-0'>
              <small>{props.day.date}</small>
            </h6>
          </div>
          <div className='col text-right pr-2 d-flex justify-content-end'>
            <div className='pr-4'>
              <FontAwesomeIcon icon={faCalendarAlt} />
            </div>
            <div className='' onClick={collapseHandler}>
              <FontAwesomeIcon icon={faWindowRestore} />
            </div>
          </div>
        </div>
      </div>
      {props.collapse ? null : (
        <div className='py-4 px-2 flex-grow-1 d-flex flex-column justify-content-around'>
          {renderMeals()}
        </div>
      )}
    </div>
  );
};

export default Card;
