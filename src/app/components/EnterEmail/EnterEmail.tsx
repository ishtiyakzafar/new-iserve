import React from 'react';
import { isValidEmail } from '@/lib/validation';
import { EnterEmailProps } from '@/interfaces/account';
import EmailMobileConsent from '../EmailMobileConsent/EmailMobileConsent';

const EnterEmail: React.FC<EnterEmailProps> = ({ email, setEmail, isUserEmail, applicationStep, consent, setConsent }) => {
  return (
    <>
      <div className="input_group__z7d_m4b">
        <label htmlFor="email">Email ID</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='off'
          id="email"
          type="email"
          name="email"
          placeholder="Enter your Email ID"
        />
      </div>

      {isUserEmail && isValidEmail(email) && applicationStep === '3' &&
        <EmailMobileConsent type="email" consent={consent} setConsent={setConsent} />
      }
    </>
  )
};

export default EnterEmail;