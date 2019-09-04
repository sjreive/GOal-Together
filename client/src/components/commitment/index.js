import React, { useState, useEffect } from "react";
// import classes from "./Styles.module.scss";
// import "./Styles.module.scss";
import { useVisualMode } from "../../hooks/useVisualMode";

import PageTabs from "../nav_bar/PageTabs";

export default function Commitment(props) {
  const { mode, transition } = useVisualMode("ACTIVITIES");

  const [type, setType] = useState(props.type || "");

  const tabs = [
    {
      label: "Activities",
      mode: "ACTIVITIES"
    },
    {
      label: "Stats",
      mode: "STATS"
    }
  ]

  return (
    <section >
      <PageTabs mode={mode} tabs={tabs} transition={transition}/>
      {mode === "ACTIVITIES" && <h2>Activities</h2>}
      {mode === "STATS" && <h2>STATS</h2>}
    </section>
  );
};