import React from 'react';
import cn from './Preloader.module.css'

const Preloader = (props) => {
  return (
    <div className={cn.loader}>
      <div className={cn.ldsEllipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Preloader;