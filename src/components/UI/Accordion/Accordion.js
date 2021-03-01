import React from 'react';
import Card from './Card';

class Accordion extends React.Component {
  state = {
    active: -1,
  };

  expandHandler = (index) => {
    this.setState({ active: index });
  };

  render() {
    const renderCards = this.props.cards
      ? this.props.cards.map((card, index) => (
          <Card
            key={'card-' + index}
            onExpand={() => this.expandHandler(index)}
            isOpen={true} //this.state.active === index}
            header={card.header}
            content={card.content}
          />
        ))
      : null;

    return renderCards;
  }
}

export default Accordion;
