import React, { useState } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import { PieChart, Pie, Sector, Cell } from 'recharts';

export default function Donut(props) {
  
  let data = [];
  if (props.data) {
    data = props.data.map(user => {
      return {
        name: Object.keys(user)[0],
        value: Object.values(user)[0]
      }
    });
  } 
  const COLORS = ['#2d3cb1', '#e793c6', '#ffd700', '#00C49F'];
  return (
    <div>
      <PieChart width={250} height={300} >
        <Pie
          data={data}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
    </div>
  );
};