import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

import { Spinner, Input, Button } from "reactstrap";

class Ingredient extends React.Component {
	componentDidMount = () => {
		if (!this.props.isSpice && !this.props.addNew)
			this.props.onGetIngredData(this.props.title);
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
					this.props.ingred.data.jednostka === "porcja" ? (
						<td>porcja</td>
					) : (
						<td>{`${(
							this.props.value / this.props.ingred.data.waga1szt
						).toFixed(2)} [${this.props.ingred.data.jednostka}]`}</td>
					);
			} else if (this.props.ingred.errorMessage) {
				kcal = <td colSpan="2">{this.props.ingred.errorMessage}</td>;
			}
		}

		let renderIngredient;

		if (this.props.addNew) {
			renderIngredient = (
				<tr>
					<td className="d-flex">
						<Input
							placeholder="title"
							autoFocus
							value={this.props.title}
							onChange={(event) => this.props.updateTitle(event)}
							bsSize="sm"
						/>
						<Button
							size="sm"
							onClick={(event) => this.props.deleteIngredient(event)}
						>
							<FontAwesomeIcon icon={faTrash} />
						</Button>
					</td>
					<td>
						<Input
							placeholder="0"
							value={this.props.value}
							onChange={(event) => this.props.updateValue(event)}
							bsSize="sm"
							onKeyPress={(event) => {
								if (event.key === "Enter") this.props.addNextInput();
							}}
						/>
					</td>
				</tr>
			);
		} else if (this.props.isSpice) {
			renderIngredient = (
				<tr>
					<th scope="row">{this.props.title}</th>
					<td colSpan="3">
						<small>{this.props.value.join(", ")}</small>
					</td>
				</tr>
			);
		} else {
			renderIngredient = (
				<tr>
					<th scope="row">{this.props.title}</th>
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
