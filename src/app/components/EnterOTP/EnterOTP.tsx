import React from 'react';
import s from "./EnterOTP.module.scss";
import VerificationInput from 'react-verification-input';
import { EnterOTPProps } from '@/interfaces/account';

const EnterOTP: React.FC<EnterOTPProps> = ({ setOtp, otp }) => {
  return (
    <div className={s.verify_otp}>
      <VerificationInput
        autoFocus={true}
        length={6}
        validChars="0-9"
        onChange={(val) => setOtp(val)}
        value={otp}
        classNames={{
          container: s.verifyContainer,
          character: s.verifyCharacter,
          characterInactive: s.verifyCharacterInactive,
          characterSelected: s.verifyCharacterSelected,
        }}
      />
      <p>OTP not received? <span><small>Resend</small> in 00:59 Secs</span></p>
    </div>
  )
};

export default EnterOTP;