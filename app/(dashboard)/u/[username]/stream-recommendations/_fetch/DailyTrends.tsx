"use client";


import { useEffect, useState } from 'react';
import googleTrendsApi from "google-trends-api";


const DailyTrends = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/gtrend')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error.message));
  }, []);

  // useEffect(()=>{
  //   googleTrendsApi.dailyTrends({ geo: "US" })
  //   .then((results: any) => {
  //     debugger;
  //     console.log("results: "+ results);
  //     const parsedResults = JSON.parse(results);
  //     // res.status(200).json(parsedResults);
  //   })
  //   .catch((error: Error) => {
  //     // res.status(500).json({ error: error.message });
  //   });
    
  // },[])

  useEffect(()=>{
    debugger;
    console.log("data: " + data);
  },[data])

  useEffect(()=>{
    debugger;
    console.log("error: " + error);
  },[error])
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Daily Trends</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DailyTrends;