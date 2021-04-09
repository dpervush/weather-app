import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import cn from './DetailCard.module.css';

const DetailCard = ({ title, number, id, units, extraClass = '', children, isFetching }) => {
  return (
    <div className={`${cn.card} ${extraClass}`} >
      <div className={`${cn.title}`}>{title}</div>
      <div className={`${cn.value}`}>{number} <span>{units}</span></div>
      {children}
      {isFetching && <Preloader />}
    </div >
  );
}

export default DetailCard;