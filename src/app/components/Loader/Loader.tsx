import React from 'react';
import s from "./Loader.module.scss";
import Image from 'next/image';

const Loader = () => {
  return (
    <div className={s.loader}>
      <Image unoptimized aria-hidden src='/assets/images/loader.gif' alt="loader" width={50} height={50} />
    </div>
  )
};

export default Loader;