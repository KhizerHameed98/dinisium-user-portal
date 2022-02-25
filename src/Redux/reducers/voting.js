import {
  GET_ONGOING_VOTING_SUCCESS,
  GET_ONGOING_VOTING_ERR,
  GET_UPCOMING_VOTING_SUCCESS,
  GET_UPCOMING_VOTING_ERR,
  GET_CLOSED_VOTING_SUCCESS,
  GET_CLOSED_VOTING_ERR,
  GET_VOTING_DETAIL_SUCCESS,
  GET_VOTING_DETAIL_ERR,
  CREATE_VOTE_SUCCESS,
  CREATE_VOTE_ERR,
  CAST_VOTE_SUCCESS,
  CAST_VOTE_ERR,
  GET_ALL_ITO_SUCCESS,
  GET_ALL_ITO_ERR,
  GET_VOTE_STATUS_SUCCESS,
  GET_VOTE_STATUS_ERR,
} from "../actions/types";

const initialState = {
  onGoingVoting: [],
  upComingVoting: [],
  closedVoting: [],
  itoList: [],
  votingDetail: {},
  createVote: {},
  castVote: {},
  voteStatus: {},
  loading: true,
  error: {},
  errors: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_ITO_SUCCESS:
    case GET_ONGOING_VOTING_SUCCESS:
    case GET_UPCOMING_VOTING_SUCCESS:
    case GET_CLOSED_VOTING_SUCCESS:
    case GET_VOTING_DETAIL_SUCCESS:
    case CREATE_VOTE_SUCCESS:
    case CAST_VOTE_SUCCESS:
    case GET_VOTE_STATUS_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case GET_VOTE_STATUS_ERR:
    case CAST_VOTE_ERR:
    case GET_ALL_ITO_ERR:
    case GET_ONGOING_VOTING_ERR:
    case GET_UPCOMING_VOTING_ERR:
    case GET_CLOSED_VOTING_ERR:
    case GET_VOTING_DETAIL_ERR:
    case CREATE_VOTE_ERR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
};
