# DIY Onboarding Journey (NextJS Rewamp)  

# This is the new Rewamp version of the DIY OnBoarding journey Written in NextJS   
_A modern Rewamp of IIFL Capital's DIY onboarding portal with server-side rendering, optimized performance, and enhanced UX.

**A Registration Portal for IIFL Capital**  

**Next.js 14 + TypeScript**  

## 🌐 Environment URLs  

---

## 🌐 Environment URLs  
| Environment   | URL                                   | Branch    |  
|---------------|---------------------------------------|-----------|  
| **uat**       | https://beta-register.iiflcapital.com/ | `UAT`     |  
| **Production**| https://register.iiflcapital.com/      | `main`    |  

---

## 🗂 Repository Structure  

```bash
/fe-nextjs-onboarding-journey
├── k8s-yaml/                        # Kubernetes YAML manifests  
│   ├── deploy.yaml              # Deployment configuration  
│   ├── service.yaml                 # Service configuration  
│   ├── ingress.yaml                 # Ingress rules  
│   ├── configmap.yaml               # ConfigMap for environment variables  
│   └── svc-lb-pvt.yaml              # Service with Private LB configuration    
├── public/                          
│   ├── assets/                    
│   │   ├── fonts/                   # Font files  
│   │   ├── icons/                   # Icon files  
│   │   ├── images/                  # Image assets  
│   └── favicon.ico                  # Favicon for the app  
├── src/                      
│   ├── app/                         # Application logic and routes  
│   │   ├── dashboard/               # Post-auth routes  
│   │   │   ├── layout.tsx           # Auth-protected layout  
│   │   │   └── profile/page.tsx     # Profile management  
│   │   ├── api/                     # Route handlers (NextJS API)  
│   │   │   ├── route.ts             # POST endpoint  
│   │   │   └── user/[id]/route.ts   # Dynamic API route  
│   │   └── page.tsx                 # Main entry point  
│   ├── lib/                         # Utilities and helpers  
│   │   ├── auth.ts                  # NextAuth.js config  
│   │   └── api-client.ts            # Axios wrapper  
├── .env.local                       # Local secrets   
├── next.config.js                   # Next.js configuration  
├── package.json                     # Project dependencies  
└── tsconfig.json                    # TypeScript configuration  
```


🛠 Tech Stack
Framework: Next.js 14 (App Router)

Language: TypeScript 5.x

Styling: Tailwind CSS + ui

Auth: NextAuth.js (OAuth + JWT)

API: NextJS Route Handlers + tRPC (optional)

Testing: Jest + React Testing Library

CI/CD: Azure DevOps Pipelines

```bash
git clone https://dev.azure.com/IIFLSecurities/Broking/_git/fe-nextjs-onboarding-journey
cd fe-nextjs-onboarding-journey && npm install   && npm run dev 
```
