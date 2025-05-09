"use client";
import React from 'react';
import s from "./HeroDetailSection.module.scss";
import Image from 'next/image';
import ServicesSection from '../ServicesSection/ServicesSection';
import { HeroDetailSectionProps } from '@/interfaces/account';

const HeroDetailSection: React.FC<HeroDetailSectionProps> = ({ isAccountVerified, appStatus, applicationStep }) => {
  return (
    <div className={applicationStep === '1' ? `${s.hero_detail}` : `${s.hero_detail} ${s.hide}`}>
      <div className={s.hero_detail_upper}>
        <Image
          aria-hidden
          src="/assets/images/New Logo.svg"
          alt="Logo"
          className={s.iifl_logo}
          width={256}
          height={45}
        />

        {!isAccountVerified ?
          <>
            <h1 className={s.desk_heading}>Explore a New World of Investment Opportunities!</h1>
            <h1 className={s.mobile_heading}>Explore a New <br /> World of Investment <br /> Opportunities!</h1>
            <div className={s.hero_image}>
              <Image
                priority
                aria-hidden
                src="/assets/images/Group 1000005807.svg"
                alt="Logo"
                width={311}
                height={285}
              />
              <Image
                className={s.coin_img}
                aria-hidden
                src="/assets/images/Frame.svg"
                alt="Logo"
                width={159}
                height={85}
              />
            </div>
          </>
          :
          <div className={s.status_img}>
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
        <div className={s.gene_detail_wrap}>
          <ServicesSection />
        </div>
      }
    </div>
  )
}

export default HeroDetailSection;