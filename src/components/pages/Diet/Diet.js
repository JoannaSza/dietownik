import React from 'react';
import { Transition } from 'react-transition-group';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { sortByDate } from '../../../shared/utility';

import Card from './Card';
import Carousel from '../../UI/Carousel/Carousel';
import { Spinner } from 'reactstrap';

import styles from './Diet.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import {
  defaultStyle,
  defaultStyle2,
  defaultStyle3,
  transitionStyles,
  transitionStyles2,
  transitionStyles3,
} from './DietTransitions';

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

  componentDidMount = () => {
    this.props.onGetDiet();
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
        date: date ? `${date.getFullYear()}-${month}-${day}` : '',
      },
    };
  };

  addCardHandler = (event) => {
    event.stopPropagation();
    this.props.onAddCard();
  };

  dayChangeHandler = (day, oldDay) => {
    day = new Date(day.getTime() + Math.abs(day.getTimezoneOffset() * 60000));
    this.props.onEditCardDate(oldDay, day.toISOString().split('T')[0]);
  };

  showCardHandler = (index) => {
    this.props.onChangeActiveCard(index);
    //this.setState({ activeCard: index });
  };

  render() {
    const mainDivClasses = `flex-grow-1 d-flex flex-wrap justify-content-around align-items-center ${
      this.props.isSmallScreen ? styles.DietMobile : styles.Diet
    }`;

    const addDayCard = (
      <Card
        onClick={this.addCardHandler}
        className={`${this.props.isSmallScreen ? '' : 'buttonHover'} w-80`}
        key='addDayCard'
        day={{
          name: (
            <div className='w-100'>
              <FontAwesomeIcon icon={faPlus} size='lg' />
            </div>
          ),
          date: '',
        }}
        collapse={true}
      />
    );

    const orderBreaker = (
      <div key='orderBreaker' style={{ height: 0, flexBasis: '100%' }}></div>
    );

    let cardsData;
    if (this.props.dietData) {
      cardsData = sortByDate(Object.keys(this.props.dietData)).map((day) => {
        return {
          ...this.formatDate(new Date(day)),
          data: this.props.dietData[day],
        };
      });
    }
    const renderCards = (collapsed) => {
      let cards = [];
      if (cardsData) {
        cards = cardsData.map((card, index) => (
          <Card
            key={`${collapsed}-${index}`}
            day={card.day}
            data={card.data}
            dayChange={(day) => this.dayChangeHandler(day, card.day.date)}
            onEditLock={(isLocked) =>
              this.props.onEditCardLock(card.day.date, isLocked)
            }
            collapse={collapsed}
            onCollapse={() => this.setState({ areCardsCollapsed: true })}
            onDelete={() => this.props.onDeleteCard(card.day.date)}
            onShow={() => this.showCardHandler(index)}
          />
        ));
        if (collapsed) {
          cards.push(addDayCard);
        } else if (!this.props.isSmallScreen) {
          cards.push(orderBreaker);
          cards.push(addDayCard);
        }
        return cards;
      } else {
        cards.push(addDayCard);
        return cards;
      }
    };
    const renderNotCollapsed = (
      <Transition
        in={!this.state.areCardsCollapsed && !this.props.isLoading}
        timeout={1000}
      >
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
                onIndexChange={(index) => this.props.onChangeActiveCard(index)}
                activeIndex={this.props.activeCard}
              />
            ) : (
              renderCards(false)
            )}
          </div>
        )}
      </Transition>
    );

    const renderCollapsed = (
      <Transition
        in={this.state.areCardsCollapsed && !this.props.isLoading}
        timeout={1000}
      >
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

    const renderSpinner = (
      <Transition in={this.props.isLoading} timeout={1000}>
        {(state) => (
          <div
            key='renderSpinner'
            style={{ ...defaultStyle3, ...transitionStyles3[state] }}
          >
            <Spinner className={styles.spinner} />
          </div>
        )}
      </Transition>
    );
    const renderContent = (
      <div className={mainDivClasses}>
        {renderSpinner}
        {renderNotCollapsed}
        {renderCollapsed}
      </div>
    );

    return renderContent;
  }
}

const mapStateToProps = (state) => {
  return {
    isSmallScreen: state.window.isSmall,
    isLoading: state.diet.isLoading,
    error: state.diet.error,
    dietData: state.diet.diet,
    activeCard: state.diet.activeCardIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetDiet: () => dispatch(actions.getDiet()),
    onAddCard: () => dispatch(actions.addCard()),
    onDeleteCard: (cardDate) => dispatch(actions.deleteCard(cardDate)),
    onEditCardDate: (oldDate, newDate) =>
      dispatch(actions.editCard(oldDate, newDate)),
    onEditCardLock: (cardDate, isLocked) =>
      dispatch(actions.editCardLock(cardDate, isLocked)),
    onChangeActiveCard: (newIndex) =>
      dispatch(actions.changeActiveCardIndex(newIndex)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Diet);
