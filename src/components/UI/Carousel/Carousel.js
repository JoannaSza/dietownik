import React from 'react';

const Carousel = (props) => {
  let items = [],
    indicators = [];
  if (Array.isArray(props.children)) {
    props.children.forEach((child, index) => {
      items.push(
        <div
          className={`carousel-item ${index === props.active ? 'active' : ''}`}
          key={index}
        >
          {child}
        </div>
      );
      indicators.push(
        <li
          data-target='#carouselExampleControls'
          data-slide-to={`${index}`}
          className={`${index === props.active ? 'active' : ''}`}
        ></li>
      );
    });
  } else items = <div className='carousel-item active'>{props.children}</div>;

  return (
    <div
      id='carouselExampleControls'
      className='carousel slide'
      data-ride='carousel'
      data-interval='false'
    >
      <div className='carousel-inner'>{items}</div>

      <a
        className='carousel-control-prev'
        style={{ width: '24px' }}
        href='#carouselExampleControls'
        role='button'
        data-slide='prev'
      >
        {/* <span
                className='carousel-control-prev-icon'
                aria-hidden='true'
              ></span> */}
        <span className='sr-only'>Previous</span>
      </a>
      <a
        className='carousel-control-next'
        style={{ width: '24px' }}
        href='#carouselExampleControls'
        role='button'
        data-slide='next'
      >
        {/* <span
                className='carousel-control-next-icon'
                aria-hidden='true'
              ></span> */}
        <span className='sr-only'>Next</span>
      </a>

      <ul className='carousel-indicators mb-0'>{indicators}</ul>
    </div>
  );
};

export default Carousel;
