import React, { useRef, useState, useEffect } from 'react';
import s from "./EnterOTP.module.scss";
import VerificationInput from 'react-verification-input';
import { EnterOTPProps } from '@/interfaces/account';

const EnterOTP: React.FC<EnterOTPProps> = ({ setOtp, otp, handleResendMobileOtp, resendFlag, setResendFlag }) => {
  const [second, setSecond] = useState(30);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    setSecond(30);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setSecond((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startTimer();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (resendFlag) {
      startTimer();
      setResendFlag(false);
    }
  }, [resendFlag, setResendFlag]);

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

      <p>OTP not received? <small onClick={() => {
        if (second === 0) {
          handleResendMobileOtp();
        }
      }}>Resend</small>{second > 0 && <span> in {second} Secs</span>}</p>
    </div>
  );
};

export default EnterOTP;
