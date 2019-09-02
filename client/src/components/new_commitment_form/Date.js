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
      <label htmlFor="type"><p>Enter the type of commitment:</p></label>
      <select>
        <option value="fitness">Fitness</option>
        <option value="academic">Academic</option>
        <option value="reading">Reading</option>
        <option value="social">Social</option>
        <option value="other">Other</option>
      </select>
      <Button
        submit={true}
        form={props.form}
        wide={true}
        onClick={props.clickNext}
      />
    </div>
  );
};