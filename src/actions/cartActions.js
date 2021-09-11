import httpReq from "../utils/httpReq";
import { CART_GET_ITEM, CART_GET_ERROR, CART_REMOVE_ITEM } from "./../constants/cartConstants";

export const getCart = () => async (dispatch) => {
  try {
    const { data } = await httpReq.get(`/product/cart`, true);
    dispatch({
      type: CART_GET_ITEM,
      payload: data.cart,
    });
  } catch (err) {
    if (err.response?.status === 401) {
      return dispatch(logout());
    }
    dispatch({
      type: CART_GET_ERROR,
      payload: err.response?.data?.message || err.message,
    });
  }
};

export const removeFromCart = (id, index) => async (dispatch) => {
  try {
    await httpReq.remove(`/product/cart/${id}`, true);
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: index,
    });
  } catch (err) {
    if (err.response?.status === 401) {
      return dispatch(logout());
    }
    alert("Something went wrong. Try again");
  }
};
