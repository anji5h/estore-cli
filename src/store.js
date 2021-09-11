import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productReviewReducer,
  productTopRatedReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

import { toastReducer } from "./reducers/toastReducer";

const Reducer = combineReducers({
  toast: toastReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productTopRated: productTopRatedReducer,
  productReviewList: productReviewReducer,
  cart: cartReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
});
const store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
