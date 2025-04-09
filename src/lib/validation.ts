export const mobileRegex = /^[6789]\d{9}$/;
export const otpRegex = /^\d{6}$/;
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function isValidMobile(mobile: string): boolean {
  return mobileRegex.test(mobile);
}

export function isValidOtp(otp: string): boolean {
  return otpRegex.test(otp);
}

export function isValidEmail(email: string): boolean {
  return emailRegex.test(email);
}
