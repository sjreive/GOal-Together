import React from "react";
import Button from "../button/Button";

export default function Ready(props) {
  return (
    <div>
      <Button 
        back={true}
        smallCircle={true}
        onClick={props.clickBack}
      />
      <h2>Awesome!</h2>
      <h2>Enter the type of commitment:</h2>
      <Button
        next={true}
        smallCircle={true}
      />
    </div>
  );
};