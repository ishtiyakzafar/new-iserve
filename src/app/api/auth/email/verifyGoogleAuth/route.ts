import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {

  const { token, clientCode, data, consent } = await req.json();

  const options = {
    method: 'POST',
    url: `${process.env.BASE_URL}/auth/email/verifyGoogleAuth`,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Ocp-Apim-Subscription-Key": process.env.OCP_APIM_SUBSCRIPTION_KEY,
      "Authorization": `Bearer ${token}`
    },
    data: {
      "data": {
        clientCode,
        ...data
      },
      clientCode,
      "email": data.email,
      "consentEmailFor": consent
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