'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import s from "./CreateDematAccount.module.scss";
import { isValidEmail, isValidMobile, isValidOtp } from '@/lib/validation';
import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton';
import QueriesSection from '../QueriesSection/QueriesSection';
import FormHeading from '../FormHeading/FormHeading';
import EnterMobile from '../EnterMobile/EnterMobile';
import EnterOTP from '../EnterOTP/EnterOTP';
import EnterEmail from '../EnterEmail/EnterEmail';
import ApplicationStatus from '../ApplicationStatus/ApplicationStatus';
import Copyright from '../Copyright/Copyright';
import { CreateDematAccountProps } from '@/interfaces/account';
import axios from 'axios';

declare global {
  interface Window {
    HyperKYCModule?: any;
    HyperKycConfig?: any;
  }
}

const CreateDematAccount: React.FC<CreateDematAccountProps> = ({
  applicationStep,
  setApplicationStep,
  isAccountVerified,
  // setIsAccountVerified,
  appStatus,
  setAppStatus
}) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isUserEmail, setIsUserEmail] = useState(false);
  const [email, setEmail] = useState("");


  useEffect(() => {
    if (window.HyperKYCModule?.prefetch) {
      window.HyperKYCModule.prefetch({
        appId: process.env.NEXT_PUBLIC_HYPERVERGE_APP_ID,
        workflowId: process.env.NEXT_PUBLIC_HYPERVERGE_WORK_FLOW_ID,
      });
    }
  }, []);

  const handler = (HyperKycResult: any) => {
    console.log('HyperKychandleCall')
    alert('status ' + HyperKycResult.status);
    switch (HyperKycResult.status) {
      // ----Incomplete workflow-----
      case "user_cancelled":
        console.log('user_cancelled', HyperKycResult.status)
        // <<Insert code block 1>>
        break;
      case "error":
        console.log('error', HyperKycResult.status)
        // <<Insert code block 2>>
        break;
      // ----Complete workflow-----
      case "auto_approved":
        console.log('auto_approved', HyperKycResult.status)
        // <<Insert code block 3>>
        break;
      case "auto_declined":
        console.log('auto_declined', HyperKycResult.status)
        // <<Insert code block 4>>
        break;
      case "needs_review":
        console.log('needs_review', HyperKycResult.status)
        // <<Insert code block 5>>
        break;
    }
  }

  const startHyperKycJourney = async () => {
    try {
      const response = await axios.get('/api/auth/hyperverge/access-token');
      // console.log('Response data:', response.data);

      if (response.data.statusCode === "200" && response.data.status === "success") {
        const accessToken = response.data.result.token
        const transactionId = "JHSKJ754HA45454XV123";
        const workflowId = process.env.NEXT_PUBLIC_HYPERVERGE_WORK_FLOW_ID;

        const hyperKycConfig = new window.HyperKycConfig(accessToken, workflowId, transactionId);

        hyperKycConfig.setUniqueId("550e8400-e29b-41d4-a716-446655440123");

        hyperKycConfig.setInputs({
          email: email,
          lead_id: "lead123",
          mobile_number: mobile
        })

        window.HyperKYCModule.launch(hyperKycConfig, handler);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  // function to handle create user account
  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
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
      startHyperKycJourney();
      // setIsAccountVerified(true);
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
    <div className={`${s.login_form} ${applicationStep !== '1' ? `${s.mobile}` : ''}`}>

      {applicationStep !== '1' && applicationStep !== '4' &&
        <div className={s.back_btn}>
          <Image onClick={handleBackBtn} aria-hidden src='/assets/icons/west.svg' alt="west" width={21} height={14} />
        </div>
      }

      <div className={`${s.form_wrap} ${isAccountVerified ? `${s.status}` : ''}`}>
        <form onSubmit={handleCreateAccount}>
          {applicationStep !== '1' &&
            <div className={`${s.logo} ${appStatus === '0' ? `${s.congrate}` : isAccountVerified ? `${s.status}` : ''}`}>
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
                  <div className={s.line_divider}>OR</div>

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
                <div className="input_group__z7d_m4b consent__w5b_d4r email">
                  <label htmlFor="consent">This email belongs to?</label>
                  <select name="" id="consent">
                    <option value="self">Self</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              }

              <div className={s.form_btn}>
                <button
                  className={applicationStep === '3' && !isUserEmail ? 'btn__q7s_l3z outline__k3p_s8r' : 'btn__q7s_l3z'}
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

              {applicationStep === '2' && <div className={s.query_help}>Have any queries? <a href="">Get help</a></div>}

              <div className={s.desktop_view}>
                <QueriesSection />
              </div>
            </>
            :
            <ApplicationStatus appStatus={appStatus} setAppStatus={setAppStatus} />
          }

          {applicationStep === '1' ?
            <div className={s.mobile_view}>
              <QueriesSection />
            </div>
            :
            <div className={s.mobile_copyright}>
              <Copyright />
            </div>
          }
        </form>
      </div>
    </div>
  )
};

export default CreateDematAccount;