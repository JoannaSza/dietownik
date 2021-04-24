import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import { Spinner, Input, Button } from 'reactstrap';
import Autocomplete from '../UI/Autocoplete/Autocomplete';
import produkty from '../../database/produkty.json';

export var myEnum = {
  a: 1,
  b: 2,
  c: 4,
  d: 8,
};

class Ingredient extends React.Component {
  state = { searchTerm: '', ingredientTitle: '' };
  componentDidMount = () => {
    if (!this.props.isSpice && !this.props.addNew)
      this.props.onGetIngredData(this.props.title);
    this.setState({ ingredientTitle: this.props.title });
  };

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.title !== this.props.title &&
      this.state.ingredientTitle !== this.props.title
    )
      this.setState({ ingredientTitle: this.props.title });
  };

  inputUpdateTitle = (event) => {
    this.setState({
      searchTerm: event.target.value,
      ingredientTitle: event.target.value,
    });
  };

  autocompleteInput = (result) => {
    this.props.updateTitle(result);
    this.setState({ searchTerm: '', ingredientTitle: result });
  };

  titleBlurHandler = () => {
    this.props.updateTitle(this.state.ingredientTitle);
    this.setState({ searchTerm: '' });
  };

  clickHandler = (event) => {
    if (this.props.onClick) this.props.onClick(event);
  };

  render() {
    const activeColumns = this.props.activeColumns
      ? this.props.activeColumns
      : [true, true, true, true];

    const deleteButton = this.props.deleteIngredient ? (
      <Button
        size='sm'
        onClick={(event) => this.props.deleteIngredient(event)}
        className='py-0 px-1'
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    ) : (
      ''
    );

    let kcal, pieces;
    if (this.props.ingred) {
      if (this.props.ingred.isLoading) {
        kcal = (
          <td>
            <Spinner />
          </td>
        );
        pieces = (
          <td>
            <Spinner />
          </td>
        );
      } else if (this.props.ingred.data) {
        kcal = (
          <td className='text-right'>
            {Math.round(this.props.ingred.data.kcalPerGram * this.props.value)}{' '}
            kcal
          </td>
        );
        pieces =
          this.props.ingred.data.jednostka === 'porcja' ? (
            <td className='text-right'>porcja</td>
          ) : (
            <td className='text-right'>{`${(
              this.props.value / this.props.ingred.data.waga1szt
            ).toFixed(2)} [${this.props.ingred.data.jednostka}]`}</td>
          );
      } else if (this.props.ingred.errorMessage) {
        kcal = (
          <td colSpan='2' className='text-right'>
            {this.props.ingred.errorMessage}
          </td>
        );
      }
    }

    let renderIngredient;

    if (this.props.addNew) {
      renderIngredient = (
        <tr onClick={this.clickHandler}>
          <td className='d-flex'>
            <Autocomplete
              searchTerm={this.state.searchTerm}
              elList={Object.keys(produkty)}
              setResult={(result) => this.autocompleteInput(result)}
              onBlur={() => this.titleBlurHandler()}
            >
              <Input
                style={{ minWidth: '120px' }}
                placeholder='title'
                autoFocus
                value={this.state.ingredientTitle}
                onChange={(event) => this.inputUpdateTitle(event)}
                bsSize='sm'
              />
            </Autocomplete>
            {deleteButton}
          </td>
          <td>
            <Input
              style={{ minWidth: '50px' }}
              placeholder='0'
              value={this.props.value}
              onChange={(event) => this.props.updateValue(+event.target.value)}
              bsSize='sm'
              onKeyPress={(event) => {
                if (
                  event.key === 'Enter' &&
                  this.props.addNew &&
                  this.props.addNextInput
                )
                  this.props.addNextInput();
              }}
            />
          </td>
        </tr>
      );
    } else if (this.props.isSpice) {
      renderIngredient = (
        <tr onClick={this.clickHandler}>
          <th scope='row'>{this.props.title}</th>
          <td colSpan='3' className='text-right'>
            <small>{this.props.value.join(', ')}</small>
          </td>
        </tr>
      );
    } else {
      renderIngredient = (
        <tr onClick={this.clickHandler}>
          {activeColumns[0] ? (
            <th scope='row' className='w-50'>
              {this.props.title}
            </th>
          ) : (
            ''
          )}
          {activeColumns[1] ? (
            <td className='text-right'>
              {this.props.value + ' g '}
              {deleteButton}
            </td>
          ) : (
            ''
          )}
          {activeColumns[2] ? kcal : null}
          {activeColumns[3] ? pieces : null}
        </tr>
      );
    }

    return renderIngredient;
  }
}

const mapStateToProps = (state, ownProps) => ({
  ingred: state.ingreds[ownProps.title],
});

const mapDispatchToProps = (dispatch) => ({
  onGetIngredData: (title) => dispatch(actions.getIngred(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ingredient);

Ingredient.propTypes = {
  title: PropTypes.string.isRequired,
  updateTitle: PropTypes.func,

  value: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.array]),
  updateValue: PropTypes.func,

  isSpice: PropTypes.bool,

  addNew: PropTypes.bool,
  addNextInput: PropTypes.func,

  deleteIngredient: PropTypes.func,

  activeColumns: PropTypes.arrayOf(PropTypes.bool),

  onClick: PropTypes.func,
};
