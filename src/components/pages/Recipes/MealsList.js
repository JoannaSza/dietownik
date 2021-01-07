/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import mealStyle from "./Meal.module.css";
import * as actions from "../../../store/actions";

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
	const deleteClickHandler = (meal) => {
		props.deleteMeal(meal);
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
			const startIndex =
				props.pagination.activePage * props.pagination.recordsAmount;
			const endIndex =
				(props.pagination.activePage + 1) * props.pagination.recordsAmount;
			return props.meals
				.slice(startIndex, endIndex)
				.map((meal, index) => (
					<Meal
						key={"meal" + index}
						meal={meal}
						onViewClick={() => viewClickHandler(meal)}
						onEditClick={() => editClickHandler(meal)}
						onDeleteClick={() => deleteClickHandler(meal)}
					/>
				));
		} else if (props.errorMessage)
			return <ErrorText errorMessage={props.errorMessage} />;
		else if (props.meals.length === 0)
			return (
				<h6 className="text-light text-center">
					Brak posiłków. Dodaj, aby wyświetlić.
				</h6>
			);
	};
	return <div>{renderMeals()}</div>;
};

const mapStateToProps = (state) => ({
	...state.meals,
});

export default connect(mapStateToProps)(withRouter(MealsList));
