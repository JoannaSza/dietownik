import React from 'react';
import { Transition } from 'react-transition-group';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faTrash,
  faWindowRestore,
} from '@fortawesome/free-solid-svg-icons';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Meal from './Meal';
import styles from './Card.module.css';

class Card extends React.Component {
  state = { showCalendar: false };
  toggleCalendar = () => {
    this.setState((prevState) => ({ showCalendar: !prevState.showCalendar }));
  };

  hideCalendar = () => {
    if (this.state.showCalendar) this.setState({ showCalendar: false });
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

    const dateChangeHandler = (newDate) => {
      this.props.dayChange(newDate);
      this.setState({ showCalendar: false });
    };

    const renderMeals = () => {
      return categoryNames.map((categoryName, idx) => (
        <Meal key={idx} title={categoryName} />
      ));
    };

    ///////collapse
    let cardClasses, cardButtons;

    if (this.props.collapse) {
      cardClasses = `container d-flex flex-column overflow-auto ${
        this.props.isSmallScreen
          ? styles.collapsedCardMobile
          : styles.collapsedCard
      }`;
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
      cardClasses = this.props.isSmallScreen
        ? 'vh-100 d-flex flex-column overflow-auto'
        : `container rounded mx-2 my-4 p-0 bg-light d-flex flex-column overflow-auto ${styles.bigScreenCard}`;
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

    const defaultStyle = {
      transitionProperty: 'top',
      transitionDuration: '500ms',
    };

    const transitionStyles = {
      entering: { position: 'absolute', top: '0%', right: '0%' },
      entered: { position: 'absolute', top: '0%', right: '0%' },
      exiting: { position: 'absolute', top: '-100%', right: '0%' },
      exited: { position: 'absolute', top: '-100%', right: '0%' },
    };

    const calendar = (
      <Transition in={this.state.showCalendar} timeout={500}>
        {(state) => (
          <div
            className='container bg-light p-5'
            style={{ ...defaultStyle, ...transitionStyles[state] }}
          >
            <Calendar
              key='calendar'
              value={new Date()}
              onChange={(date) => dateChangeHandler(date)}
              minDate={new Date()}
            />
          </div>
        )}
      </Transition>
    );

    return (
      <div
        className={cardClasses}
        onClick={this.props.collapse ? () => this.props.onShow() : null}
      >
        {/* W widoku komórkowym - nazwa dnia tygodnia 
      wędruje na środek, navbar zwija sie do burger 
      button po lewej stronie - wtedy znika problem height=100 - navbar
            
      Pomyśleć nad menu 3 kropkowym zamiast kalendarza*/}

        <div
          className={`container px-2 py-2 bg-dark text-light border border-dark ${
            this.props.collapse ? 'rounded' : ''
          }`}
          style={{ zIndex: 2 }}
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
        {this.props.collapse ? null : (
          <div
            className='py-4 px-2 flex-grow-1 d-flex flex-column justify-content-around position-relative'
            onClick={this.hideCalendar}
          >
            {calendar}
            {renderMeals()}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSmallScreen: state.window.isSmall,
  };
};

export default connect(mapStateToProps)(Card);
