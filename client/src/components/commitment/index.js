import React, { useState, useEffect } from "react";
// import classes from "./Styles.module.scss";
// import "./Styles.module.scss";
import { useVisualMode } from "../../hooks/useVisualMode";

export default function Commitment(props) {
  const { mode, transition, back } = useVisualMode("FIRST");

  const [type, setType] = useState(props.type || "");

  return (
    <section >
      
    </section>
  );
};