import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCT_DELETE_SUCCESS: {
      state.products.splice(action.payload, 1);
      return { loading: false, error: false, products: [...state.products] };
    }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload, products: [] };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload, product: {} };
    default:
      return state;
  }
};

export const productReviewReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEW_SUCCESS:
      return { loading: false, reviews: action.payload };
    case PRODUCT_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, error: false, products: action.payload };
    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload, products: [] };
    default:
      return state;
  }
};
