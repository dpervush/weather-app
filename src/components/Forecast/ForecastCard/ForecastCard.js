import React from 'react';
import { getDay, getHour } from '../../../functions';
import Preloader from '../../common/Preloader/Preloader';
import cn from './ForecastCard.module.css';


const ForecastCard = ({ weather, dt, temp, ind, isFetching, mode }) => {
  return (
    <div className={cn.sliderItem}>
      {mode === "daily"
        ? <div className={cn.itemTitle}>{ind === 1 ? 'Завтра' : getDay(dt * 1000)}</div>
        : <div className={cn.itemTitle}>{getHour(dt)}:00</div>}
      <div className={cn.itemIcon}>
        <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt={`${weather[0].description}`} />
      </div>
      {mode === "hourly"
        ? <div className={cn.itemTemp}>{parseInt(temp)}°С</div>
        :
        <div className={cn.itemTemp}>
          <div className={cn.itemTemp_max}>{parseInt(temp.max)}<span>°C</span></div>
          <div className={cn.itemTemp_min}>{parseInt(temp.min)}°С</div>
        </div>}
      {isFetching && <Preloader />}
    </div>
  );
}

export default ForecastCard;