import React from "react";
import { PieChart, Pie, Cell } from 'recharts';

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
    <PieChart width={300} height={300} >
      <Pie
        data={data}
        cx={150}
        cy={150}
        innerRadius={60}
        outerRadius={80}
        fill="#2d3cb1"
        paddingAngle={5}
        dataKey="value"
        label={({
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
          // eslint-disable-next-line
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
        }}
      >
        {
          data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
        }
      </Pie>
    </PieChart>
  );
};