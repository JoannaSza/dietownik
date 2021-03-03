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

import { omit } from '../../shared/utility';

const initialState = {
  isLoading: false,
  errorMessage: null,
  shoppingList: {
    own: {},
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
    [action.category]: action.shoppingList ? action.shoppingList : {},
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
  let newCategoryData = {};
  if (state.shoppingList[action.listType])
    newCategoryData = {
      ...state.shoppingList[action.listType][action.category],
      ...action.itemData,
    };
  else
    newCategoryData = {
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

const addShoppingItemFail = (state, action) => ({
  ...state,
  errorMessage: action.error,
});

const deleteShoppingListSuccess = (state, action) => ({
  ...state,
  isLoading: false,
  shoppingList: {
    ...state.shoppingList,
    [action.listType]: {},
  },
});

const deleteShoppingListStart = (state, action) => ({
  ...state,
  isLoading: true,
});

const deleteShoppingListFail = (state, action) => ({
  ...state,
  isLoading: false,
  errorMessage: action.error,
});

const deleteShoppingItemSuccess = (state, action) => {
  const newCategory = omit(
    state.shoppingList[action.listType][action.category],
    action.itemName
  );
  let newListType;
  if (Object.keys(newCategory).length > 0)
    newListType = {
      ...state.shoppingList[action.listType],
      [action.category]: newCategory,
    };
  else newListType = omit(state.shoppingList[action.listType], action.category);
  return {
    ...state,
    isLoading: false,
    shoppingList: {
      ...state.shoppingList,
      [action.listType]: newListType,
    },
  };
};

const deleteShoppingItemStart = (state, action) => ({
  ...state,
  isLoading: true,
});

const deleteShoppingItemFail = (state, action) => ({
  ...state,
  isLoading: false,
  errorMessage: action.error,
});

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
    case ADD_SHOPPING_ITEM_START:
      return addShoppingItemStart(state, action);
    case ADD_SHOPPING_ITEM_FAIL:
      return addShoppingItemFail(state, action);
    case DELETE_SHOPPING_LIST_SUCCESS:
      return deleteShoppingListSuccess(state, action);
    case DELETE_SHOPPING_LIST_START:
      return deleteShoppingListStart(state, action);
    case DELETE_SHOPPING_LIST_FAIL:
      return deleteShoppingListFail(state, action);
    case DELETE_SHOPPING_ITEM_SUCCESS:
      return deleteShoppingItemSuccess(state, action);
    case DELETE_SHOPPING_ITEM_START:
      return deleteShoppingItemStart(state, action);
    case DELETE_SHOPPING_ITEM_FAIL:
      return deleteShoppingItemFail(state, action);
    default:
      return state;
  }
};

export default reducer;
