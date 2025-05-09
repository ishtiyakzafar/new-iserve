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
import { CreateDematAccountProps, GoogleJwtPayload } from '@/interfaces/account';
import axios from 'axios';
import { getToken, resendOtp, sendEmailOtp, sendMobileOtp, verifyEmailOtp, verifyGoogleAuth, verifyMobileOtp } from '@/app/services/apiService';
import Loader from '../Loader/Loader';
import { useSearchParams } from 'next/navigation';
import EmailMobileConsent from '../EmailMobileConsent/EmailMobileConsent';

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
  setIsAccountVerified,
  appStatus,
  setAppStatus
}) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isUserEmail, setIsUserEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState("SE");
  const [loading, setLoading] = useState(false);
  const [clientCode, setClientCode] = useState("");
  const [uniqueID, setUniqueID] = useState("");
  const [token, setToken] = useState("");
  const [googleUser, setGoogleUser] = useState<GoogleJwtPayload | null>(null);
  const searchParams = useSearchParams();
  const e1Code = searchParams.get('E1Code') || "";
  const campaign = searchParams.get('Campaign') || "";
  const leadSource = searchParams.get('lead_source') || "";
  const referenceName = searchParams.get('Reference_Name') || "";
  const referenceNumber = searchParams.get('Reference_Number') || "";
  const referralCode = searchParams.get('ReferralClientcode') || "";
  const utmSource = searchParams.get('utm_source') || "";
  const utmMedium = searchParams.get('utm_medium') || "";
  const utmCampaign = searchParams.get('utm_campaign') || "";
  const utmTerm = searchParams.get('utm_term') || "";
  const utmContent = searchParams.get('utm_content') || "";
  const [resendFlag, setResendFlag] = useState(false);


  useEffect(() => {
    if (window.HyperKYCModule?.prefetch) {
      console.log('process.env.NEXT_PUBLIC_HYPERVERGE_APP_ID--------', process.env.NEXT_PUBLIC_HYPERVERGE_APP_ID)
      window.HyperKYCModule.prefetch({
        appId: process.env.NEXT_PUBLIC_HYPERVERGE_APP_ID,
        workflowId: process.env.NEXT_PUBLIC_HYPERVERGE_WORK_FLOW_ID,
      });
    }
  }, []);

  const clearStates = () => {
    setMobile("");
    setEmail("");
    setOtp("");
    setClientCode("");
    setUniqueID("");
  }

  const handler = (HyperKycResult: any) => {
    alert('status ' + HyperKycResult.status);

    switch (HyperKycResult.status) {
      // ----Incomplete workflow-----
      case "user_cancelled":
        clearStates();
        setApplicationStep('1');
        break;
      case "error":
        clearStates();
        setApplicationStep('1');
        break;

      // ----Complete workflow-----
      case "auto_approved":
        setIsAccountVerified(true);
        setAppStatus('1');
        break;
      case "auto_declined":
        setIsAccountVerified(true);
        setAppStatus('3');
        break;
      case "needs_review":
        setIsAccountVerified(true);
        setAppStatus('2');
        break;
    }
  }

  const startHyperKycJourney = async () => {
    try {
      const response = await axios.get('/api/auth/hyperverge/access-token');

      if (response.data.statusCode === "200" && response.data.status === "success") {
        const accessToken = response.data.result.token
        const workflowId = process.env.NEXT_PUBLIC_HYPERVERGE_WORK_FLOW_ID;

        const hyperKycConfig = new window.HyperKycConfig(accessToken, workflowId, clientCode);
        hyperKycConfig.setUniqueId(uniqueID);

        hyperKycConfig.setInputs({
          email: email,
          lead_id: clientCode, //for now
          mobile_number: mobile
        })

        window.HyperKYCModule.launch(hyperKycConfig, handler);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleSendMobileOtp = async () => {
    try {
      setLoading(true);
      const res = await getToken();

      if (res.succeeded) {
        setToken(res.data.accessToken);
        const uniqueID = window.HyperKYCModule.createUniqueId();
        const data = {
          token: res.data.accessToken,
          mobile,
          uniqueID,
          consent,
          e1Code,
          campaign,
          leadSource,
          propertyAddress: window.location.href,
          referenceName,
          referenceNumber,
          referralCode,
          utmSource,
          utmMedium,
          utmCampaign,
          utmTerm,
          utmContent
        };
        const result = await sendMobileOtp(data);
        if (result.succeeded) {
          setClientCode(result.data.clientCode);
          setUniqueID(result.data.uuid);
          setApplicationStep('2');
        } else {
          alert(result.message[0]);
        }
      } else {
        alert(res.message[0]);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const handleVerifyMobileOtp = async () => {
    try {
      setLoading(true);
      const result = await verifyMobileOtp({ token, clientCode, otp });
      if (result.succeeded) {
        setApplicationStep('3');
      } else {
        alert(result.message[0]);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const handleVerifyGoogleAuth = async () => {
    try {
      setLoading(true);
      const result = await verifyGoogleAuth({ token, clientCode, data: googleUser, consent });
      if (result.succeeded) {
        startHyperKycJourney();
      } else {
        alert(result.message[0])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const handleSendEmailOtp = async () => {
    try {
      setLoading(true);
      const result = await sendEmailOtp({ token, clientCode, email, consent });
      if (result.succeeded) {
        setApplicationStep('2');
      } else {
        alert(result.message[0])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const handleVerifyEmailOtp = async () => {
    try {
      setLoading(true);
      const result = await verifyEmailOtp({ token, clientCode, otp });
      if (result.succeeded) {
        setApplicationStep('4');
        startHyperKycJourney();
      } else {
        alert(result.message[0]);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const handleResendMobileOtp = async () => {
    try {
      setLoading(true);
      const result = await resendOtp({ token, clientCode, type: isUserEmail ? "Email" : "Mobile" });
      if (result.succeeded) {
        setResendFlag(true);
      } else {
        alert(result.message[0]);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  // function to handle create user account
  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (applicationStep === '1') {
      handleSendMobileOtp();
    } else if (applicationStep === '2' && !isUserEmail) {
      handleVerifyMobileOtp();
    } else if (applicationStep === '3' && isUserEmail) {
      setOtp("");
      handleSendEmailOtp();
    } else if (applicationStep === '3') {
      setConsent("SE");
      setIsUserEmail(true);
    } else if (applicationStep === '2' && isUserEmail) {
      handleVerifyEmailOtp();
    } else if (applicationStep === '4' && !isUserEmail) {
      handleVerifyGoogleAuth();
    }
  }

  // function to go to previous step
  const handleBackBtn = () => {
    if (applicationStep === '2' && isUserEmail) {
      setApplicationStep('3');
    } else if (applicationStep === '2') {
      setOtp("");
      setApplicationStep('1');
    } else if (applicationStep === '3') {
      setIsUserEmail(false);
      setApplicationStep('2');
    }
  }

  return (
    <>
      {loading && <Loader />}

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
                    consent={consent}
                    setConsent={setConsent}
                  />
                }

                {applicationStep === '2' &&
                  <EnterOTP
                    setOtp={setOtp}
                    otp={otp}
                    handleResendMobileOtp={handleResendMobileOtp}
                    resendFlag={resendFlag}
                    setResendFlag={setResendFlag}
                  />
                }

                {applicationStep === '3' &&
                  <>
                    <GoogleLoginButton
                      setApplicationStep={setApplicationStep}
                      setEmail={setEmail}
                      setGoogleUser={setGoogleUser}
                      setConsent={setConsent}
                    />
                    <div className={s.line_divider}>OR</div>

                    {isUserEmail &&
                      <EnterEmail
                        email={email}
                        setEmail={setEmail}
                        isUserEmail={isUserEmail}
                        applicationStep={applicationStep}
                        consent={consent}
                        setConsent={setConsent}
                      />
                    }
                  </>
                }

                {applicationStep === '4' && !isUserEmail &&
                  <div className='google_email_olv_9hg'>
                    <EmailMobileConsent type="email" consent={consent} setConsent={setConsent} />
                  </div>
                }

                {(applicationStep === '1' || applicationStep === '2' || applicationStep === '3'
                  || (applicationStep === '4' && !isUserEmail)
                ) &&
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
                }

                {applicationStep === '2' && <div className={s.query_help}>Have any queries? <a href="">Get help</a></div>}

                <div className={s.desktop_view}>
                  <QueriesSection />
                </div>
              </>
              :
              <ApplicationStatus appStatus={appStatus} />
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
    </>
  )
};

export default CreateDematAccount;