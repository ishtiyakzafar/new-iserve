import axios from "axios";

const API_URL =
  "https://broking-apigateway.indiainfoline.com/eaccount/ValidateMobileNumber_ResumeJourneyV2";

export const validateMobileNumber = async (mobileNumber: any) => {
  try {

    const data = {
      "head": {
        "AppSource": "glAzbRY+ut5h41oGOcno1w==",
        "IPAddress": "UWHnuaY76FOunGp1Cryuyw==",
        "CheckSumValue": "24755FEB115E7972"
      },
      "body": {
        "MobileNo": "BPTtctYBRyxvgOhMlr1hyA=="
      }
    }

    const headers = {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": '306dc1452edd404880edca6551178180',
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiOTE0MjgyOTcxOSIsIm5iZiI6MTc0NDAyMDQyNSwiZXhwIjoxNzQ0MDI1ODI1LCJpYXQiOjE3NDQwMjA0MjV9.0449fvcdH-DLH4g0LUoFMMbXgm7ZVlpDTwCr7JAdhYA"
    }

    const response = await axios.post(API_URL, data, { headers });

    return response.data; // Return API response data
  } catch (error) {
    console.error("Error validating mobile number:", error);
    throw error; // Re-throw error for handling in UI
  }
};