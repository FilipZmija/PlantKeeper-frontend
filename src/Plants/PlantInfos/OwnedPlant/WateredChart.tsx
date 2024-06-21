import React, { useEffect } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ScatterChart,
  Scatter,
} from "recharts";
import {
  displayReadableDate,
  displayReadableShortDate,
  getDate,
} from "../../../helpers/date";

type WateredData = {
  date: Date;
  watered: number;
};

const WateredChart: React.FC = () => {
  const [expanded, setExpanded] = React.useState(false);
  useEffect(() => {
    setExpanded(true);
  }, []);

  const data: Date[] = [
    getDate(-46),
    getDate(-36),
    getDate(-30),
    getDate(-26),
    getDate(-19),
    getDate(-12),
    getDate(-7),
    getDate(-1),
  ];

  const formattedData: WateredData[] = data.map((date) => ({
    date,
    watered: 1,
  }));

  const parsedData = formattedData.map((item) => ({
    date: item.date.getTime(), // Convert to timestamp for charting
    watered: item.watered,
  }));

  return (
    <div
      className={`${
        expanded ? "max-h-20" : "max-h-4"
      } transition-max-h duration-300 overflow-hidden`}
    >
      <ResponsiveContainer height={80} width="100%">
        <ScatterChart margin={{ top: 10, right: 25, left: -25, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            domain={["auto", "auto"]}
            name="Date"
            tickFormatter={(tick) => displayReadableShortDate(new Date(tick))}
            type="number"
            scale="time"
          />
          <YAxis
            dataKey="watered"
            name="Watered"
            ticks={[0, 1]}
            tickFormatter={(tick) => (tick ? "Yes" : "No")}
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            formatter={(value: number, name) => {
              if (name === "Date") return displayReadableDate(new Date(value));
              return value === 1 ? "Yes" : "No";
            }}
            labelFormatter={() => <></>}
          />
          <Scatter data={parsedData} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};
export default WateredChart;
