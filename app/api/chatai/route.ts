import { METHODS } from 'http';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const url = "https://api.openai.com/v1/chat/completions";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json({ message: 'Prompt is required' }, { status: 400 });
  }

  try {

const body = JSON.stringify({
    messages : [{role: "user", content : "streaming ideas"}],
    model: 'gpt-3.5-turbo',
    stream: false
})
const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body
  })
  // if (!response) {
      //   throw new Error('Network response was not ok');
      // }
      
      const data = await response.json();
      console.log(data.choices[0]?.message, "RES");

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching data from OpenAI:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
