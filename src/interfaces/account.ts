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
};

export interface EnterMobileProps {
  mobile: string;
  setMobile: (step: string) => void;
  applicationStep: string;
};

export interface EnterOTPProps {
  setOtp: (step: string) => void;
  otp: string;
};

export interface FormHeadingProps {
  email: string;
  mobile: string;
  applicationStep: string;
  isUserEmail: boolean;
  setApplicationStep: (step: string) => void;
}

export interface GoogleLoginButtonProps {
  setApplicationStep: (step: string) => void;
  setEmail: (step: string) => void;
}

export interface HeroDetailSectionProps {
  isAccountVerified: boolean;
  appStatus: string;
  applicationStep: string;
}