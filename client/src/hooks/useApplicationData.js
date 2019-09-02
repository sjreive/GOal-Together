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
    title: ""
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
