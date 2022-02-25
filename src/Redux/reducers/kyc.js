import {
  ADD_KYC_SUCCESS,
  ADD_KYC_ERR,
  GET_KYC_SUCCESS,
  GET_KYC_ERR,
} from "../actions/types";

const initialState = {
  loading: true,
  isAuthenticated: null,
  user: null,
  error: {},
  errors: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_KYC_SUCCESS:
    case GET_KYC_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case ADD_KYC_ERR:
    case GET_KYC_ERR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
};
