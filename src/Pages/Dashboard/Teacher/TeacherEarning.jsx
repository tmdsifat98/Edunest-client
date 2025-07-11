import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TeacherEarning = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: earnings = [] } = useQuery({
    queryKey: ["teacherEarnings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/teacher-earnings?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });
  console.log(earnings);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold mb-4 text-center text-primary">
        Earnings Per Class
      </h2>
    <ResponsiveContainer width="100%" height={500}>
         <LineChart
        data={earnings}
        margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
      >
        <CartesianGrid stroke="#aaa" strokeDasharray="6 6" />
        <Line
          type="monotone"
          dataKey="price"
          stroke="purple"
          strokeWidth={2}
          name="Taka"
        />
        <XAxis dataKey="title" />
        <YAxis
          width="auto"
          label={{ value: "price", position: "insideLeft", angle: -90 }}
        />
        <Legend align="center" />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
    </div>
  );
};

export default TeacherEarning;
