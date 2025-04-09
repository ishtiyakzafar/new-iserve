"use client";
import React from 'react';
import './HeroDetailSection.scss';
import Image from 'next/image';
import ServicesSection from '../ServicesSection/ServicesSection'

const HeroDetailSection = ({ isAccountVerified, appStatus, applicationStep }: any) => {

  return (
    <div className={applicationStep === '1' ? 'hero-detail' : 'hero-detail hide'}>
      <div className="hero-detail-upper">
        <Image
          aria-hidden
          src="/assets/images/New Logo.svg"
          alt="Logo"
          className='iifl-logo'
          width={256}
          height={45}
        />

        {!isAccountVerified ?
          <>
            <h1>Explore a New World of Investment Opportunities!</h1>
            <div className="hero-image">
              <Image
                priority
                aria-hidden
                src="/assets/images/Group 1000005807.svg"
                alt="Logo"
                width={311}
                height={285}
              />
              <Image
                className="coinImg"
                aria-hidden
                src="/assets/images/Frame.svg"
                alt="Logo"
                width={159}
                height={85}
              />
            </div>
          </>
          :
          <div className='statusImg'>
            <Image
              aria-hidden
              src={`/assets/images/bg${appStatus}.svg`}
              alt="status"
              width={428}
              height={440}
            />
          </div>
        }
      </div>

      {!isAccountVerified &&
        <div className='gene-detail-wrap'>
          <ServicesSection />
        </div>
      }
    </div>
  )
}

export default HeroDetailSection;