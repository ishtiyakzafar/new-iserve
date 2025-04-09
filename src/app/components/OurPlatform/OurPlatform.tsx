import './OurPlatform.scss';
import Image from 'next/image';

const OurPlatform = () => {
  return (
    <div className='our-platform'>
      <h2>Use our Trading Platforms for your Investment Journey</h2>
      <div className='platform-option'>
        <div className='app-box'>
          <div className='app-name'>
            <Image aria-hidden src='/assets/icons/image 1095.svg' alt="image" width={24} height={24} />
            <p>IIFL Markets App</p>
          </div>
          <div className='app-img'>
            <Image aria-hidden src='/assets/images/Frame 1597880573.svg' alt="image" width={65} height={65} />
          </div>
          <small>Scan or click the QR code to download</small>
        </div>
        <div className='app-box'>
          <div className='app-name ttweb'>
            <p>Trader Terminal Web</p>
          </div>
          <div className='app-img'>
            <Image aria-hidden src='/assets/images/ttweb.svg' alt="image" width={116} height={37} />
          </div>
          <small>Visit TT Web </small>
        </div>
      </div>
    </div>
  )
};

export default OurPlatform;