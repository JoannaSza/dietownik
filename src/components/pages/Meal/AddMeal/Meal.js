import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";

import { Container, Row, Col, Button, Spinner } from "reactstrap";
import { updateObject, checkValidity } from "../../../../shared/utility";

import Input from "../../../UI/InputGroup";
import Ingredients from "../Ingredients";

class Meal extends React.Component {
	state = {
		inputs: {
			title: {
				value: "",
				elementConfig: {
					type: "text",
					placeholder: "Tytuł",
				},
				validation: {
					required: true,
				},
				valid: false,
				errorMsg: "",
			},
			category: {
				value: "śniadanie",
				elementConfig: {
					type: "dropdown",
					items: [
						"śniadanie",
						"II śniadanie",
						"obiad",
						"podwieczorek",
						"kolacja",
						"Inne",
					],
				},
				validation: {
					required: true,
				},
				valid: false,
				errorMsg: "",
			},
			description: {
				value: "",
				elementConfig: {
					type: "textarea",
					placeholder: "opis",
					rows: 3,
				},
				validation: {
					required: true,
				},
				valid: false,
				errorMsg: "",
			},
		},
		ingredients: {},
		submitted: false,
		action: "new",
		dataLoaded: false,
	};

	componentDidMount = () => {
		const mealTitle = this.props.match.params.title;
		const category = this.props.match.params.category;
		this.props.onGetMeal(category, mealTitle);
		if (mealTitle && category) {
			const updatedTitle = updateObject(this.state.inputs.title, {
				value: mealTitle,
			});
			const updatedCategory = updateObject(this.state.inputs.category, {
				value: category,
			});
			const updatedInputs = updateObject(this.state.inputs, {
				title: updatedTitle,
				category: updatedCategory,
			});
			this.setState({ inputs: updatedInputs, action: "edit" });
		}
	};

	componentDidUpdate = () => {
		if (
			this.state.action === "edit" &&
			!this.state.dataLoaded &&
			this.props.meal &&
			!this.props.isLoading
		) {
			const updatedDescr = updateObject(this.state.inputs.description, {
				value: this.props.meal.opis,
			});
			const updatedInputs = updateObject(this.state.inputs, {
				description: updatedDescr,
			});
			this.setState({
				inputs: updatedInputs,
				ingredients: this.props.meal.produkty,
				dataLoaded: true,
			});
		}
	};

	inputChangedHandler = (event, inputId) => {
		const updatedInputElement = updateObject(this.state.inputs[inputId], {
			value: event.target.value,
			...checkValidity(
				event.target.value,
				this.state.inputs[inputId].validation
			),
		});
		const updatedInputs = updateObject(this.state.inputs, {
			[inputId]: updatedInputElement,
		});

		let inputsAreValid = true;
		for (let inputId in updatedInputs) {
			inputsAreValid = updatedInputs[inputId].valid && inputsAreValid;
		}
		this.setState({ inputs: updatedInputs, inputsAreValid });
	};

	addIngredientHandler = () => {
		const ingredients = { ...this.state.ingredients, "": "" };
		this.setState({ ingredients });
	};

	updateIngredientHandler = (ingredient) => {
		let ingredients;
		//target, name, value
		if (ingredient.name === "value") {
			const newValue = +ingredient.value;
			ingredients = { ...this.state.ingredients };
			if (newValue) ingredients[ingredient.target] = +ingredient.value;
		} else if (ingredient.name === "title") {
			const keys = Object.keys(this.state.ingredients);
			keys.forEach((key) => {
				key !== ingredient.target
					? (ingredients = {
							...ingredients,
							[key]: this.state.ingredients[key],
					  })
					: (ingredients = {
							...ingredients,
							[ingredient.value]: this.state.ingredients[key],
					  });
			});
		} else if ((ingredient.name = "delete")) {
			const keys = Object.keys(this.state.ingredients);
			keys.forEach((key) => {
				if (key !== ingredient.target) {
					ingredients = {
						...ingredients,
						[key]: this.state.ingredients[key],
					};
				}
			});
		} else {
			ingredients = { ...this.state.ingredients };
		}
		this.setState({ ingredients });
	};

	submitHandler = () => {
		const category = this.state.inputs.category.value;
		if (this.state.inputsAreValid) {
			const newData = {
				ocena: 5,
				opis: this.state.inputs.description.value,
				produkty: this.state.ingredients,
			};
			console.log(newData);
			this.props.onAddMeal(category, newData, this.state.inputs.title.value); //change firebase rules for write for this to work
		} else this.setState({ submitted: true });
	};

	render() {
		const renderInputs = Object.keys(this.state.inputs).map((key) => {
			const input = this.state.inputs[key];
			return (
				<Input
					className="w-100"
					key={key}
					elementConfig={input.elementConfig}
					value={input.value}
					changed={(event) => this.inputChangedHandler(event, key)}
					valid={input.valid}
					errorText={input.errorMsg}
					touched={this.state.submitted}
				/>
			);
		});

		const renderDescription = renderInputs.pop();

		return (
			<div className="flex-grow-1 bg-rich-black">
				<Container>
					<Row className="mb-4">
						<Col className="text-right">
							<Button
								className="mt-2"
								color="ash-gray"
								size="sm"
								onClick={() => this.props.history.goBack()}
							>
								Wróć do listy posiłków
							</Button>
						</Col>
					</Row>
					<Row className="mx-4">
						<h3 className="mb-3 pb-2 text-celadon-blue text-center font-courgette w-100">
							{this.state.action === "new"
								? "Dodaj nowy posiłek"
								: "Edytuj posiłek"}
						</h3>
						<Container>{renderInputs}</Container>
					</Row>
					<Row className="mx-4 mb-2">
						<Ingredients
							add="true"
							addIngredient={this.addIngredientHandler}
							data={this.state.ingredients}
							updateIngredient={this.updateIngredientHandler}
						/>
					</Row>
					<Row className="mx-4">
						<Container>{renderDescription}</Container>
					</Row>
					<Row className="mx-4 mb-3">
						<Col className="text-right p-0">
							<Button
								className="w-25"
								color="ash-gray"
								size="sm"
								onClick={this.submitHandler}
							>
								Zapisz
							</Button>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		meal: state.meals.meal,
		isLoading: state.meals.isLoading,
		errorMessage: state.meals.errorMessage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAddMeal: (category, data, title) =>
			dispatch(actions.addMeal(category, data, title)),
		onGetMeal: (category, title) => dispatch(actions.getMeal(category, title)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Meal);
