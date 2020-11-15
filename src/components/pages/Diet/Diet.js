import React from 'react';
import { Transition } from 'react-transition-group';
import { connect } from 'react-redux';

import Card from './Card';
import Carousel from '../../UI/Carousel/Carousel';

import styles from './Diet.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const weekDaysPl = [
  'Niedziela',
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Sobota',
];

class Diet extends React.Component {
  state = {
    cardsAmount: 0,
    activeCard: 0,
    areCardsCollapsed: false,
    date: new Date(),
    cards: [
      {
        day: {
          name: 'Poniedziałek',
          date: '28.09.2020',
        },
      },
      {
        day: {
          name: 'Wtorek',
          date: '29.09.2020',
        },
      },
      {
        day: {
          name: 'Środa',
          date: '30.09.2020',
        },
      },
    ],
  };

  deleteCardHandler = (index) => {
    const newCards = this.state.cards.filter((el, idx) => {
      return idx !== index;
    });
    this.setState({ cards: newCards });
  };

  formatDate = (date) => {
    let day = date.getDate().toString();
    if (day.length === 1) day = `0${day}`;
    let month = (date.getMonth() + 1).toString();
    if (month.length === 1) month = `0${month}`;

    return {
      day: {
        name: weekDaysPl[date.getDay()],
        date: date ? `${day}.${month}.${date.getFullYear()}` : '',
      },
    };
  };

  addCardHandler = (event) => {
    event.stopPropagation();
    const today = new Date();
    const newCards = [...this.state.cards, this.formatDate(today)];
    this.setState({ cards: newCards });
  };

  dayChangeHandler = (day, index) => {
    const newCards = [...this.state.cards];
    newCards[index] = this.formatDate(day);
    this.setState({ cards: newCards });
  };

  showCardHandler = (index) => {
    this.setState({ activeCard: index });
  };

  render() {
    const renderCards = (collapsed) => {
      const cards = this.state.cards.map((card, index) => (
        <Card
          key={`${collapsed}-${index}`}
          day={card.day}
          dayChange={(day) => this.dayChangeHandler(day, index)}
          collapse={collapsed}
          onCollapse={() => this.setState({ areCardsCollapsed: true })}
          onDelete={() => this.deleteCardHandler(index)}
          onShow={() => this.showCardHandler(index)}
        />
      ));
      if (collapsed)
        cards.push(
          <Card
            key={renderCards.length}
            day={{
              name: (
                <FontAwesomeIcon
                  icon={faPlus}
                  size='lg'
                  onClick={this.addCardHandler}
                />
              ),
              date: '',
            }}
            collapse={true}
          />
        );
      return cards;
    };

    const defaultStyle = {
      position: 'static',
      opacity: '100%',
      transitionProperty: 'opacity',
      transitionDuration: '1000ms',
    };

    const transitionStyles = {
      entering: { opacity: '100%' },
      entered: { opacity: '100%' },
      exiting: { opacity: '0%' },
      exited: { opacity: '0%', position: 'absolute', top: '-100%' },
    };

    const renderNotCollapsed = (
      <Transition in={!this.state.areCardsCollapsed} timeout={1000}>
        {(state) => (
          <div
            className={
              !this.props.isSmallScreen
                ? 'container my-5 flex-grow-1 d-flex flex-wrap  justify-content-around align-items-center'
                : ''
            }
            key='carousel'
            style={{ ...defaultStyle, ...transitionStyles[state] }}
          >
            {this.props.isSmallScreen ? (
              <Carousel
                items={renderCards(false)}
                onIndexChange={(index) => this.setState({ activeCard: index })}
                activeIndex={this.state.activeCard}
              />
            ) : (
              renderCards(false)
            )}
          </div>
        )}
      </Transition>
    );

    const defaultStyle2 = {
      position: 'absolute',
      top: '0%',
      opacity: '0%',
      transitionProperty: 'opacity',
      transitionDuration: '1000ms',
    };

    const transitionStyles2 = {
      entering: { opacity: '100%' },
      entered: { opacity: '100%' },
      exiting: { opacity: '0%' },
      exited: { opacity: '0%', top: '-100%' },
    };

    const renderCollapsed = (
      <Transition in={this.state.areCardsCollapsed} timeout={1000}>
        {(state) => (
          <div
            key='renderCollapsed'
            style={{ ...defaultStyle2, ...transitionStyles2[state] }}
            className={`container vh-100 d-flex flex-column justify-content-center`}
            onClick={() => this.setState({ areCardsCollapsed: false })}
          >
            {renderCards(true)}
          </div>
        )}
      </Transition>
    );

    return (
      <div
        className={`flex-grow-1 d-flex flex-wrap justify-content-around align-items-center ${
          this.props.isSmallScreen ? styles.DietMobile : styles.Diet
        }`}
      >
        {renderNotCollapsed}
        {renderCollapsed}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSmallScreen: state.window.isSmall,
  };
};

export default connect(mapStateToProps)(Diet);
