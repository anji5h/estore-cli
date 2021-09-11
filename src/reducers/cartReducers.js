import {
  CART_REMOVE_ITEM,
  CART_GET_ITEM,
  CART_GET_ERROR,
  CART_GET_REQUEST,
  CART_CLEAR_ITEMS,
} from "../constants/cartConstants";
const initialState = {
  isLoading: true,
  isError: false,
  data: [],
};
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_GET_ITEM: {
      return { isLoading: false, isError: false, data: action.payload };
    }
    case CART_GET_ERROR: {
      return { isLoading: false, isError: true, data: [] };
    }

    case CART_REMOVE_ITEM:
      state.data.splice(action.payload, 1);
      return { ...state };
    case CART_CLEAR_ITEMS:
      return {
        isLoading: false,
        isError: false,
        data: [],
      };
    case CART_GET_REQUEST:
    default:
      return initialState;
  }
};
