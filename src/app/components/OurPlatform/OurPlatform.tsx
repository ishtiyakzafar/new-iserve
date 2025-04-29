import s from "./OurPlatform.module.scss";
import Image from 'next/image';

const OurPlatform = () => {
  return (
    <div className={s.our_platform}>
      <h2>Use our Trading Platforms for your Investment Journey</h2>
      <div className={s.platform_option}>
        <div className={s.app_box}>
          <div className={s.app_name}>
            <Image aria-hidden src='/assets/icons/image 1095.svg' alt="image" width={24} height={24} />
            <p>IIFL Markets App</p>
          </div>
          <div className={s.app_img}>
            <Image aria-hidden src='/assets/images/Frame 1597880573.svg' alt="image" width={65} height={65} />
          </div>
          <small>Scan or click the QR code to download</small>
        </div>
        <div className={s.app_box}>
          <div className={`${s.app_name} ${s.ttweb}`}>
            <p>Trader Terminal Web</p>
          </div>
          <div className={s.app_img}>
            <Image aria-hidden src='/assets/images/ttweb.svg' alt="image" width={116} height={37} />
          </div>
          <small>Visit TT Web </small>
        </div>
      </div>
    </div>
  )
};

export default OurPlatform;