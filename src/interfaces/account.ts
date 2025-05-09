export interface CreateDematAccountProps {
  applicationStep: string;
  setApplicationStep: (step: string) => void;
  isAccountVerified: boolean;
  setIsAccountVerified: (verified: boolean) => void;
  appStatus: string;
  setAppStatus: (status: string) => void;
};

export interface EnterEmailProps {
  email: string;
  setEmail: (step: string) => void;
  isUserEmail: boolean;
  applicationStep: string;
  setConsent: (step: string) => void;
  consent: string;
};

export interface EnterMobileProps {
  mobile: string;
  setMobile: (step: string) => void;
  applicationStep: string;
  setConsent: (step: string) => void;
  consent: string;
};

export interface EnterOTPProps {
  setOtp: (step: string) => void;
  otp: string;
  handleResendMobileOtp: () => void;
  resendFlag: boolean;
  setResendFlag: (resendFlag: boolean) => void;
};

export interface FormHeadingProps {
  email: string;
  mobile: string;
  applicationStep: string;
  isUserEmail: boolean;
  setApplicationStep: (step: string) => void;
}

export interface GoogleJwtPayload {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  hd?: string;
  email: string;
  email_verified: boolean;
  nbf: number;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}

export interface GoogleLoginButtonProps {
  setApplicationStep: (step: string) => void;
  setEmail: (step: string) => void;
  setGoogleUser: (user: GoogleJwtPayload) => void;
  setConsent: (consent: string) => void;
}

export interface HeroDetailSectionProps {
  isAccountVerified: boolean;
  appStatus: string;
  applicationStep: string;
}