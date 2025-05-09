import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {

  const {
    token,
    mobile,
    uniqueID,
    consent,
    e1Code,
    campaign,
    leadSource,
    propertyAddress,
    referenceName,
    referenceNumber,
    referralCode,
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent
  } = await req.json();


  const options = {
    method: 'POST',
    url: `${process.env.BASE_URL}/otp/mobile/send`,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Ocp-Apim-Subscription-Key": process.env.OCP_APIM_SUBSCRIPTION_KEY,
      "Authorization": `Bearer ${token}`
    },
    data: {
      "mobileNumber": mobile,
      "uuid": uniqueID,
      "appSource": "OnlineWeb",
      "registrationParameters": {
        "sourcingChannel": "11",
        "sourcingPlan": "PlanA",
        e1Code,
        "e2Code": "",
        "mobileConsent": consent,
        "isUpdFromWhatsapp": true,
        "crm": {
          campaign,
          leadSource,
          "leadProduct": "Equity",
          "leadCreation": true,
          "product": "Equity",
          "type": "Retail",
          propertyAddress,
          "applicationId": "APP789", //??
          "appsFlyerId": "AF123456", //??
          "whatsAppConsent": true,
          referenceName,
          referenceNumber,
          referralCode,
          "businessChannel": "DirectSales"
        },
        "utm": {
          "source": utmSource,
          "medium": utmMedium,
          "campaign": utmCampaign,
          "term": utmTerm,
          "content": utmContent
        },
        "vt": {
          "campaignId": "CMP123", //Google ads parameters
          "adGroupId": "AG456", //Google ads parameters
          "device": "Mobile", //Google ads parameters
          "keyword": "best mutual fund", //Google ads parameters
          "creative": "Creative123", //Google ads parameters
          "matchType": "Exact", //Google ads parameters
          "placement": "TopPage", //Google ads parameters
          "network": "SearchNetwork" //Google ads parameters
        },
        "device": {
          "make": "Apple", //Dynamic
          "model": "iPhone 14" //Dynamic
        },
        "bank": {
          "name": "",
          "branchName": "",
          "branchCode": "",
          "customerId": "",
          "employeeCode": "",
          "employeeName": ""
        }
      }
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