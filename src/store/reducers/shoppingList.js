import {
  GET_SHOPPING_LIST_START,
  GET_SHOPPING_LIST_SUCCESS,
  GET_SHOPPING_LIST_FAIL,
  DELETE_SHOPPING_LIST_START,
  DELETE_SHOPPING_LIST_SUCCESS,
  DELETE_SHOPPING_LIST_FAIL,
  ADD_SHOPPING_ITEM_START,
  ADD_SHOPPING_ITEM_SUCCESS,
  ADD_SHOPPING_ITEM_FAIL,
  DELETE_SHOPPING_ITEM_START,
  DELETE_SHOPPING_ITEM_SUCCESS,
  DELETE_SHOPPING_ITEM_FAIL,
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  errorMessage: null,
  shoppingList: {
    own: null,
  },
};

const getShoppingListStart = (state, action) => ({
  ...state,
  isLoading: true,
  errorMessage: null,
});

const getShoppingListSuccess = (state, action) => ({
  ...state,
  isLoading: false,
  shoppingList: {
    ...state.shoppingList,
    [action.category]: action.shoppingList,
  },
});

const getShoppingListFail = (state, action) => ({
  ...state,
  isLoading: false,
  errorMessage: action.error,
});

const addShoppingItemStart = (state, action) => ({
  ...state,
});

const addShoppingItemSuccess = (state, action) => {
  const newCategoryData = {
    ...state.shoppingList[action.listType][action.category],
    ...action.itemData,
  };

  const newListData = {
    ...state.shoppingList[action.listType],
    [action.category]: newCategoryData,
  };
  console.log(newListData);
  return {
    ...state,
    shoppingList: { ...state.shoppingList, [action.listType]: newListData },
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHOPPING_LIST_START:
      return getShoppingListStart(state, action);
    case GET_SHOPPING_LIST_SUCCESS:
      return getShoppingListSuccess(state, action);
    case GET_SHOPPING_LIST_FAIL:
      return getShoppingListFail(state, action);
    case ADD_SHOPPING_ITEM_SUCCESS:
      return addShoppingItemSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
