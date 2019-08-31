import React, { useEffect, useReducer } from "react";
import axios from "axios";

const reducer = (state, action) => {
  switch(action.type) {
    case "SET_APPLICATION_DATA":
      return {
        ...state,
        commitments: action.commitments,
      };
      default:
        throw new Error(
          "Tried to reduce with unsupported action type: ${action.type}"

        )
  };
}

const useApplicationData = () => {

  const [state, dispatch] = useReducer(reducer, {
    commitments: []
  });
    
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:3001/api/commitments`),
    ])
    .then(all => {
      dispatch({
        type: SET_APPLICATION_DATA, 
        commitments: all[0].data
      });
    });
  }, []);
    
  return { 
    state,
  };
}

export { useApplicationData }
