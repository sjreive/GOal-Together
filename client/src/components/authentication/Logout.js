import React, { useState, useEffect } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import { Redirect } from 'react-router'

const Logout = props => {
  localStorage.removeItem('jwt');
  props.setUser({});
  return <Redirect to='/login' />
}

export default Logout;