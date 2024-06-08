import type { NextApiRequest, NextApiResponse } from 'next';
import { dailyTrends, DailyTrendsResults } from 'google-trends-api';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  dailyTrends({ geo: 'US' })
    .then((results: string) => {
      const parsedResults: DailyTrendsResults = JSON.parse(results);
      res.status(200).json(parsedResults);
    })
    .catch((error: Error) => {
      res.status(500).json({ error: error.message });
    });
}