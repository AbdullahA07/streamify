import type { NextApiRequest, NextApiResponse } from 'next'
import googleTrendsApi from "google-trends-api";

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse
) {
  googleTrendsApi.dailyTrends({ geo: "US" })
    .then((results: any) => {
      console.log("results: "+ results);
      const parsedResults = JSON.parse(results);
      const text = JSON.stringify(parsedResults);
      return new Response(text,{status: 200})
      res.status(200).json(results);
    })
    .catch((error: Error) => {
      return new Response(error.message,{status: 400})
      res.status(500).json({ error: error.message });
    });
}