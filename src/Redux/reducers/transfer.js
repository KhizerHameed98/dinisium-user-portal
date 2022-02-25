import { GET_USERS_LIST_SUCCESS, GET_USERS_LIST_ERR } from "../actions/types";

const initialState = {
  usersList: [],
  loading: true,
  error: {},
  errors: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS_LIST_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case GET_USERS_LIST_ERR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
};
