"use client";
import "./page.scss";
import HeroDetailSection from "./components/HeroDetailSection/HeroDetailSection";
import CreateDematAccount from "./components/CreateDematAccount/CreateDematAccount";
import ServicesSection from "./components/ServicesSection/ServicesSection";
import Copyright from "./components/Copyright/Copyright";
import { useState } from "react";

export default function Home() {
  const [applicationStep, setApplicationStep] = useState('1');
  const [isAccountVerified, setIsAccountVerified] = useState(false);
  const [appStatus, setAppStatus] = useState('1');

  return (
    <>
      <div className="dashboard">
        <div className="container">
          <div className="hero">

            <HeroDetailSection
              isAccountVerified={isAccountVerified}
              appStatus={appStatus}
              applicationStep={applicationStep}
            />

            <CreateDematAccount
              applicationStep={applicationStep}
              setApplicationStep={setApplicationStep}
              isAccountVerified={isAccountVerified}
              setIsAccountVerified={setIsAccountVerified}
              appStatus={appStatus}
              setAppStatus={setAppStatus}
            />

            <div className={applicationStep === '1' ? 'our-services' : !isAccountVerified ? 'our-services hide' : 'our-services isVerified'}>
              <ServicesSection />
            </div>
          </div>
        </div>
      </div>

      <div className={applicationStep === '1' ? 'show-copyright' : 'hide-copyright'}>
        <Copyright />
      </div>
    </>
  );
}
