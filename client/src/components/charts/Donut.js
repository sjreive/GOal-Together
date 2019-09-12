import React, { useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import Media from 'react-media';

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
    <Media query="(min-width: 300px)">
        {matches => (
          matches && (
            <div className={classes.pieChartContainer}>
              <ResponsiveContainer  width="100%" height={"100%"}>
                <PieChart >
                  <Pie
                    data={data}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    innerRadius="45%"
                    outerRadius="55%"
                    fill="#2d3cb1"
                    paddingAngle={data.length === 1 ? 0 : 5}
                    dataKey="value"
                    label={renderLabel}
                    isAnimationActive={false}
                  >
                    {
                      data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <span className={classes.chartLabel}>
                <h5>{props.userName}</h5>
                <p>{props.userCommitmentScore ? props.userCommitmentScore : 100}%</p>
              </span>
            </div>  
         ))}
    </Media>
  );
};