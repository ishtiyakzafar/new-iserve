"use client";
import s from "./page.module.scss";
import HeroDetailSection from "./components/HeroDetailSection/HeroDetailSection";
import CreateDematAccount from "./components/CreateDematAccount/CreateDematAccount";
import ServicesSection from "./components/ServicesSection/ServicesSection";
import Copyright from "./components/Copyright/Copyright";
import { Suspense, useState } from "react";


export default function Home() {
  const [applicationStep, setApplicationStep] = useState('1');
  const [isAccountVerified, setIsAccountVerified] = useState(false);
  const [appStatus, setAppStatus] = useState('1');

  return (
    <>
      <div className={s.dashboard}>
        <div className={s.container}>
          <div className={s.hero}>
            <HeroDetailSection
              isAccountVerified={isAccountVerified}
              appStatus={appStatus}
              applicationStep={applicationStep}
            />
            <Suspense>
              <CreateDematAccount
                applicationStep={applicationStep}
                setApplicationStep={setApplicationStep}
                isAccountVerified={isAccountVerified}
                setIsAccountVerified={setIsAccountVerified}
                appStatus={appStatus}
                setAppStatus={setAppStatus}
              />
            </Suspense>
            <div className={applicationStep === '1' ? s.our_services : !isAccountVerified ? `${s.our_services} ${s.hide}` : `${s.our_services} ${s.isVerified}`}>
              <ServicesSection />
            </div>
          </div>
        </div>
      </div>

      <div className={applicationStep === '1' ? s.show_copyright : s.hide_copyright}>
        <Copyright />
      </div>
    </>
  );
}
