import React from 'react';
import Meal from './Meal';
import styles from './Card.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faTrash,
  faWindowRestore,
} from '@fortawesome/free-solid-svg-icons';

import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { DatePickerCalendar } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';

class Card extends React.Component {
  state = { date: new Date(), showCalendar: false };
  toggleCalendar = () => {
    this.setState((prevState) => ({ showCalendar: !prevState.showCalendar }));
  };
  render() {
    const categoryNames = [
      'śniadanie',
      'II śniadanie',
      'obiad',
      'podwieczorek',
      'kolacja',
    ];

    const deleteHandler = (event) => {
      event.stopPropagation();
      this.props.onDelete();
    };

    const renderMeals = () => {
      return categoryNames.map((categoryName, idx) => (
        <Meal key={idx} title={categoryName} />
      ));
    };

    ///////collapse
    let cardClasses, cardButtons;

    if (this.props.collapse) {
      cardClasses = `d-flex flex-column overflow-auto ${styles.smallCard}`;
      if (this.props.day.date) {
        cardButtons = (
          <div className='col text-right pr-2 d-flex justify-content-end'>
            <div className='p-2' onClick={deleteHandler}>
              <FontAwesomeIcon icon={faTrash} size='lg' />
            </div>
          </div>
        );
      } else cardButtons = <div className='col'></div>;
    } else {
      cardClasses = 'vh-100 d-flex flex-column overflow-auto';
      cardButtons = (
        <div className='col text-right pr-2 d-flex justify-content-end'>
          <div className='pr-4' onClick={this.toggleCalendar}>
            <FontAwesomeIcon icon={faCalendarAlt} />
          </div>
          <div className='' onClick={this.props.onCollapse}>
            <FontAwesomeIcon icon={faWindowRestore} />
          </div>
        </div>
      );
    }

    const calendar = this.state.showCalendar ? (
      <div className='container bg-light'>
        <DatePickerCalendar
          date={this.state.date}
          onDateChange={(date) => this.setState({ date })}
          locale={pl}
        />
      </div>
    ) : null;

    return (
      <div className={cardClasses} onClick={this.props.onShow}>
        {/* W widoku komórkowym - nazwa dnia tygodnia 
      wędruje na środek, navbar zwija sie do burger 
      button po lewej stronie - wtedy znika problem height=100 - navbar
            
      Pomyśleć nad menu 3 kropkowym zamiast kalendarza*/}

        <div
          className={`container px-2 py-2 bg-dark text-light border ${
            this.props.collapse ? 'rounded' : ''
          }`}
        >
          <div className='row no-gutters align-items-center'>
            <div className='col'></div>
            <div className='col text-center'>
              <h5 className='mb-0'>{this.props.day.name}</h5>
              <h6 className='text-muted m-0'>
                <small>{this.props.day.date}</small>
              </h6>
            </div>
            {cardButtons}
          </div>
        </div>
        {calendar}
        {this.props.collapse ? null : (
          <div className='py-4 px-2 flex-grow-1 d-flex flex-column justify-content-around'>
            {renderMeals()}
          </div>
        )}
      </div>
    );
  }
}

export default Card;
