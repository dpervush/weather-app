import React from 'react';
import cn from './DetailCard.module.css';

const HumidityScale = (props) => {
  return (
    <div className={cn.scale}>
      <div className={cn.scaleValues}>
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
      <div className={cn.scaleLine}>
        <div className={cn.scaleLine_bg}></div>
        <div className={cn.scaleLine_color} style={{ width: `${props.humidityValue}%` }}></div>
      </div >
      <div className={cn.scalePercent}>%</div>
    </div >
  );
}

export default HumidityScale;