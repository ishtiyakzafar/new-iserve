import React from 'react';
import s from "./FormHeading.module.scss";
import Image from 'next/image';
import { FormHeadingProps } from '@/interfaces/account';

const FormHeading: React.FC<FormHeadingProps> = ({
  email,
  mobile,
  applicationStep,
  isUserEmail,
  setApplicationStep
}) => {
  return (
    <div className={s.form_heading}>
      {applicationStep === '1' &&
        <>
          <p>Get your <span>FREE Demat Account</span> and start trading in 5 min!</p>
          <small>Enter your mobile number to receive a one-time password (OTP) for verification</small>
        </>
      }

      {applicationStep === '2' &&
        <>
          <p><span>Verify OTP</span></p>
          {
            isUserEmail ?
              <small>Enter 6 digit OTP sent to <br /> <span>{email}</span> <Image onClick={() => setApplicationStep('3')} aria-hidden src='/assets/icons/edit.svg' alt="edit" width={15} height={14} /></small>
              :
              <small>Enter OTP sent to <span>+91 {mobile}</span> <Image onClick={() => setApplicationStep('1')} aria-hidden src='/assets/icons/edit.svg' alt="edit" width={15} height={14} /></small>
          }
        </>
      }

      {applicationStep === '3' &&
        <>
          <p><span>Please verify your email</span></p>
          <small>We suggest verifying faster with Google account</small>
        </>
      }

      {applicationStep === '4' &&
        <div className={s.confirmation}>
          <Image aria-hidden src='/assets/icons/success.svg' alt="success" width={124} height={98} />
          <p><span>Email Verified!</span></p>
          <small>Email ID <span>{email}</span>has been successfully verified</small>
        </div>
      }
    </div>
  )
};

export default FormHeading;