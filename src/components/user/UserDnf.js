import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#FFBB67", "#6F8AF4", "#CD5D67", "#E6A3CA", "#238C89"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const style = {
  top: 330,
  left: 0,
  lineHeight: "30px",
};

function UserDnf(props) {
  const userData = props.userData;
  const data = [
    { name: "分析ミス", value: userData.observationMiss },
    { name: "記憶飛び", value: userData.memoSlip },
    { name: "エッジ実行ミス", value: userData.edgeExeMiss },
    { name: "コーナー実行ミス", value: userData.cornerExeMiss },
    { name: "想起ミス", value: userData.recallMiss },
  ];

  return (
    <ResponsiveContainer height={419} width="100%">
      <PieChart>
        <Pie
          cx="50%"
          cy={150}
          data={data}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius="60%"
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          width="100%"
          height={100}
          verticalAlign="middle"
          wrapperStyle={style}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default UserDnf;
