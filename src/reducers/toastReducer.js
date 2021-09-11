import { HIDE_TOAST, SHOW_TOAST } from "../constants/toastConstant";

const initialState = {
  show: false,
  message: "",
};
export const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case HIDE_TOAST:
      return initialState;
    case SHOW_TOAST:
      return { show: true, message: action.payload };
    default:
      return state;
  }
};
