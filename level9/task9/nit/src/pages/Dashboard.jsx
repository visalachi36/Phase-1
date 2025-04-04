import React from "react";
import { useQuery } from "@tanstack/react-query";
import fetchData from "../api/fetchData";

const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["fetchData"],
    queryFn: fetchData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default React.memo(Dashboard);
