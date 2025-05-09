import React from 'react';
import s from "./ApplicationStatus.module.scss";
import Image from 'next/image';
import OurPlatform from '../OurPlatform/OurPlatform';
import useScreenWidth from '@/app/hooks/useScreenWidth';


const ApplicationStatus = ({ appStatus }: { appStatus: string }) => {
  const screenWidth = useScreenWidth();

  return (
    <div className={s.application_status}>
      <div className={`${s.application_details} ${appStatus === '0' ? `${s.cong}` : ''}`}>
        <div className={s.app_message}>

          {appStatus === '0' &&
            <>
              <Image
                unoptimized
                aria-hidden
                src='/assets/images/cong.gif'
                alt="cong"
                width={screenWidth > 768 ? 113 : 143}
                height={screenWidth > 768 ? 113 : 143}
              />
              <h1>Congratulations!</h1>
              <p>Your account is activated. Start your trading now.</p>
              <div className={`${s.note} ${s.allset}`}>
                {`For login, you'll be redirected to TT Web where you need to enter Client ID and set new Password for your account.
                Client ID is sent on your registered email ID.`}
              </div>
              <div className={s.action_btn}>
                <button className='btn__q7s_l3z' type='button'>Login to IIFL Web</button>
              </div>
            </>
          }

          {appStatus === '1' &&
            <>
              <Image
                aria-hidden
                src='/assets/icons/check.svg'
                alt="check"
                width={70}
                height={70}
              />
              <h1>All set! <br /> Your application is in.</h1>
              <p>Your client ID has been sent to your registered email. <br /> Sit tight while we activate your account.</p>
              <div className={`${s.note} ${s.allset}`}>
                {`You'll receive a notification on your registered email and mobile number when it's ready.`}
              </div>
            </>
          }


          {appStatus === '2' &&
            <div className={s.other_state}>
              <Image
                aria-hidden
                src='/assets/icons/pending.svg'
                alt="pending"
                width={70}
                height={70}
              />
              <h1>Hang tight! <br /> Your request is in progress.</h1>
              <p>{`We are reviewing your application!`} <br /> {`Sit tight, we'll update you once it's complete.`}</p>
              <div className={s.note}>
                {`You'll receive a notification on your registered email (****yz@gmail.com) and mobile number (*****0397)`}
              </div>
            </div>
          }

          {appStatus === '3' &&
            <div className={s.other_state}>
              <Image
                aria-hidden
                src='/assets/icons/error.svg'
                alt="error"
                width={70}
                height={70}
              />
              <h1>{`Your application wasn't approved.`}</h1>
              <p>{`Unfortunately, your application doesn't meet our criteria this time. You're welcome to apply again inthe future.`}</p>
              <div className={s.action_btn}>
                <button className='btn__q7s_l3z' type='button'>Try Again</button>
              </div>
            </div>
          }

          {appStatus === '4' &&
            <div className={s.other_state}>
              <Image
                aria-hidden
                src='/assets/icons/error_icon.svg'
                alt="error"
                width={70}
                height={70}
              />
              <h1 className={s.oneline}>{`Oops! There was a technical error.`}</h1>
              <h1 className={s.linebreak}>{`Oops!`} <br /> {`There was a technical error.`}</h1>
              <p>{`Please try again after some time.`}</p>
              <div className={s.action_btn}>
                <button className='btn__q7s_l3z' type='button'>Try Again</button>
              </div>
            </div>
          }
        </div>

        {(appStatus === '0' || appStatus === '1') && <OurPlatform />}
      </div>
    </div>
  )
};

export default ApplicationStatus;