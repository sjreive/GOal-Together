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

    case "SUBMIT_VOTE":
      return {
        ...state,
        votes: [...state.votes, action.vote]
      };

    case "SET_USER":
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
    case "UPDATE_COMMITMENT":
      return {
        ...state,
        commitments: {
          ...state.commitments,
          [action.id]: action.commitment
        }
      };
    case "GET_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.notifications
      };

    case "GET_COMMITMENTS":
      return {
        ...state,
        commitments: action.commitments
      };

    case "GET_ACTIVITIES":
      return {
        ...state,
        activities: action.activities
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
    case "ACCEPT_INVITATION":
      return {
        ...state,
        commitments: {
          ...state.commitments,
          [action.commitment.id]: {
            ...state.commitments[action.commitment.id],
            joined: true
          }
        }
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
    axios({
      method: "get",
      url: `/find_user`,
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
          url: `/commitments`,
          headers: { Authorization: token }
        }),
        axios({
          method: "get",
          url: `/votes`,
          headers: { Authorization: token }
        }),
        axios({
          method: "get",
          url: `/users`,
          headers: { Authorization: token }
        }),
        axios({
          method: "get",
          url: `/activities`,
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
          dispatch({ type: "SET_LOADING_STATUS", loading: false });
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

  const submitVote = voteData => {
    return new Promise((resolve, reject) => {
      let token = "Bearer " + localStorage.getItem("jwt");
      return axios({
        method: "post",
        url: `/votes/`,
        headers: { Authorization: token },
        data: { voteData }
      }).then(async response => {
        await dispatch({
          type: "SUBMIT_VOTE",
          vote: response.data
        });
        resolve(response);
      });
    });
  };

  const getActivities = () => {
    return new Promise((resolve, reject) => {
      let token = "Bearer " + localStorage.getItem("jwt");
      axios({
        method: "get",
        url: `/activities`,
        headers: { Authorization: token }
      }).then(async response => {
        await dispatch({
          type: "GET_ACTIVITIES",
          activities: response.data
        });
        resolve(response);
      });
    });
  };

  const getCommitments = () => {
    return new Promise((resolve, reject) => {
      let token = "Bearer " + localStorage.getItem("jwt");
      axios({
        method: "get",
        url: `/commitments`,
        headers: { Authorization: token }
      }).then(async response => {
        await dispatch({
          type: "GET_COMMITMENTS",
          commitments: response.data
        });
        resolve(response);
      });
    });
  };

  const submitActivity = activity => {
    return new Promise((resolve, reject) => {
      let token = "Bearer " + localStorage.getItem("jwt");
      return axios({
        method: "post",
        url: `/activities/`,
        headers: { Authorization: token },
        data: { activity }
      }).then(async response => {
        // rest of app expects there to be .voted and .attendance
        let activity = response.data;
        activity.voted = {};
        activity.attendance = {};
        await dispatch({
          type: "SET_NEW_ACTIVITY",
          activity: activity
        });
        getActivities();
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
  // put 'commitments/:id/members/:id', to: 'commitments#accept_invitation'
  // delete 'commitments/:id/members/:id', to: 'commitments#decline_invitation'

  const acceptCommitmentInvitation = commitment => {
    return new Promise((resolve, reject) => {
      let token = "Bearer " + localStorage.getItem("jwt");
      return axios({
        method: "put",
        url: `/commitments/${commitment.id}/members/${state.user.id}`,
        headers: { Authorization: token },
        data: { commitment }
      })
        .then(async response => {
          dispatch({
            type: "ACCEPT_INVITATION",
            commitment
          });
          getActivities();
          resolve(response);
        })
        .catch(e => reject(e));
    });
  };

  const declineCommitmentInvitation = commitment => {
    const id = commitment.id;
    return new Promise((resolve, reject) => {
      let token = "Bearer " + localStorage.getItem("jwt");
      return axios({
        method: "delete",
        url: `/commitments/${commitment.id}/members/${state.user.id}`,
        headers: { Authorization: token },
        data: { commitment }
      })
        .then(async response => {
          dispatch({
            type: "UPDATE_COMMITMENT",
            id,
            commitment: null
          });
          resolve(response);
        })
        .catch(e => reject(e));
    });
  };

  const getNotifications = () => {
    // copy of notifications state
    let notifications = [];

    state.activities &&
      Object.keys(state.activities).forEach(id => {
        if (
          state.activities[id].voted &&
          !state.activities[id].voted[state.user.id]
        ) {
          notifications.push(state.activities[id]);
        }
      });

    notifications = notifications.filter(activity => activity !== null);
    notifications = notifications.filter(activity => {
      const commitment = state.commitments[activity.commitment_id];
      return commitment && commitment.joined;
    });

    dispatch({
      type: "GET_NOTIFICATIONS",
      notifications
    });
  };

  const getInvitations = () => {
    const invitations = [];

    for (const id in state.commitments) {
      if (state.commitments[id] && !state.commitments[id].joined) {
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
        url: `/commitments`,
        headers: { Authorization: token },
        data: { commitment, member_emails }
      }).then(async response => {
        await dispatch({
          type: "SET_NEW_COMMITMENT",
          commitment: response.data
        });
        getCommitments();
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
    getActivities,
    getInvitations,
    acceptCommitmentInvitation,
    declineCommitmentInvitation
  };
}
