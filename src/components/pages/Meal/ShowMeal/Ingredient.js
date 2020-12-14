import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';

import { Spinner } from 'reactstrap';

class Ingredient extends React.Component {
  componentDidMount = () => {
    if (!this.props.isSpice) this.props.onGetIngredData(this.props.title);
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
          <td>{this.props.ingred.data.kcalPerGram * this.props.value} kcal</td>
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
    const renderIngredient = this.props.isSpice ? (
      <tr>
        <th scope='row'>{this.props.title}</th>
        <td colSpan='3'>
          <small>{this.props.value.join(', ')}</small>
        </td>
      </tr>
    ) : (
      <tr>
        <th scope='row'>{this.props.title}</th>
        <td>{this.props.value} g</td>
        {kcal}
        {pieces}
      </tr>
    );
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
