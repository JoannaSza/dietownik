import React from 'react';

import Card from './Card';
import Carousel from '../../UI/Carousel';

import styles from './Diet.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

class Diet extends React.Component {
  state = {
    cardsAmount: 0,
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

  //if collapse = false show carousel, if collapse = true show all cards on one view

  render() {
    const renderCards = this.state.cards.map((card, index) => (
      <Card
        key={index}
        day={card.day}
        collapse={this.state.areCardsCollapsed}
        onCollapse={() => this.setState({ areCardsCollapsed: true })}
      />
    ));

    const renderCarousel = <Carousel>{renderCards}</Carousel>;
    const renderCollapsed = <div>{renderCards}</div>;

    return (
      <div className={styles.Diet}>
        <div className={styles.smallScreen}>
          {/* <div className='px-1 mt-2 fixed-top text-light'>
            <FontAwesomeIcon icon={faBars} />
          </div> */}
          {this.state.areCardsCollapsed ? renderCollapsed : renderCarousel}
        </div>
      </div>
    );
  }
}

export default Diet;
