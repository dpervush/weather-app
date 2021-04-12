import React from 'react';
import SvgWindIcon from '../../svgs/SvgWindIcon';
import cn from './DetailCard.module.css';

const WindIcon = (props) => {
  const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];
  const windDirection = directions[parseInt(props.deg / 45)];

  return (
    <div className={cn.windDirection}>
      <SvgWindIcon deg={props.deg} />
      <span className={cn.windDirection_text}>{windDirection}</span>
    </div>
  );
}

export default WindIcon;