import React from 'react';
import Card from './Card';

class Accordion extends React.Component {
  state = {
    openedCards: [],
  };

  componentDidMount = () => {
    this.updateOpenedCardsNumber();
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.cards.length !== this.props.cards.length) {
      this.updateOpenedCardsNumber();
    }
  };

  updateOpenedCardsNumber = () => {
    const newOpenedCards = new Array(this.props.cards.length);
    newOpenedCards.fill(false, 0);
    newOpenedCards[0] = true;
    this.setState({ openedCards: [...newOpenedCards] });
  };

  expandHandler = (index) => {
    const newOpenedCards = [...this.state.openedCards];
    newOpenedCards[index] = !newOpenedCards[index];
    this.setState({ openedCards: [...newOpenedCards] });
  };

  render() {
    const renderCards = this.props.cards
      ? this.props.cards.map((card, index) => (
          <Card
            key={'card-' + index}
            onExpand={() => this.expandHandler(index)}
            isOpen={this.state.openedCards[index]}
            header={card.header}
            content={card.content}
          />
        ))
      : null;

    return renderCards;
  }
}

export default Accordion;
