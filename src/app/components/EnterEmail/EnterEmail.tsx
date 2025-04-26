import React from 'react';
import './EnterEmail.scss';
import { isValidEmail } from '@/lib/validation';
import { EnterEmailProps } from '@/interfaces/account';

const EnterEmail: React.FC<EnterEmailProps> = ({ email, setEmail, isUserEmail, applicationStep }) => {
  return (
    <>
      <div className="input-group">
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
        <div className="input-group consent">
          <label htmlFor="email_consent">This email belongs to?</label>
          <select name="email_consent" id="email_consent">
            <option value="self">Self</option>
            <option value="other">Other</option>
          </select>
        </div>
      }
    </>
  )
};

export default EnterEmail;