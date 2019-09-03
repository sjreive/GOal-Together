import React, { useEffect, useReducer } from "react";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_APPLICATION_DATA":
      return {
        ...state,
        commitments: action.commitments,
        votes: action.votes,
        members: action.members
      };
    case "SUBMIT_VOTE":
      return {
        ...state,
        votes: action.votes
      };
    case "SET_TITLE":
      return {
        ...state,
        title: action.title
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
    activity: "Get Swoll"
  });

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:3001/api/commitments`),
      axios.get(`http://localhost:3001/api/votes`),
      axios.get(`http://localhost:3001/api/users`)
    ]).then(all => {
      dispatch({
        type: "SET_APPLICATION_DATA",
        commitments: all[0].data,
        votes: all[1].data,
        members: all[2].data
      });
    });
  }, []);

  function submitVote(attended, voterId, activityId, attendeeId) {
    // make a copy of the state of votes
    const votes = [...state.votes];

    // create vote object
    const vote = {
      "attended?": attended,
      activity_id: activityId,
      attendee_id: attendeeId,
      voter_id: voterId
    };

    // on submit, add new vote to copy of votes state array
    votes = [...state.votes, vote];

    // put request to "database" so that data persists
    return axios.post(`http://localhost:3001/api/votes/`, vote).then(
      // set state
      dispatch({
        type: "SUBMIT_VOTE",
        votes: votes
      })
    );
  }
  const setTitle = title =>
    dispatch({
      type: "SET_TITLE",
      title
    });

  return {
    state,
    setTitle
  };
}
