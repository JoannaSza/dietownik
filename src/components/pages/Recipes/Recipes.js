import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'reactstrap';
import {
  faSearch,
  faTimesCircle,
  faThumbtack,
  faSnowflake,
  faFire,
  faSwatchbook,
} from '@fortawesome/free-solid-svg-icons';

import InputGroup from '../../UI/InputGroup';
import MealButton from './MealButton';
import { updateObject } from '../../../shared/utility';

import Breakfast from '../../../IMG/breakfast.svg';
import Smoothie from '../../../IMG/smoothie.svg';
import Dinner from '../../../IMG/dinner.svg';
import Soup from '../../../IMG/soup.svg';
import Supper from '../../../IMG/supper.svg';
import Cheescake from '../../../IMG/cheesecake.svg';

const MealButtonsData = [
  { src: Breakfast, alt: 'Śniadanie' },
  { src: Smoothie, alt: 'II Śniadanie' },
  { src: Dinner, alt: 'Obiad' },
  { src: Soup, alt: 'Podwieczorek' },
  { src: Supper, alt: 'Kolacja' },
  { src: Cheescake, alt: 'Inne' },
];

const TempButtonsData = [
  { src: faFire, alt: 'Na ciepło' },
  { src: faSnowflake, alt: 'Na zimno' },
];

class Diet extends React.Component {
  state = {
    searchbar: {
      prepend: faSearch,
      value: '',
      elementConfig: {
        type: 'text',
        placeholder: 'Szukaj',
      },
    },
    activeCategory: 'Śniadanie',
  };

  clearSearchbar = () => {
    this.setState({
      searchbar: updateObject(this.state.searchbar, { value: '' }),
    });
  };

  inputChangedHandler = (event) => {
    this.setState({
      searchbar: updateObject(this.state.searchbar, {
        value: event.target.value,
      }),
    });
  };

  render() {
    const renderMealButtons = MealButtonsData.map((data, index) => (
      <MealButton
        id={`mealButton-${index}`}
        key={`mealButton-${index}`}
        {...data}
        isActive={this.state.activeCategory === data.alt}
        onClick={() => this.setState({ activeCategory: data.alt })}
        isImage={true}
      />
    ));

    const renderTempButtons = TempButtonsData.map((data, index) => (
      <MealButton
        id={`mealButton-${index}`}
        key={`mealButton-${index}`}
        {...data}
        isActive={this.state.activeCategory === data.alt}
        onClick={() => this.setState({ activeCategory: data.alt })}
      />
    ));

    return (
      <div className='d-flex flex-grow-1 no-gutters bg-rich-black flex-column '>
        <Container className='my-3 border border-secondary rounded bg-ash-gray'>
          <InputGroup
            className={'m-3'}
            prepend={this.state.searchbar.prepend}
            elementConfig={this.state.searchbar.elementConfig}
            value={this.state.searchbar.value}
            append={faTimesCircle}
            appendOnClick={this.clearSearchbar}
            changed={this.inputChangedHandler}
            touched={false}
          />
        </Container>
        <Container className='text-light'>
          <Row>
            <Col className='pl-0 d-flex flex-column' xs='4'>
              <div className='border border-secondary rounded mb-1 bg-celadon-blue d-flex align-items-center justify-content-between'>
                <h5 className='m-0 p-1'>Filtruj</h5>
                <span className='p-1'>
                  <FontAwesomeIcon icon={faThumbtack} />
                </span>
              </div>
              <div className='border border-secondary rounded mb-1 d-flex justify-content-center flex-wrap'>
                {renderMealButtons}
              </div>
              <div className='border border-secondary rounded mb-1 d-flex justify-content-center flex-wrap'>
                {renderTempButtons}
              </div>
              <div className='border border-secondary rounded mb-1'>4</div>
            </Col>
            <Col className='border border-secondary rounded' xs='8'>
              right column
            </Col>
          </Row>
        </Container>

        {/* Icons authors: */}
        {/* breakfast: Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
        {/* dinner: Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
        {/* supper: Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
        {/* smoothie: Icons made by <a href="https://www.flaticon.com/authors/monkik" title="monkik">monkik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
        {/* cheescake: Icons made by <a href="https://www.flaticon.com/authors/photo3idea-studio" title="photo3idea_studio">photo3idea_studio</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
        {/* soup: Icons made by <a href="https://www.flaticon.com/free-icon/soup_1981014" title="Nhor Phai">Nhor Phai</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
      </div>
    );
  }
}

export default Diet;
