import {
	GET_MEALS_START,
	GET_MEALS_SUCCESS,
	GET_MEALS_FAIL,
	GET_MEAL_START,
	GET_MEAL_SUCCESS,
	GET_MEAL_FAIL,
	ADD_MEAL_START,
	ADD_MEAL_SUCCESS,
	ADD_MEAL_FAIL,
} from "./actionTypes";
import dietsApi from "../../apis/diets";

export const getMealsStart = () => {
	return {
		type: GET_MEALS_START,
	};
};

export const getMealsFail = (error) => {
	return { type: GET_MEALS_FAIL, error };
};

export const getMealsSuccess = (mealsData) => {
	return { type: GET_MEALS_SUCCESS, mealsData };
};

export const getMeals = (category, query) => {
	return (dispatch) => {
		dispatch(getMealsStart());
		let apiQuery;

		if (query)
			apiQuery = `/przepisy/${category}.json?orderBy="$key"&startAt="${query}"`;
		else apiQuery = `/przepisy/${category}.json?shallow=true`;

		dietsApi //here add config to choose records from data for pagination
			.get(apiQuery)
			//startAt, limit, orderBy
			.then((response) => {
				const titles = Object.keys(response.data);
				dispatch(getMealsSuccess(titles));
			})
			.catch((err) => {
				if (err.response) dispatch(getMealsFail(err.response.data));
				else dispatch(getMealsFail("Coś poszło nie tak"));
			});
	};
};

export const getMealStart = () => {
	return {
		type: GET_MEAL_START,
	};
};

export const getMealFail = (error) => {
	return { type: GET_MEAL_FAIL, error };
};

export const getMealSuccess = (mealData) => {
	return { type: GET_MEAL_SUCCESS, mealData };
};

export const getMeal = (category, title) => {
	return (dispatch) => {
		dispatch(getMealStart());

		dietsApi //here add config to choose records from data for pagination
			.get(`/przepisy/${category}/${title}.json?`)
			//startAt, limit, orderBy
			.then((response) => {
				dispatch(getMealSuccess(response.data));
			})
			.catch((err) => {
				if (err.response) dispatch(getMealFail(err.response.data));
				else dispatch(getMealFail("Coś poszło nie tak"));
			});
	};
};

export const addMealStart = () => {
	return {
		type: ADD_MEAL_START,
	};
};

export const addMealFail = (error) => {
	return { type: ADD_MEAL_FAIL, error };
};

export const addMealSuccess = (mealData) => {
	return { type: ADD_MEAL_SUCCESS, mealData };
};

export const addMeal = (category, data, title) => {
	return (dispatch, getState) => {
		dispatch(addMealStart());
		const authData = getState("auth");
		console.log(authData);
		dietsApi
			.put(
				`/przepisy/${category}/${title}.json?auth=${authData.auth.token}`,
				data
			)
			//startAt, limit, orderBy
			.then((response) => {
				console.log(response);
				dispatch(addMealSuccess(response.data));
			})
			.catch((err) => {
				if (err.response) dispatch(addMealFail(err.response.data));
				else dispatch(addMealFail("Coś poszło nie tak"));
			});
	};
};
