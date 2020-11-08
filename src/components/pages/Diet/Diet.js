import React from 'react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

import Card from './Card2';
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
    return {
      day: {
        name: weekDaysPl[date.getDay()],
        date: date ? format(date, 'dd.MM.yyyy', { locale: pl }) : '',
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
    const renderCards = this.state.cards.map((card, index) => (
      <Card
        key={index}
        day={card.day}
        dayChange={(day) => this.dayChangeHandler(day, index)}
        collapse={this.state.areCardsCollapsed}
        onCollapse={() => this.setState({ areCardsCollapsed: true })}
        onDelete={() => this.deleteCardHandler(index)}
        onShow={() => this.showCardHandler(index)}
      />
    ));

    if (this.state.areCardsCollapsed)
      renderCards.push(
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
          collapse={this.state.areCardsCollapsed}
        />
      );

    const renderCarousel = (
      //<Carousel active={this.state.activeCard}>{renderCards}</Carousel>
      <Carousel
        items={renderCards}
        onIndexChange={(index) => this.setState({ activeCard: index })}
        activeIndex={this.state.activeCard}
      />
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
      <div
        className={`flex-grow-1 d-flex flex-wrap  justify-content-around align-items-center ${styles.Diet}`}
      >
        <div className='smallScreen'>
          {this.state.areCardsCollapsed ? renderCollapsed : renderCarousel}
        </div>

        {/* <div className='bigScreen>'> */}
        {/* <div className='container d-flex flex-wrap  justify-content-around align-items-center'> */}
        {renderCards}
        {/* </div> */}
        {/* </div> */}
      </div>
    );
  }
}

export default Diet;
