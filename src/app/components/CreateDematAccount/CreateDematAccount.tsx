'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import './CreateDematAccount.scss';
import { isValidEmail, isValidMobile, isValidOtp } from '@/lib/validation';
import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton';
import QueriesSection from '../QueriesSection/QueriesSection';
import FormHeading from '../FormHeading/FormHeading';
import EnterMobile from '../EnterMobile/EnterMobile';
import EnterOTP from '../EnterOTP/EnterOTP';
import EnterEmail from '../EnterEmail/EnterEmail';
import ApplicationStatus from '../ApplicationStatus/ApplicationStatus';
import Copyright from '../Copyright/Copyright';


const CreateDematAccount = ({ applicationStep, setApplicationStep, isAccountVerified, setIsAccountVerified, appStatus, setAppStatus }: any) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isUserEmail, setIsUserEmail] = useState(false);
  const [email, setEmail] = useState("");


  // function to handle create user account
  const handleCreateAccount = async (e: any) => {
    e.preventDefault();

    if (applicationStep === '1') {
      setApplicationStep('2');
    } else if (applicationStep === '2' && !isUserEmail) {
      setApplicationStep('3');
    } else if (applicationStep === '3' && isUserEmail) {
      setOtp("");
      setApplicationStep('2');
    } else if (applicationStep === '3') {
      setIsUserEmail(true);
    } else if (applicationStep === '2' && isUserEmail) {
      setApplicationStep('4');
    } else if (applicationStep === '4') {
      setIsAccountVerified(true);
    }
  }

  // function to go to previous step
  const handleBackBtn = () => {
    if (applicationStep === '2' && isUserEmail) {
      setApplicationStep('3');
    } else if (applicationStep === '2') {
      setApplicationStep('1');
    } else if (applicationStep === '3') {
      setIsUserEmail(false);
      setApplicationStep('2');
    }
  }

  return (
    <div className={`login-form ${applicationStep !== '1' ? 'mobile' : ''}`}>

      {applicationStep !== '1' && applicationStep !== '4' &&
        <div className='back-btn'>
          <Image onClick={handleBackBtn} aria-hidden src='/assets/icons/west.svg' alt="west" width={21} height={14} />
        </div>
      }

      <div className={`form-wrap ${isAccountVerified ? 'status' : ''}`}>
        <form onSubmit={handleCreateAccount}>
          {applicationStep !== '1' &&
            <div className={`logo ${appStatus === '0' ? 'congrate' : isAccountVerified ? 'status' : ''}`}>
              <Image
                priority
                aria-hidden
                src="/assets/images/New Logo.svg"
                alt="Logo"
                width={171}
                height={30}
              />
            </div>
          }

          {!isAccountVerified ?
            <>
              <FormHeading
                email={email}
                mobile={mobile}
                applicationStep={applicationStep}
                isUserEmail={isUserEmail}
                setApplicationStep={setApplicationStep}
              />

              {applicationStep === '1' &&
                <EnterMobile
                  mobile={mobile}
                  setMobile={setMobile}
                  applicationStep={applicationStep}
                />
              }

              {applicationStep === '2' &&
                <EnterOTP
                  setOtp={setOtp}
                  otp={otp}
                />
              }

              {applicationStep === '3' &&
                <>
                  <GoogleLoginButton setApplicationStep={setApplicationStep} setEmail={setEmail} />
                  <div className='line-divider'>OR</div>

                  {isUserEmail &&
                    <EnterEmail
                      email={email}
                      setEmail={setEmail}
                      isUserEmail={isUserEmail}
                      applicationStep={applicationStep}
                    />
                  }
                </>
              }

              {applicationStep === '4' &&
                <div className="input-group consent email">
                  <label htmlFor="consent">This email belongs to?</label>
                  <select name="" id="consent">
                    <option value="self">Self</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              }

              <div className='form-btn'>
                <button
                  className={applicationStep === '3' && !isUserEmail ? 'outline' : ''}
                  disabled={
                    (applicationStep === '1' && !isValidMobile(mobile)) ||
                    (applicationStep === '2' && !isValidOtp(otp)) ||
                    (applicationStep === '3' && isUserEmail && !isValidEmail(email))
                  }
                  type="submit"
                >
                  {applicationStep === '1' && 'Get OTP'}
                  {applicationStep === '2' && 'Verify OTP'}
                  {applicationStep === '3' && (!isUserEmail ? 'Continue with Email' : 'Continue')}
                  {applicationStep === '4' && 'Continue'}
                </button>
              </div>

              {applicationStep === '2' && <div className='query-help'>Have any queries? <a href="">Get help</a></div>}

              <div className='desktop-view'>
                <QueriesSection />
              </div>
            </>
            :
            <ApplicationStatus appStatus={appStatus} setAppStatus={setAppStatus} />
          }

          {applicationStep === '1' ?
            <div className='mobile-view'>
              <QueriesSection />
            </div>
            :
            <div className='mobile-copyright'>
              <Copyright />
            </div>
          }
        </form>
      </div>
    </div>
  )
};

export default CreateDematAccount;