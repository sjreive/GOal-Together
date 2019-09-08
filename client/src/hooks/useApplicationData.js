import React, { useEffect, useReducer } from "react";
import axios from "axios";
import reactAppURLS from "../actions/urls";

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
        commitments: {...state.commitments, [action.commitment.id]: action.commitment}
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user
      };
    case "GET_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.notifications
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
    user: {},
    error: "",
    activities: [],
    notifications: []
  });

  useEffect(() => {
    let token = "Bearer " + localStorage.getItem("jwt");
    console.log(reactAppURLS.API_URL);
    axios({
      method: "get",
      url: `${reactAppURLS.API_URL}/find_user`,
      headers: { Authorization: token }
    }).then(user => {
      setUser(user.data);
    })
    .catch(err => setUser({}));
  }, [])

  useEffect(() => {
    let token = "Bearer " + localStorage.getItem("jwt");
    if (token && state.user.id) {
      Promise.all([
        axios({
          method: "get",
          url: `${reactAppURLS.API_URL}/commitments`,
          headers: { Authorization: token }
        }),
        axios({
          method: "get",
          url: `${reactAppURLS.API_URL}/votes`,
          headers: { Authorization: token }
        }),
        axios({
          method: "get",
          url: `${reactAppURLS.API_URL}/users`,
          headers: { Authorization: token }
        }),
        axios({
          method: "get",
          url: `${reactAppURLS.API_URL}/activities`,
          headers: { Authorization: token }
        }),
        axios({
          method: "get",
          url: `${reactAppURLS.API_URL}/attendance`,
          headers: { Authorization: token }
        })
      ])
        .then(all => {
          dispatch({
            type: "SET_APPLICATION_DATA",
            commitments: all[0].data,
            votes: all[1].data,
            members: all[2].data,
            activities: all[3].data,
            attendance: all[4].data
          });
        })
        .catch(error => {
          console.log(error);

          // dispatch({
          //   type: "SET_ERROR_MESSAGE",
          //   error: error.response
          // })
        });
    }
  }, [state.user]);

  const submitVote = function(voteData) {
    let token = "Bearer " + localStorage.getItem("jwt");
    return axios({
      method: "post",
      url: `${reactAppURLS.API_URL}/votes/`,
      headers: { Authorization: token },
      data: { voteData }
    });
  };
  const setTitle = title => {
    dispatch({
      type: "SET_TITLE",
      title
    });
  };

  const getNotifications = () => {
    // copy of notifications state
    const notifications = [...state.notifications];

    Object.values(state.activities).filter(activity => {});

    console.log("notifications pre map:", notifications);
    state.activities &&
      Object.keys(state.activities).map(id => {
        console.log(state.activities[id].voted);
        console.log(state.user.id);
        if (state.activities[id].voted[state.user.id] === false) {
          notifications[state.activities[id].id] = state.activities[id];
        }
      });

    notifications.filter(activity => activity !== null);
    dispatch({
      type: "GET_NOTIFICATIONS",
      notifications
    });
  };

  const setNewCommitment = submission => {
    console.log(submission)
    const { commitment, member_emails } = submission;
    return new Promise((resolve, reject) => {
      let token = "Bearer " + localStorage.getItem("jwt")
      return axios({
        method: 'post', 
        url: `${reactAppURLS.API_URL}/commitments`, 
        headers: { 'Authorization': token}, 
        data: { commitment,
                member_emails }
        })
        .then(async response => {
          console.log(response);
          await dispatch({
            type: "SET_NEW_COMMITMENT",
            commitment: response.data
          });
          resolve(response);
        });
    });
  };

  const setUser = user => {
    dispatch({
      type: "SET_USER",
      user
    });
  };

  return {
    state,
    setTitle,
    setNewCommitment,
    setUser,
    submitVote,
    getNotifications
  };
}
