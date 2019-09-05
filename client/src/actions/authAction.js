import axios from "axios";
import { API_URL } from './apiURL';
import * as types from './actionTypes';

const authRequest = () => {
  return {
    type: types.AUTHENTICATION_REQUEST
  };
};

