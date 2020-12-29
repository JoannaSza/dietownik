import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Button, Spinner } from "reactstrap";
import { correctEndOfLineWords } from "../../../../shared/utility";

import { connect } from "react-redux";
import * as actions from "../../../../store/actions";

import Ingredients from "../Ingredients";
import ErrorText from "../../../UI/ErrorText";

class Meal extends React.Component {
	state = {
		category: "",
		mealTitle: "",
	};
	componentDidMount = () => {
		const mealTitle = this.props.match.params.title;
		const category = this.props.match.params.category;
		this.props.onGetMeal(category, mealTitle);
		this.setState({ mealTitle, category });
	};
	render() {
		const mealTitle = this.props.match.params.title;
		let ingredientsList = null;
		if (this.props.isLoading)
			ingredientsList = (
				<div className="text-center text-light">
					<h6>Trwa ładowanie składników...</h6>
					<h6>
						<Spinner />
					</h6>
				</div>
			);
		else if (this.props.meal)
			ingredientsList = <Ingredients data={this.props.meal.produkty} />;
		else if (this.props.errorMessage)
			ingredientsList = <ErrorText errorMessage={this.props.errorMessage} />;
		return (
			<div className="flex-grow-1 bg-rich-black">
				<Container>
					<Row className="mb-5">
						<Col className="text-right">
							<Button
								className="mt-2"
								color="ash-gray"
								size="sm"
								onClick={() =>
									this.props.history.push(`/posilki/${this.state.category}`)
								}
							>
								Wróć do listy posiłków
							</Button>
						</Col>
					</Row>
					<Row className="px-5">
						<h3 className="mb-3 pb-2 text-celadon-blue text-center font-courgette w-100">
							{correctEndOfLineWords(mealTitle)}
						</h3>
						<div className="px-2 w-100">{ingredientsList}</div>
					</Row>
					<Row className="text-light px-5 my-5 text-justify">
						<h6 className="px-5 text-center" style={{ lineHeight: "200%" }}>
							{this.props.meal ? this.props.meal.opis : ""}
						</h6>
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
		onGetMeal: (category, title) => dispatch(actions.getMeal(category, title)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Meal));
