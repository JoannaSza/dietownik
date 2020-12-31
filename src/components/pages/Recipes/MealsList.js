/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import mealStyle from "./Meal.module.css";

import Meal from "./Meal";
import ErrorText from "../../UI/ErrorText";

const MealsList = (props) => {
	const viewClickHandler = (meal) => {
		const oldPath = props.history.location.pathname;
		props.history.push(`${oldPath}/${meal}`);
	};
	const editClickHandler = (meal) => {
		const oldPath = props.history.location.pathname;
		props.history.push(`${oldPath}/${meal}/edit`);
	};

	const renderMeals = () => {
		if (props.isLoading)
			return (
				<div className="m-auto pt-5 text-center">
					<Spinner
						style={{ width: "5rem", height: "5rem" }}
						color="celadon-blue"
						size="xl"
					/>
				</div>
			);
		else if (props.meals.length >= 1) {
			return props.meals.map((meal, index) => (
				<Meal
					key={"meal" + index}
					meal={meal}
					onViewClick={() => viewClickHandler(meal)}
					onEditClick={() => editClickHandler(meal)}
				/>
			));
		} else if (props.errorMessage)
			return <ErrorText errorMessage={props.errorMessage} />;
	};
	return <div>{renderMeals()}</div>;
};

const mapStateToProps = (state) => ({
	...state.meals,
});

export default connect(mapStateToProps)(MealsList);
