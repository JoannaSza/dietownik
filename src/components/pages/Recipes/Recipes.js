import React from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import {
  faSearch,
  faTimesCircle,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import InputGroup from '../../UI/InputGroup';
import Filters from './Filters';
import Footer from './Footer';
import MealsList from './MealsList';

import { updateObject } from '../../../shared/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    filters: {
      meal: 'śniadanie',
      temp: '',
    },
  };

  componentDidMount = () => {
    this.props.onGetMeals(this.state.filters.meal);
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

  filterChangeHandler = (filter, value) => {
    this.setState({
      filters: updateObject(this.state.filters, { [filter]: value }),
    });
    if (filter === 'meal') this.props.onGetMeals(value);
    console.log(this.props);
  };

  render() {
    return (
      <div className='d-flex flex-grow-1 no-gutters bg-rich-black flex-column'>
        <div className='h-100'>
          <Container className='my-3 border border-ash-gray rounded bg-ash-gray'>
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
          <Container>
            <Row>
              <Col className='pl-0 d-flex flex-column' xs='4'>
                <Filters
                  activeMeal={this.state.filters.meal}
                  onMealChange={(value) =>
                    this.filterChangeHandler('meal', value)
                  }
                  activeTemp={this.state.filters.temp}
                  onTempChange={(value) =>
                    this.filterChangeHandler('temp', value)
                  }
                />
              </Col>
              <Col className='border border-ash-gray rounded' xs='8'>
                <MealsList />
              </Col>
            </Row>
          </Container>
        </div>

        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetMeals: (activeCategory) => dispatch(actions.getMeals(activeCategory)),
  };
};

export default connect(null, mapDispatchToProps)(Diet);
