import React, { useEffect, useReducer } from "react";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_APPLICATION_DATA":
      return {
        ...state,
        commitments: action.commitments,
        votes: action.votes
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
    title: ""
  });

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:3001/api/commitments`),
      axios.get(`http://localhost:3001/api/votes`)
    ]).then(all => {
      dispatch({
        type: "SET_APPLICATION_DATA",
        commitments: all[0].data,
        votes: all[1].data
      });
    });
  }, []);

  const setTitle = title => dispatch({
    type: "SET_TITLE",
    title
  });

  const setNewCommitment = commitment => {
    return new Promise((resolve, reject) => {
      return axios.post('http://localhost:3001/api/commitments', commitment)
      .then(async response => {
        await dispatch({
          type: "SET_NEW_COMMITMENT",
          commitment
        })
        resolve(response);
      })
    });
  };

  return {
    state,
    setTitle,
    setNewCommitment
  };
}
