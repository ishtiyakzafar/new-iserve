import axios from 'axios';

export const getToken = async () => {
  try {
    const response = await axios.post('/api/auth/token');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const sendMobileOtp = async (data: any) => {
  try {
    const response = await axios.post("/api/otp/mobile/send", data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const verifyMobileOtp = async (data: any) => {
  try {
    const response = await axios.post("/api/otp/mobile/verify", data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const verifyGoogleAuth = async (data: any) => {
  try {
    const response = await axios.post("/api/auth/email/verifyGoogleAuth", data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const sendEmailOtp = async (data: any) => {
  try {
    const response = await axios.post("/api/otp/email/send", data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const verifyEmailOtp = async (data: any) => {
  try {
    const response = await axios.post("/api/otp/email/verify", data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const resendOtp = async (data: any) => {
  try {
    const response = await axios.post("/api/otp/resend", data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};