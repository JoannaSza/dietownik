import {
	GET_MEALS_START,
	GET_MEALS_SUCCESS,
	GET_MEALS_FAIL,
	GET_MEAL_START,
	GET_MEAL_SUCCESS,
	GET_MEAL_FAIL,
	ADD_MEAL_START,
	ADD_MEAL_FAIL,
	ADD_MEAL_SUCCESS,
	DELETE_MEAL_START,
	DELETE_MEAL_FAIL,
	DELETE_MEAL_SUCCESS,
	CLEAR_ERROR,
} from "../actions/actionTypes";

const initialState = {
	isLoading: false,
	meals: [],
	errorMessage: null,
	meal: null,
	isDone: false,
};

const getMealsStart = (state, action) => ({
	...state,
	isLoading: true,
	meals: [],
	errorMessage: "",
});

const getMealsSuccess = (state, action) => ({
	...state,
	isLoading: false,
	meals: action.mealsData,
});

const getMealsFail = (state, action) => ({
	...state,
	isLoading: false,
	errorMessage: action.error,
});
const getMealStart = (state, action) => ({
	...state,
	isLoading: true,
	meal: null,
	errorMessage: null,
});

const getMealSuccess = (state, action) => ({
	...state,
	isLoading: false,
	meal: action.mealData,
});

const getMealFail = (state, action) => ({
	...state,
	isLoading: false,
	errorMessage: action.error,
});

const addMealStart = (state, action) => ({
	...state,
	isDone: false,
	isLoading: true,
	errorMessage: null,
});

const addMealFail = (state, action) => ({
	...state,
	isDone: false,
	isLoading: false,
	errorMessage: action.error,
});

const addMealSuccess = (state, action) => ({
	...state,
	isLoading: false,
	isDone: true,
});

const deleteMealStart = (state, action) => ({
	...state,
	isDone: false,
	isLoading: true,
	errorMessage: null,
});

const deleteMealFail = (state, action) => ({
	...state,
	isDone: false,
	isLoading: false,
	errorMessage: action.error,
});

const deleteMealSuccess = (state, action) => ({
	...state,
	isLoading: false,
	isDone: true,
});

const clearError = (state, action) => ({
	...state,
	errorMessage: null,
});

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_MEALS_START:
			return getMealsStart(state, action);
		case GET_MEALS_SUCCESS:
			return getMealsSuccess(state, action);
		case GET_MEALS_FAIL:
			return getMealsFail(state, action);
		case GET_MEAL_START:
			return getMealStart(state, action);
		case GET_MEAL_SUCCESS:
			return getMealSuccess(state, action);
		case GET_MEAL_FAIL:
			return getMealFail(state, action);
		case ADD_MEAL_START:
			return addMealStart(state, action);
		case ADD_MEAL_FAIL:
			return addMealFail(state, action);
		case ADD_MEAL_SUCCESS:
			return addMealSuccess(state, action);
		case DELETE_MEAL_START:
			return deleteMealStart(state, action);
		case DELETE_MEAL_FAIL:
			return deleteMealFail(state, action);
		case DELETE_MEAL_SUCCESS:
			return deleteMealSuccess(state, action);
		case CLEAR_ERROR:
			return clearError(state, action);
		default:
			return state;
	}
};

export default reducer;
