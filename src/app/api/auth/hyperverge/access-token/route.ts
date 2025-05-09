import { NextResponse } from 'next/server';
import axios from 'axios';
import https from 'https';

export async function GET() {
  try {
    const response = await axios.post(
      `${process.env.HYPERVERGE_BASE_URL}/login`,
      {
        "appId": process.env.HYPERVERGE_APP_ID,
        "appKey": process.env.HYPERVERGE_APP_KEY,
        "expiry": 84600
      },
      {
        headers: {
          "Content-Type": "application/json"
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: process.env.NODE_ENV === 'development' ? false : true
        })
      }
    );
    return NextResponse.json(response.data);
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data || error.message || 'Something went wrong';
    return NextResponse.json({ error: message }, { status });
  }
}