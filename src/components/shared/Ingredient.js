import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import { Spinner, Input, Button } from 'reactstrap';
import Autocomplete from '../UI/Autocoplete/Autocomplete';
import produkty from '../../database/produkty.json';

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

  render() {
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
          <td>
            {Math.round(this.props.ingred.data.kcalPerGram * this.props.value)}{' '}
            kcal
          </td>
        );
        pieces =
          this.props.ingred.data.jednostka === 'porcja' ? (
            <td>porcja</td>
          ) : (
            <td>{`${(
              this.props.value / this.props.ingred.data.waga1szt
            ).toFixed(2)} [${this.props.ingred.data.jednostka}]`}</td>
          );
      } else if (this.props.ingred.errorMessage) {
        kcal = <td colSpan='2'>{this.props.ingred.errorMessage}</td>;
      }
    }

    let renderIngredient;

    if (this.props.addNew) {
      renderIngredient = (
        <tr>
          <td className='d-flex'>
            <Autocomplete
              searchTerm={this.state.searchTerm}
              elList={Object.keys(produkty)}
              setResult={(result) => this.autocompleteInput(result)}
            >
              <Input
                placeholder='title'
                autoFocus
                value={this.state.ingredientTitle}
                onChange={(event) => this.inputUpdateTitle(event)}
                bsSize='sm'
                onBlur={() => this.titleBlurHandler()}
              />
            </Autocomplete>
            {this.props.deleteIngredient ? (
              <Button
                size='sm'
                onClick={(event) =>
                  this.props.deleteIngredient(event.target.value)
                }
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            ) : (
              ''
            )}
          </td>
          <td>
            <Input
              placeholder='0'
              value={this.props.value}
              onChange={(event) => this.props.updateValue(event.target.value)}
              bsSize='sm'
              onKeyPress={(event) => {
                if (event.key === 'Enter') this.props.addNextInput();
              }}
            />
          </td>
        </tr>
      );
    } else if (this.props.isSpice) {
      renderIngredient = (
        <tr>
          <th scope='row'>{this.props.title}</th>
          <td colSpan='3'>
            <small>{this.props.value.join(', ')}</small>
          </td>
        </tr>
      );
    } else {
      renderIngredient = (
        <tr>
          <th scope='row'>{this.props.title}</th>
          <td>{this.props.value} g</td>
          {kcal}
          {pieces}
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
