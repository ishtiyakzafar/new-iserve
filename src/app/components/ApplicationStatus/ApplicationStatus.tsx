import React from 'react';
import './ApplicationStatus.scss';
import Image from 'next/image';
import OurPlatform from '../OurPlatform/OurPlatform';
import useScreenWidth from '@/app/hooks/useScreenWidth';


const ApplicationStatus = ({ appStatus, setAppStatus }: { appStatus: string; setAppStatus: (status: string) => void }) => {
  const screenWidth = useScreenWidth();

  return (
    <div className='application-status'>
      <div className={`application-details ${appStatus === '0' ? 'cong' : ''}`}>
        <div className='app-message'>

          {appStatus === '0' &&
            <>
              <Image onClick={() => setAppStatus('1')} aria-hidden src='/assets/images/cong.gif' alt="check" width={screenWidth > 768 ? 113 : 143} height={screenWidth > 768 ? 113 : 143} />
              <h1>Congratulations!</h1>
              <p>Your account is activated. Start your trading now.</p>
              <div className='note'>
                {`For login, you'll be redirected to TT Web where you need to enter Client ID and set new Password for your account.
                Client ID is sent on your registered email ID.`}
              </div>
              <div className='action-btn'>
                <button type='button'>Login to IIFL Web</button>
              </div>
            </>
          }

          {appStatus === '1' &&
            <>
              <Image onClick={() => setAppStatus('2')} aria-hidden src='/assets/icons/check.svg' alt="check" width={70} height={70} />
              <h1>All set! <br /> Your application is in.</h1>
              <p>Your client ID has been sent to your registered email. <br /> Sit tight while we activate your account.</p>
              <div className='note'>
                {`You'll receive a notification on your registered email and mobile number when it's ready.`}
              </div>
            </>
          }

          {appStatus === '2' &&
            <>
              <Image onClick={() => setAppStatus('3')} aria-hidden src='/assets/icons/pending.svg' alt="pending" width={70} height={70} />
              <h1>Hang tight! <br /> Your request is in progress.</h1>
              <p>{`We are reviewing your application! <br /> Sit tight, we'll update you once it's complete.`}</p>
              <div className='note'>
                {`You'll receive a notification on your registered email (****yz@gmail.com) and mobile number (*****0397)`}
              </div>
            </>
          }

          {appStatus === '3' &&
            <>
              <Image onClick={() => setAppStatus('0')} aria-hidden src='/assets/icons/error.svg' alt="error" width={70} height={70} />
              <h1>{`Your application wasn't approved.`}</h1>
              <p>{`Unfortunately, your application doesn't meet our criteria this time. You're welcome to apply again inthe future.`}</p>
              <div className='action-btn'>
                <button type='button'>Try Again</button>
              </div>
            </>
          }
        </div>

        {(appStatus === '0' || appStatus === '1') && <OurPlatform />}
      </div>
    </div>
  )
};

export default ApplicationStatus;