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
        activities: action.activities
      };
    case "SET_TITLE":
      return {
        ...state,
        title: action.title
      };
    case "SET_NEW_COMMITMENT":
      return {
        ...state,
        commitments: {
          ...state.commitments,
          [action.commitment.id]: action.commitment
        }
      };

    case "SET_NEW_ACTIVITY":
      return {
        ...state,
        activities: {
          ...state.activities,
          [action.activity.id]: action.activity
        }
      };
    case "SET_USER":
      console.log("ACTION",action);
      return {
        ...state,
        members: {
          ...state.members,
          [action.user.id]: {
            ...state.members[action.user.id],
            avatar_url: action.user.avatar_url
          }
        },
        user: action.user
      };
    case "GET_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.notifications
      };
    case "SET_INVITATIONS":
      return {
        ...state,
        invitations: action.invitations
      };
    case "SET_LOADING_STATUS":
      return {
        ...state,
        loading: action.loading
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    commitments: {},
    votes: [],
    members: {},
    title: "",
    user: {},
    error: "",
    activities: [],
    notifications: [],
    loading: true,
    invitations: []
  });

  useEffect(() => {
    let token = "Bearer " + localStorage.getItem("jwt");
    console.log(reactAppURLS.API_URL);
    axios({
      method: "get",
      url: `${reactAppURLS.API_URL}/find_user`,
      headers: { Authorization: token }
    })
      .then(user => {
        setUser(user.data);
      })
      .catch(err => setUser({}));
  }, []);

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
        })
      ])
        .then(all => {
          dispatch({
            type: "SET_APPLICATION_DATA",
            commitments: all[0].data,
            votes: all[1].data,
            members: all[2].data,
            activities: all[3].data
          });
        })
        .then(response => {
          dispatch({ type: "SET_LOADING_STATUS", loading: false })
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

  const submitActivity = activity => {
    console.log("submitting:", activity);
    return new Promise((resolve, reject) => {
      let token = "Bearer " + localStorage.getItem("jwt");
      return axios({
        method: "post",
        url: `${reactAppURLS.API_URL}/activities/`,
        headers: { Authorization: token },
        data: { activity }
      }).then(async response => {
        console.log(response);
        await dispatch({
          type: "SET_NEW_ACTIVITY",
          activity: response.data
        });
        resolve(response);
      });
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

    Object.values(state.activities).filter(activity => activity === {});

    state.activities &&
      Object.keys(state.activities).map(id => {
        if (
          state.activities[id].voted &&
          state.activities[id].voted[state.user.id] === false
        ) {
          notifications[state.activities[id].id] = state.activities[id];
        }
      });

    notifications.filter(activity => activity !== null);
    dispatch({
      type: "GET_NOTIFICATIONS",
      notifications
    });
  };

  const getInvitations = () => {
    const invitations = [];

    for (const id in state.commitments) {
      if (!state.commitments[id].joined) {
        invitations.push(state.commitments[id]);
      } 
    }
    dispatch({ type: "SET_INVITATIONS", invitations });
  };

  const setNewCommitment = submission => {
    const { commitment, member_emails } = submission;
    return new Promise((resolve, reject) => {
      let token = "Bearer " + localStorage.getItem("jwt");
      return axios({
        method: "post",
        url: `${reactAppURLS.API_URL}/commitments`,
        headers: { Authorization: token },
        data: { commitment, member_emails }
      }).then(async response => {

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
    getNotifications,
    submitActivity,
    getInvitations
  };
}
