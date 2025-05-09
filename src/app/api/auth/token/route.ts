import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST() {
  const options = {
    method: 'POST',
    url: `${process.env.BASE_URL}/auth/token`,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Ocp-Apim-Subscription-Key": process.env.OCP_APIM_SUBSCRIPTION_KEY,
    },
    data: {
      "appId": process.env.ACCESS_TOKEN_APP_ID,
      "appKey": process.env.ACCESS_TOKEN_APP_KEY,
      "secret": process.env.ACCESS_TOKEN_SECRET
    }
  };

  try {
    const { data } = await axios.request(options);
    return NextResponse.json(data);
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data || error.message || 'Something went wrong';
    return NextResponse.json({ error: message }, { status });
  }
}