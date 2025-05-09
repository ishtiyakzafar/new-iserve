import { EnterMobileProps } from '@/interfaces/account';
import s from "./EnterMobile.module.scss";
import { isValidMobile } from '@/lib/validation';
import EmailMobileConsent from '../EmailMobileConsent/EmailMobileConsent';

const EnterMobile: React.FC<EnterMobileProps> = ({ mobile, setMobile, applicationStep, setConsent, consent }) => {
  return (
    <>
      <div className="input_group__z7d_m4b">
        <label htmlFor="mobile">Mobile Number</label>
        <div className={["6", "7", "8", "9"].includes(mobile.charAt(0)) ? `${s.input_box} ${s.active}` : s.input_box}>
          <span>+91</span>
          <input
            value={mobile}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 10) {
                setMobile(value.replace(/\D/g, ''))
              }
            }}
            autoComplete='off'
            id="mobile"
            name='mobile'
            type="text"
            placeholder="Enter 10 digit mobile number"
          />
        </div>
      </div>

      {isValidMobile(mobile) && applicationStep === '1' &&
        <EmailMobileConsent type="mobile" consent={consent} setConsent={setConsent} />
      }
    </>
  )
};

export default EnterMobile;