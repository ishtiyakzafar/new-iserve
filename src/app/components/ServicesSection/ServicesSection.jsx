import s from "./ServicesSection.module.scss";
import Image from 'next/image';

const servicesData = [
  {
    id: 1,
    icon: '/assets/icons/reviews.svg',
    smallText: 'Get Recommendations on',
    paraText: 'WhatsApp / Email / Notification',
  },
  {
    id: 2,
    icon: '/assets/icons/business_center.svg',
    smallText: 'Portfolio',
    paraText: 'Restructuring',
  },
  {
    id: 3,
    icon: '/assets/icons/person_check.svg',
    smallText: 'Advice from',
    paraText: 'Expert Research Analysts',
  },
  {
    id: 4,
    icon: '/assets/icons/support_agent.svg',
    smallText: 'Dedicated',
    paraText: 'RM Support',
  },
]

const ServicesSection = () => {
  return (
    <div className={s.services}>
      {
        servicesData.map((item) => (
          <div key={item.id} className={s.gen_info}>
            <div className={s.icon_box}>
              <Image
                aria-hidden
                src={item.icon}
                alt="reviews"
                width={20}
                height={20}
              />
            </div>
            <small>{item.smallText}</small>
            <p>{item.paraText}</p>
          </div>
        ))
      }
    </div>
  )
};

export default ServicesSection;