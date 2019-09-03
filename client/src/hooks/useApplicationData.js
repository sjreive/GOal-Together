import React, { useEffect, useReducer } from "react";
import axios from "axios";

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
    Promise.all([
      axios.get(`http://localhost:3001/api/commitments`),
      axios.get(`http://localhost:3001/api/votes`),
      axios.get(`http://localhost:3001/api/users`),
      axios.get(`http://localhost:3001/api/activities`),
      axios.get('http://localhost:3001/api/attendance')
    ]).then(all => {
      dispatch({
        type: "SET_APPLICATION_DATA",
        commitments: all[0].data,
        votes: all[1].data,
        members: all[2].data,
        activities: all[3].data,
        attendance: all[4].data
      });
    });
  }, []);

  const submitVote = function(voteData) {
    return axios
      .post(`http://localhost:3001/api/votes/`, voteData)
      .then(data => console.log(`This was sent to the server ${data}`));
  };
  const setTitle = title =>
    dispatch({
      type: "SET_TITLE",
      title
    });

  const setNewCommitment = commitment => {
    return new Promise((resolve, reject) => {
      return axios
        .post("http://localhost:3001/api/commitments", commitment)
        .then(async response => {
          await dispatch({
            type: "SET_NEW_COMMITMENT",
            commitment
          });
          resolve(response);
        });
    });
  };

  return {
    state,
    setTitle,
    setNewCommitment,
    submitVote
  };
}
