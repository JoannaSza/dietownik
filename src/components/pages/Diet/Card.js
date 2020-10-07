import React from 'react';
import Meal from './Meal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faCalendarAlt,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

const Card = () => {
  const categoryNames = [
    'śniadanie',
    'II śniadanie',
    'obiad',
    'podwieczorek',
    'kolacja',
  ];

  const renderMeals = () => {
    return categoryNames.map((categoryName, idx) => (
      <Meal key={idx} title={categoryName} />
    ));
  };

  return (
    <div className='vh-100 d-flex flex-column overflow-auto'>
      {/* W widoku komórkowym - nazwa dnia tygodnia 
      wędruje na środek, navbar zwija sie do burger 
      button po lewej stronie - wtedy znika problem height=100 - navbar
            
      Pomyśleć nad menu 3 kropkowym zamiast kalendarza*/}

      <div className='container px-2 py-2 bg-dark text-light border'>
        <div className='row no-gutters align-items-center'>
          <div className='col'>
            <div className='px-1'>
              <FontAwesomeIcon icon={faBars} />
            </div>
          </div>
          <div className='col text-center'>
            <h5 className='mb-0'>Poniedziałek</h5>
            <h6 className='text-muted m-0'>
              <small>28.09.2020</small>
            </h6>
          </div>
          <div className='col text-right pr-2 d-flex justify-content-end'>
            <div className='pr-3'>
              <FontAwesomeIcon icon={faCalendarAlt} />
            </div>
            <div className=''>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
        </div>
      </div>

      <div className='py-4 px-2 flex-grow-1 d-flex flex-column justify-content-around'>
        {renderMeals()}
      </div>
    </div>
  );
};

export default Card;
