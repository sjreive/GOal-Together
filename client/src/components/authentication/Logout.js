import React, { useState, useEffect } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import { Redirect } from 'react-router'

const Logout = () => {
  localStorage.removeItem('jwt');
  return <Redirect to='/login' />
}

export default Logout;