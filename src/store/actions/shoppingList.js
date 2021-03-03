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

export const getShoppingList = (type) => {
  return (dispatch, getState) => {
    const userId = getState('auth').auth.userId;
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

export const deleteShoppingList = (type) => {
  return (dispatch, getState) => {
    dispatch(deleteShoppingListStart());
    const stateData = getState('auth');
    dietsApi
      .delete(
        `/usersData/lists/${stateData.auth.userId}/${type}.json?auth=${stateData.auth.token}`
      )
      .then((response) => {
        dispatch(deleteShoppingListSuccess(type, response.data));
      })
      .catch((err) => {
        if (err.response) dispatch(deleteShoppingListFail(err.response.data));
        else if (Object.keys(err).length === 0)
          dispatch(deleteShoppingListSuccess([]));
        else dispatch(deleteShoppingListFail('Coś poszło nie tak'));
      });
  };
};

export const deleteShoppingListStart = () => {
  return {
    type: DELETE_SHOPPING_LIST_START,
  };
};
export const deleteShoppingListSuccess = (listType, itemData) => {
  return {
    type: DELETE_SHOPPING_LIST_SUCCESS,
    listType,
    itemData,
  };
};
export const deleteShoppingListFail = (error) => {
  return {
    type: DELETE_SHOPPING_LIST_FAIL,
    error,
  };
};

export const addShoppingItem = (type, category, itemData) => {
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
        `/usersData/lists/${stateData.auth.userId}/${type}/${category}.json?auth=${stateData.auth.token}`,
        itemData
      )
      .then((response) => {
        dispatch(addShoppingItemSuccess(type, category, response.data));
      })
      .catch((err) => {
        console.log(err);
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

export const deleteShoppingItem = (type, category, itemName) => {
  return (dispatch, getState) => {
    dispatch(deleteShoppingItemStart());
    const stateData = getState('auth');
    dietsApi
      .delete(
        `/usersData/lists/${stateData.auth.userId}/${type}/${category}/${itemName}.json?auth=${stateData.auth.token}`
      )
      .then((response) => {
        dispatch(deleteShoppingItemSuccess(type, category, itemName));
      })
      .catch((err) => {
        if (err.response) dispatch(deleteShoppingItemFail(err.response.data));
        else if (Object.keys(err).length === 0)
          dispatch(deleteShoppingItemSuccess([]));
        else dispatch(deleteShoppingItemFail('Coś poszło nie tak'));
      });
  };
};

export const deleteShoppingItemStart = () => {
  return {
    type: DELETE_SHOPPING_ITEM_START,
  };
};
export const deleteShoppingItemSuccess = (listType, category, itemName) => {
  return {
    type: DELETE_SHOPPING_ITEM_SUCCESS,
    listType,
    category,
    itemName,
  };
};
export const deleteShoppingItemFail = (error) => {
  return {
    type: DELETE_SHOPPING_ITEM_FAIL,
    error,
  };
};
