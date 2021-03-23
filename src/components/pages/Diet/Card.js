import React from 'react';
import { withRouter } from 'react-router-dom';
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

  deleteHandler = (event) => {
    event.stopPropagation();
    this.props.onDelete();
  };

  dateChangeHandler = (newDate) => {
    this.props.dayChange(newDate);
    this.setState({ showCalendar: false });
  };

  cardClickHandler = (e) => {
    if (this.props.collapse && this.props.onShow) this.props.onShow();
    else if (this.props.onClick) this.props.onClick(e);
  };

  render() {
    const categoryNames = [
      'śniadanie',
      'II śniadanie',
      'obiad',
      'podwieczorek',
      'kolacja',
    ];

    // if (this.props.data)
    //   categoryNames = Object.keys(this.props.data).map((key) => ({
    //     [key]: this.props.data[key]
    //   }))
    // else categoryNames =
    //   const categoryNames = this.props.data
    //     ? Object.keys(this.props.data)
    //     : ['śniadanie', 'II śniadanie', 'obiad', 'podwieczorek', 'kolacja'];

    const renderMeals = () => {
      return categoryNames.map((categoryName, idx) => {
        let meal;
        if (this.props.data && this.props.data[categoryName])
          meal = this.props.data[categoryName];
        else meal = 'Nie wybrano posiłku';
        return (
          <Meal
            onClick={() => this.props.history.push(`/posilki/${categoryName}`)}
            key={idx}
            title={categoryName}
            meal={meal}
          />
        );
      });
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
            <div className='p-2' onClick={this.deleteHandler}>
              <FontAwesomeIcon icon={faTrash} size='lg' />
            </div>
          </div>
        );
      } else cardButtons = <div className='col'></div>;
    } else {
      cardClasses = this.props.isSmallScreen
        ? 'vh-100 vw-100 d-flex flex-column overflow-auto'
        : `container rounded mx-2 my-4 p-0 bg-light d-flex flex-column overflow-auto ${styles.bigScreenCard}`;
      cardButtons = (
        <div className='col text-right pr-2 d-flex justify-content-end'>
          <div className='pr-4 buttonHover' onClick={this.toggleCalendar}>
            <FontAwesomeIcon icon={faCalendarAlt} />
          </div>
          <div className='buttonHover' onClick={this.props.onCollapse}>
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
              onChange={(date) => this.dateChangeHandler(date)}
              minDate={new Date()}
            />
          </div>
        )}
      </Transition>
    );

    return (
      <div
        className={`${cardClasses} ${this.props.className}`}
        onClick={this.cardClickHandler}
      >
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

export default connect(mapStateToProps)(withRouter(Card));
