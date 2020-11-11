import { WINDOW_RESIZE } from '../actions/actionTypes';

const initialState = {
  width: 0,
  isSmall: false,
};

const windowResize = (state, action) => ({
  ...state,
  width: action.width,
  isSmall: action.width <= 500 ? true : false,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case WINDOW_RESIZE:
      return windowResize(state, action);
    default:
      return state;
  }
};

export default reducer;
