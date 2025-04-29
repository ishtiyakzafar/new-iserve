import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
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
          rejectUnauthorized: false  // <=== Ignore SSL cert
        })
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    const axiosError = error as AxiosError;

    console.log('Error occurred:', axiosError);

    const errorMessage = axiosError.response?.data || 'An error occurred';
    const errorStatus = axiosError.response?.status || 500;

    return NextResponse.json({ error: errorMessage }, { status: errorStatus });
  }
}
