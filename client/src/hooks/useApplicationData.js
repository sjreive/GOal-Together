import React, { useEffect, useReducer } from "react";
import axios from "axios";
import reactAppURLS from '../actions/urls';

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_APPLICATION_DATA":
      return {
        ...state,
        commitments: action.commitments,
        votes: action.votes,
        members: action.members,
        activities: action.activities,
        attendance: action.attendance
      };
    case "SET_TITLE":
      return {
        ...state,
        title: action.title
      };
    case "SET_NEW_COMMITMENT":
      return {
        ...state,
        commitments: [...state.commitments, action.commitment]
      };
    case "SET_AUTH_STATE":
      return {
        ...state,
        loggedIn: action.loggedIn
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    commitments: [],
    votes: [],
    members: [],
    title: "",
    user: 1,
    loggedIn: false,
    error: "",
    activity: {
      id: 2,
      title: "Spin class",
      date: "2019-08-31T18:32:42.117Z",
      created_at: "2019-09-02T18:32:42.118Z",
      updated_at: "2019-09-02T18:32:42.118Z",
      commitment_id: 1
    }
  });

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      let token = "Bearer " + localStorage.getItem("jwt")
      Promise.all([
        axios({method: 'get', url: `${reactAppURLS.API_URL}/commitments`, headers: { 'Authorization': token}}),
        axios({method: 'get', url: `${reactAppURLS.API_URL}/votes`, headers: { 'Authorization': token}}),
        axios({method: 'get', url: `${reactAppURLS.API_URL}/users`, headers: { 'Authorization': token}}),
        axios({method: 'get', url: `${reactAppURLS.API_URL}/activities`, headers: { 'Authorization': token}}),
        axios({method: 'get', url: `${reactAppURLS.API_URL}/attendance`, headers: { 'Authorization': token}})
      ]).then(all => {
        dispatch({
          type: "SET_APPLICATION_DATA",
          commitments: all[0].data,
          votes: all[1].data,
          members: all[2].data,
          activities: all[3].data,
          attendance: all[4].data,
          loggedIn: true
        });
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          dispatch({
            type: "SET_AUTH_STATE",
            loggedIn: false
          })
        } else {
          dispatch({
            type: "SET_ERROR_MESSAGE",
            error: error.response
          })
        }
      })
    } else {
      dispatch({
        type: "SET_AUTH_STATE",
        loggedIn: false
      })
    }
  }, []);

  const submitVote = function(voteData) {
    return axios
      .post(`${reactAppURLS.API_URL}/votes/`, voteData)
      .then(data => console.log(`This was sent to the server ${data}`));
  };
  const setTitle = title => {
    dispatch({
      type: "SET_TITLE",
      title
    });
  }

  const setNewCommitment = commitment => {
    return new Promise((resolve, reject) => {
      return axios
        .post(`${reactAppURLS.API_URL}/commitments`, commitment)
        .then(async response => {
          await dispatch({
            type: "SET_NEW_COMMITMENT",
            commitment
          });
          resolve(response);
        });
    });
  };

  const setAuthState = loggedIn => {
    dispatch({
      type: "SET_AUTH_STATE",
      loggedIn
    });
  };

  return {
    state,
    setTitle,
    setNewCommitment,
    setAuthState,
    submitVote
  };
}
