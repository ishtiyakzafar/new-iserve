import React from 'react';

const consentList = [
  {
    "Declaration_Code": "SE",
    "Declaration_value": "Self"
  },
  {
    "Declaration_Code": "SP",
    "Declaration_value": "Spouse"
  },
  {
    "Declaration_Code": "DC",
    "Declaration_value": "Dependent Children"
  },
  {
    "Declaration_Code": "DS",
    "Declaration_value": "Dependent Siblings"
  },
  {
    "Declaration_Code": "DP",
    "Declaration_value": "Dependent Parents"
  },
  {
    "Declaration_Code": "GD",
    "Declaration_value": "Guardian"
  },
  {
    "Declaration_Code": "PM",
    "Declaration_value": "PMS"
  },
  {
    "Declaration_Code": "CD",
    "Declaration_value": "Custodian"
  },
  {
    "Declaration_Code": "PO",
    "Declaration_value": "POA"
  }
];

const EmailMobileConsent = ({ type, consent, setConsent }: any) => {
  return (
    <div className="input_group__z7d_m4b consent__w5b_d4r">
      <label htmlFor="consent">This {type} belongs to?</label>
      <select value={consent} onChange={(e) => setConsent(e.target.value)} name="consent" id="consent">
        {
          consentList.map((list) => (
            <option key={list.Declaration_Code} value={list.Declaration_Code}>{list.Declaration_value}</option>
          ))
        }
      </select>
    </div>
  )
};

export default EmailMobileConsent;