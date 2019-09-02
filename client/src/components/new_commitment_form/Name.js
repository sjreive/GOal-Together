import React from "react";
import Button from "../button/Button";

export default function Name(props) {
  return (
    <div>
      <Button 
        back={true}
        smallCircle={true}
        onClick={props.clickBack}
      />
      <label htmlFor="name"><h2>What do you want to call this commitment?</h2></label>
      <input type="text" placeholder="Enter name" required></input>
      <Button
        next={true}
        smallCircle={true}
        onClick={props.clickNext}
      />
    </div>
  );
};