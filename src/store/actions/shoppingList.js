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
} from './actionTypes';
import dietsApi from '../../apis/diets';

export const getShoppingList = (userId, type) => {
  return (dispatch) => {
    dispatch(getShoppingListStart());
    dietsApi
      .get(`/usersData/lists/${userId}/${type}.json`)
      //startAt, limit, orderBy
      .then((response) => {
        const shoppingList = response.data;
        dispatch(getShoppingListSuccess(shoppingList, type));
      })
      .catch((err) => {
        if (err.response) dispatch(getShoppingListFail(err.response.data));
        else if (Object.keys(err).length === 0)
          dispatch(getShoppingListSuccess([]));
        else dispatch(getShoppingListFail('Coś poszło nie tak'));
      });
  };
};

export const getShoppingListStart = () => {
  return {
    type: GET_SHOPPING_LIST_START,
  };
};
export const getShoppingListSuccess = (shoppingList, category) => {
  return {
    type: GET_SHOPPING_LIST_SUCCESS,
    shoppingList,
    category,
  };
};
export const getShoppingListFail = (error) => {
  return {
    type: GET_SHOPPING_LIST_FAIL,
    error,
  };
};

export const deleteShoppingList = (userId, type) => {};

export const deleteShoppingListStart = () => {};
export const deleteShoppingListSuccess = () => {};
export const deleteShoppingListFail = (error) => {};

export const addShoppingItem = (userId, type, category, itemData) => {
  return (dispatch, getState) => {
    dispatch(addShoppingItemStart());
    const stateData = getState('auth');
    const nameOfItem = Object.keys(itemData)[0];
    if (
      stateData.shoppingList.shoppingList[type] &&
      stateData.shoppingList.shoppingList[type][category] &&
      stateData.shoppingList.shoppingList[type][category][nameOfItem]
    )
      itemData[nameOfItem] =
        +stateData.shoppingList.shoppingList[type][category][nameOfItem] +
        +itemData[nameOfItem];

    dietsApi
      .patch(
        `/usersData/lists/${userId}/${type}/${category}.json?auth=${stateData.auth.token}`,
        itemData
      )
      .then((response) => {
        dispatch(addShoppingItemSuccess(type, category, response.data));
      })
      .catch((err) => {
        if (err.response) dispatch(addShoppingItemFail(err.response.data));
        else dispatch(addShoppingItemFail('Coś poszło nie tak'));
      });
  };
};

export const addShoppingItemStart = () => {
  return {
    type: ADD_SHOPPING_ITEM_START,
  };
};
export const addShoppingItemSuccess = (listType, category, itemData) => {
  return {
    type: ADD_SHOPPING_ITEM_SUCCESS,
    listType,
    category,
    itemData,
  };
};
export const addShoppingItemFail = (error) => {
  return { type: ADD_SHOPPING_ITEM_FAIL, error };
};

export const deleteShoppingItem = (userId, type, category, itemName) => {};

export const deleteShoppingItemStart = () => {};
export const deleteShoppingItemSuccess = () => {};
export const deleteShoppingItemFail = (error) => {};
