import { NextRequest, NextResponse } from 'next/server';
import googleTrendsApi from 'google-trends-api';

// Named export for GET method
export async function GET(req: NextRequest) {
  try {
    const results = await googleTrendsApi.dailyTrends({ geo: 'IN' });
    // No need to parse JSON if your API already returns a JSON response
    const parsedResults = JSON.parse(results);
    return NextResponse.json(parsedResults);
  } catch (error) {
    // Handle errors properly
    console.error('Error fetching Google Trends data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}