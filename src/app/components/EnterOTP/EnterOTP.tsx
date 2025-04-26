import React from 'react';
import './EnterOTP.scss';
import VerificationInput from 'react-verification-input';
import { EnterOTPProps } from '@/interfaces/account';

const EnterOTP: React.FC<EnterOTPProps> = ({ setOtp, otp }) => {
  return (
    <div className='verify-otp'>
      <VerificationInput
        autoFocus={true}
        length={6}
        validChars="0-9"
        onChange={(val) => setOtp(val)}
        value={otp}
        classNames={{
          container: "verifyContainer",
          character: "verifyCharacter",
          characterInactive: "verifyCharacterInactive",
          characterSelected: "verifyCharacterSelected",
        }}
      />
      <p>OTP not received? <span><small>Resend</small> in 00:59 Secs</span></p>
    </div>
  )
};

export default EnterOTP;