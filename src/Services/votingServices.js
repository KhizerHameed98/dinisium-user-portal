import axios from "axios";

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
} from "../Redux/actions/types";
import { toast } from "react-toastify";
import { voting, ito } from "../Routes/serverRoutes";

//alert tost

const alertToast = (error, message) => {
  if (!error) {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

//Get ongoing voting list
export const getOngoingVoting = ({ ito_id }) => (dispatch) => {
  let Url = "";
  if (ito_id !== "") {
    Url = `/by_status?status=ongoing&ito_id=${ito_id}`;
  } else {
    Url = `/by_status?status=ongoing`;
  }
  axios
    .get(voting.GET_VOTING + Url)
    .then((res) => {
      dispatch({
        type: GET_ONGOING_VOTING_SUCCESS,
        payload: { onGoingVoting: res.data.data },
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_ONGOING_VOTING_ERR,
      });
    });
};

//Get closed voting list
export const getClosedVoting = ({ ito_id }) => (dispatch) => {
  let Url = "";
  if (ito_id !== "") {
    Url = `/by_status?status=closed&ito_id=${ito_id}`;
  } else {
    Url = `/by_status?status=closed`;
  }

  axios
    .get(voting.GET_VOTING + Url)
    .then((res) => {
      dispatch({
        type: GET_CLOSED_VOTING_SUCCESS,
        payload: { closedVoting: res.data.data },
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_CLOSED_VOTING_ERR,
      });
    });
};


//Get closed voting list
export const getOnlyClosedVoting = () => (dispatch) => {
  let Url = "/by_status?status=closed";
  axios
    .get(voting.GET_VOTING + Url)
    .then((res) => {
      dispatch({
        type: GET_CLOSED_VOTING_SUCCESS,
        payload: { closedVoting: res.data.data },
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_CLOSED_VOTING_ERR,
      });
    });
};

//Get upcoming voting list
export const getUpcomingVoting = ({ ito_id }) => (dispatch) => {
  let Url = "";
  if (ito_id !== "") {
    Url = `/by_status?status=upcoming&ito_id=${ito_id}`;
  } else {
    Url = `/by_status?status=upcoming`;
  }

  axios
    .get(voting.GET_VOTING + Url)
    .then((res) => {
      dispatch({
        type: GET_UPCOMING_VOTING_SUCCESS,
        payload: { upComingVoting: res.data.data },
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_UPCOMING_VOTING_ERR,
      });
    });
};


//Get getAdmin ITO
export const getAllITO = () => (dispatch) => {
  axios
    .get(ito.GET_AVAILABLE_ITO)
    .then((res) => {
      dispatch({
        type: GET_ALL_ITO_SUCCESS,
        payload: { itoList: res.data.data },
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_ALL_ITO_ERR,
      });
    });
};

//Get vote detail by id
export const getVoteDetailById = (id, setStartTime, setEndTime) => (dispatch) => {
  axios
    .get(voting.GET_VOTING + `/${id}`)
    .then((res) => {
      setStartTime(new Date(res.data.data.start_date).getTime());
      setEndTime(new Date(res.data.data.end_date).getTime());
      dispatch({
        type: GET_VOTING_DETAIL_SUCCESS,
        payload: { votingDetail: res.data.data },
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_VOTING_DETAIL_ERR,
      });
    });
};

// creat vote
export const creatVote = ({ formData, setFormData }) => (dispatch) => {
  axios
    .post(voting.GET_VOTING, formData)
    .then((res) => {
      dispatch({
        type: CREATE_VOTE_SUCCESS,
        payload: { createVote: res.data.data },
      });
      let successMessage = "Vote Created successfully";
      alertToast(false, successMessage);
      setFormData({
        name: "",
        start_date: "",
        end_date: "",
        description: "",
      });
    })
    .catch((error) => {
      dispatch({
        type: CREATE_VOTE_ERR,
      });
      let errorMessage =
        (error &&
          error.response &&
          error.response.data &&
          error.response.data.msg) ||
        error.message;
      alertToast(true, errorMessage);
    });
};

// cast vote
export const castVote = ({ election_id, agree, setShowBtn }) => (dispatch) => {
  const obj = {
    election_id: election_id,
    agree: agree,
  };
  axios
    .post(voting.CAST_VOTE, obj)
    .then((res) => {
      dispatch({
        type: CAST_VOTE_SUCCESS,
        payload: { castVote: res.data.data },
      });
      let successMessage = "You successfully cast vote";
      alertToast(false, successMessage);
      setShowBtn(false);
      // let successMessage = (res && res.data.msg) || res.message;
      // alertToast(false, successMessage);
    })
    .catch((error) => {
      dispatch({
        type: CAST_VOTE_ERR,
      });
      let errorMessage =
        (error &&
          error.response &&
          error.response.data &&
          error.response.data.msg) ||
        error.message;
      alertToast(true, errorMessage);
    });
};



// get vote status
export const getVoteStatus = ({ id }) => (dispatch) => {
  axios
    .get(voting.GET_VOTE_STATUS + `${id}/results`)
    .then((res) => {
      dispatch({
        type: GET_VOTE_STATUS_SUCCESS,
        payload: { voteStatus: res.data.data },
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_VOTE_STATUS_ERR,
      });
    });
};
