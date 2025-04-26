import { EnterMobileProps } from '@/interfaces/account';
import './EnterMobile.scss';
import { isValidMobile } from '@/lib/validation';

const EnterMobile: React.FC<EnterMobileProps> = ({ mobile, setMobile, applicationStep }) => {
  return (
    <>
      <div className="input-group">
        <label htmlFor="mobile">Mobile Number</label>
        <div className={["6", "7", "8", "9"].includes(mobile.charAt(0)) ? 'input-box active' : 'input-box'}>
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
        <div className="input-group consent">
          <label htmlFor="consent">This number belongs to?</label>
          <select name="consent" id="consent">
            <option value="self">Self</option>
            <option value="other">Other</option>
          </select>
        </div>
      }
    </>
  )
};

export default EnterMobile;