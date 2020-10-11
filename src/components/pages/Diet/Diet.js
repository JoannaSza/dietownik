import React from 'react';

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

  addCardHandler = (event) => {
    event.stopPropagation();
    const today = new Date();
    let day = today.getDate().toString();
    if (day.length === 1) day = `0${day}`;
    let month = (today.getMonth() + 1).toString();
    if (month.length === 1) month = `0${month}`;
    const newCards = [
      ...this.state.cards,
      {
        day: {
          name: weekDaysPl[today.getDay()],
          date: `${day}.${month}.${today.getFullYear()}`,
        },
      },
    ];
    this.setState({ cards: newCards });
  };

  showCardHandler = (index) => {
    this.setState({ activeCard: index });
  };

  render() {
    const renderCards = this.state.cards.map((card, index) => (
      <Card
        key={index}
        day={card.day}
        collapse={this.state.areCardsCollapsed}
        onCollapse={() => this.setState({ areCardsCollapsed: true })}
        onDelete={() => this.deleteCardHandler(index)}
        onShow={() => this.showCardHandler(index)}
      />
    ));

    const renderCarousel = (
      <Carousel active={this.state.activeCard}>{renderCards}</Carousel>
    );
    const renderCollapsed = (
      <div
        className='vh-100 d-flex flex-column justify-content-center'
        onClick={() => this.setState({ areCardsCollapsed: false })}
      >
        {renderCards}
        <Card
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
          collapse={this.state.areCardsCollapsed}
        />
      </div>
    );

    return (
      <div className={styles.Diet}>
        <div className={styles.smallScreen}>
          {this.state.areCardsCollapsed ? renderCollapsed : renderCarousel}
        </div>
      </div>
    );
  }
}

export default Diet;
