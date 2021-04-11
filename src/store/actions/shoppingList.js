import {
  GET_SHOPPING_LIST_START,
  GET_SHOPPING_LIST_SUCCESS,
  GET_SHOPPING_LIST_FAIL,
  DELETE_SHOPPING_LIST_START,
  DELETE_SHOPPING_LIST_SUCCESS,
  DELETE_SHOPPING_LIST_FAIL,
  GENERATE_SHOPPING_LIST_START,
  GENERATE_SHOPPING_LIST_SUCCESS,
  GENERATE_SHOPPING_LIST_FAIL,
  SAVE_SHOPPING_LIST_START,
  SAVE_SHOPPING_LIST_SUCCESS,
  SAVE_SHOPPING_LIST_FAIL,
  ADD_SHOPPING_ITEM_START,
  ADD_SHOPPING_ITEM_SUCCESS,
  ADD_SHOPPING_ITEM_FAIL,
  DELETE_SHOPPING_ITEM_START,
  DELETE_SHOPPING_ITEM_SUCCESS,
  DELETE_SHOPPING_ITEM_FAIL,
} from './actionTypes';
import dietsApi from '../../apis/diets';
import { getIngredBody } from './ingredients';

export const getShoppingList = (type) => {
  return (dispatch, getState) => {
    const userId = getState().auth.userId;
    dispatch(getShoppingListStart());
    dietsApi
      .get(`/usersData/${userId}/lists/${type}.json`)
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
        `/usersData/${stateData.auth.userId}/lists/${type}.json?auth=${stateData.auth.token}`
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

export const generateShoppingList = (multiplier) => {
  return (dispatch, getState) => {
    dispatch(generateShoppingListStart());
    const userId = getState().auth.userId;
    //1 get diet
    dietsApi
      .get(`usersData/${userId}/diet.json`)
      .then(async (response) => {
        //2 for every day -> for every meal -> get meal
        const meals = {};
        //check what if there is no diet !!!!
        Object.keys(response.data).forEach((dietDay) => {
          //here we get one day
          Object.keys(response.data[dietDay]).forEach((category) => {
            const meal = response.data[dietDay][category]; //meal title as string
            if (
              meals.hasOwnProperty(category) &&
              meals[category].hasOwnProperty(meal)
            ) {
              meals[category][meal]++;
            } else meals[category] = { ...meals[category], [meal]: 1 };
            /* 
            meals = {
              category1: {
                meal1: 2,
                meal2: 1
              },
              category2: {
                meal1: 2,
                meal2: 1
              }
            }
            */
          });
        });

        //3 for every day, for every meal -> take ingredients, multiply, add to other ingredients
        console.log(meals);
        //   dispatch(getIngredients(meals));
        const productsPromises = [];
        const amounts = [];
        Object.keys(meals).forEach((category) => {
          Object.keys(meals[category]).forEach(async (meal) => {
            const products = dietsApi.get(
              `/przepisy/${category}/${meal}/produkty.json?`
            );
            productsPromises.push(products);
            amounts.push(meals[category][meal]);
          });
        });

        console.log(Promise.all(productsPromises));
        Promise.all(productsPromises).then((response) => {
          console.log(response);
          const ingredients = {};
          response.forEach((mealProducts, index) => {
            const mealIngs = mealProducts.data;
            Object.keys(mealIngs).forEach((mealIng) => {
              if (mealIng === 'przyprawy') {
                if (ingredients.przyprawy)
                  ingredients.przyprawy = [
                    ...new Set([
                      ...ingredients.przyprawy,
                      ...mealIngs.przyprawy,
                    ]),
                  ];
                else ingredients.przyprawy = [...mealIngs.przyprawy];
              } else if (ingredients[mealIng])
                ingredients[mealIng] =
                  +ingredients[mealIng] + +mealIngs[mealIng] * amounts[index];
              //multplied by amount of this meals
              //sum amounts
              else ingredients[mealIng] = +mealIngs[mealIng] * amounts[index];
            });
          });

          //4 get igredient category
          const shoppingList = {};
          Object.keys(ingredients).forEach((ingredient) => {
            const ingrData = getIngredBody(ingredient);
            //here add some more code ;) TBD!!!!!!!!!
            if (ingrData) {
              shoppingList[ingrData[0].kategoria] = {
                ...shoppingList[ingrData[0].kategoria],
                [ingrData[2]]: ingredients[ingredient] * multiplier,
              };
            } else if (ingredient === 'przyprawy') {
              ingredients.przyprawy.forEach(
                (element) =>
                  (shoppingList.przyprawy = {
                    ...shoppingList.przyprawy,
                    [element]: 1,
                  })
              );
            } //here category = 'inne'
            else
              shoppingList.inne = {
                ...shoppingList.inne,
                [ingredient]: ingredients[ingredient] * multiplier,
              };
          });
          console.log(shoppingList);
          //5 save shopping list on server
          dispatch(saveShoppingList('diet', shoppingList));
        });
      })
      .catch((err) => {
        if (err.response) dispatch(generateShoppingListFail(err.response.data));
        else if (Object.keys(err).length === 0)
          dispatch(generateShoppingListSuccess({}));
        else dispatch(generateShoppingListFail('Coś poszło nie tak'));
      });
  };

  //4 save ingredients list on server
};

const generateShoppingListStart = () => {
  return {
    type: GENERATE_SHOPPING_LIST_START,
  };
};
const generateShoppingListSuccess = (ingredients) => {
  return {
    type: GENERATE_SHOPPING_LIST_SUCCESS,
    ingredients,
  };
};
const generateShoppingListFail = (error) => {
  return {
    type: GENERATE_SHOPPING_LIST_FAIL,
    error,
  };
};

const saveShoppingList = (type, shoppingList) => {
  return (dispatch, getState) => {
    const authData = getState().auth;
    dispatch(saveShoppingListStart());
    dietsApi
      .put(
        `/usersData/${authData.userId}/lists/${type}.json?auth=${authData.token}`,
        shoppingList
      )
      //startAt, limit, orderBy
      .then((response) => {
        const shoppingList = response.data;
        dispatch(saveShoppingListSuccess(shoppingList, type));
      })
      .catch((err) => {
        if (err.response) dispatch(saveShoppingListFail(err.response.data));
        else if (Object.keys(err).length === 0)
          dispatch(saveShoppingListSuccess([]));
        else dispatch(saveShoppingListFail('Coś poszło nie tak'));
      });
  };
};

const saveShoppingListStart = () => {
  return {
    type: GET_SHOPPING_LIST_START,
  };
};
const saveShoppingListSuccess = (shoppingList, category) => {
  return {
    type: GET_SHOPPING_LIST_SUCCESS,
    shoppingList,
    category,
  };
};
const saveShoppingListFail = (error) => {
  return {
    type: GET_SHOPPING_LIST_FAIL,
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
        `/usersData/${stateData.auth.userId}/lists/${type}/${category}.json?auth=${stateData.auth.token}`,
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
        `/usersData/${stateData.auth.userId}/lists/${type}/${category}/${itemName}.json?auth=${stateData.auth.token}`
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
