import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const getPath = (x, y, width, height) => (
  `M${x},${y + height}
   C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
   C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
   Z`
);


const TriangleBar = (props) => {
  const {
    fill, x, y, width, height,
  } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const IncomeChart = () => {
  const axiosSecure = useAxiosSecure();

  const { data: incomeData = [], isLoading } = useQuery({
    queryKey: ["IncomeChart"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/teacher-income");
      return res.data;
    },
  });

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-primary">
        Teachers' Income Report
      </h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={incomeData} margin={{ top: 20, right: 30, left: 20, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="teacherEmail" angle={-15} textAnchor="end" />
            <YAxis />
            <Legend />
            <Bar
              dataKey="totalIncome"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top", fill: "#000", fontSize: 12 }}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default IncomeChart;
