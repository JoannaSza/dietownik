import React from 'react';

import Card from './Card';

import styles from './Diet.module.css';

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
    return (
      <div className={styles.Diet}>
        <div className={styles.smallScreen}>
          <div
            id='carouselExampleControls'
            className='carousel slide'
            data-ride='carousel'
            data-interval='false'
          >
            <div className='carousel-inner'>
              <div className='carousel-item active'>
                <Card
                  day={this.state.cards[0].day}
                  collapse={this.state.areCardsCollapsed}
                  onCollapse={() => this.setState({ areCardsCollapsed: true })}
                />
              </div>
              <div className='carousel-item'>
                <Card
                  day={this.state.cards[1].day}
                  collapse={this.state.areCardsCollapsed}
                  onCollapse={() => this.setState({ areCardsCollapsed: true })}
                />
              </div>
              <div className='carousel-item'>
                <Card
                  day={this.state.cards[2].day}
                  collapse={this.state.areCardsCollapsed}
                  onCollapse={() => this.setState({ areCardsCollapsed: true })}
                />
              </div>
            </div>
            {/* Arrows left right to control carousel, not used in mobile 
            <a
              className='carousel-control-prev bg-secondary'
              href='#carouselExampleControls'
              role='button'
              data-slide='prev'
            >
              <span
                className='carousel-control-prev-icon'
                aria-hidden='true'
              ></span>
              <span className='sr-only'>Previous</span>
            </a>
            <a
              className='carousel-control-next bg-secondary'
              href='#carouselExampleControls'
              role='button'
              data-slide='next'
            >
              <span
                className='carousel-control-next-icon'
                aria-hidden='true'
              ></span>
              <span className='sr-only'>Next</span>
            </a> */}

            <ul className='carousel-indicators mb-0'>
              <li
                data-target='#carouselExampleControls'
                data-slide-to='0'
                className='active'
              ></li>
              <li data-target='#carouselExampleControls' data-slide-to='1'></li>
              <li data-target='#carouselExampleControls' data-slide-to='2'></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Diet;
