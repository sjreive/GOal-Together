import React from "react";
import Button from "../button/Button";

export default function Ready(props) {
  return (
    <div>
      <Button 
        back={true}
        smallCircle={true}
      />
      <h2>Ready to crush your goal?</h2>
      <Button
        next={true}
        smallCircle={true}
      />
    </div>
  );
};