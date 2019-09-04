import React, { useEffect } from "react";
import { PieChart, Pie, Cell } from 'recharts';
import classes from "./Styles.module.scss";
import "./Styles.module.scss";

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

  useEffect(() => {
    console.log("Changed");
  }, [props.chartAnimateToggle])

  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    index
  }) => {
    const RADIAN = Math.PI / 180;
    // eslint-disable-next-line
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    // eslint-disable-next-line
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    // eslint-disable-next-linedata
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    console.log("Render label");
    return (
      <text
        x={x}
        y={y}
        fill="#2d3cb1"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {data[index].name}: {value}
      </text>
    );
  }

  return (
    <div className={classes.pieChartContainer}>
      <PieChart width={300} height={250} >
        <Pie
          data={data}
          cx={150}
          cy={115}
          innerRadius={60}
          outerRadius={80}
          fill="#2d3cb1"
          paddingAngle={5}
          dataKey="value"
          label={renderLabel}
          isAnimationActive={false}
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
      <span className={classes.chartLabel}>
        <h5>Liz</h5>
        <h6>30%</h6>
      </span>
    </div>
  );
};