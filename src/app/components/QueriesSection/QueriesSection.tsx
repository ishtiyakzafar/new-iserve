import s from "./QueriesSection.module.scss";
import Image from 'next/image';

const QueriesSection = () => {
  return (
    <div className={s.queries_box}>
      <h6>Have any queries?</h6>
      <div className={s.queries}>
        <p className={s.phone}><Image aria-hidden src='/assets/icons/phone.svg' alt="phone" width={15} height={14} /> <small>Call us at</small> <span>+91 9928917280</span></p>
        <p><Image aria-hidden src='/assets/icons/mail.svg' alt="mail" width={15} height={13} /> <small>Write us at</small> <span>iiflhelpdesk@iifl.com</span></p>
      </div>
    </div>
  )
};

export default QueriesSection;