import React from 'react';

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';

const completeCarousel = (props) => {
  const changeHandler = (direction) => {
    let nextIndex;
    if (direction === 1)
      nextIndex =
        props.activeIndex === props.items.length - 1
          ? 0
          : props.activeIndex + 1;
    else if (direction === -1)
      nextIndex =
        props.activeIndex === 0
          ? props.items.length - 1
          : props.activeIndex - 1;
    else console.log('Error inside carousel!');
    props.onIndexChange(nextIndex);
  };

  const goToIndex = (newIndex) => {
    props.onIndexChange(newIndex);
  };

  const slides = props.items.map((item, index) => {
    return <CarouselItem key={index}>{item}</CarouselItem>;
  });

  const controls = props.showControls
    ? [
        <CarouselControl
          key='prev'
          direction='prev'
          directionText='Previous'
          onClickHandler={() => changeHandler(-1)}
        />,
        <CarouselControl
          key='next'
          direction='next'
          directionText='Next'
          onClickHandler={() => changeHandler(1)}
        />,
      ]
    : null;

  return (
    <Carousel
      activeIndex={props.activeIndex}
      next={() => changeHandler(1)}
      previous={() => changeHandler(-1)}
      interval={false}
    >
      <CarouselIndicators
        items={props.items}
        activeIndex={props.activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      {controls}
    </Carousel>
  );
};

export default completeCarousel;
