import React from 'react';
import { connect } from 'react-redux';
import DetailCard from './DetailCard/DetailCard';
import HumidityScale from './DetailCard/HumidityScale';
import WindIcon from './DetailCard/WindIcon';
import cn from './Details.module.css';

const Details = ({ current, isFetching }) => {
  return (
    <section className={cn.details}>
      <div className={cn.container}>
        <h3 className={cn.title}>Подробно на сегодня</h3>
        <div className={cn.detailsList}>
          <DetailCard title="Скорость ветра" id="windSpeedValue" number={parseInt(current.wind_speed)} units="м/с" isFetching={isFetching}>
            <WindIcon deg={current.wind_deg} />
          </DetailCard>
          <DetailCard title="Влажность" id="humidityValue" number={current.humidity} units="%" isFetching={isFetching}>
            <HumidityScale humidityValue={current.humidity} />
          </DetailCard>
          <DetailCard title="Видимость" id="visibilityValue" number={current.visibility / 1000} units="км" isFetching={isFetching} />
          <DetailCard title="Давление" id="pressureValue" number={parseInt(current.pressure / 133.3 * 100)} units="мм рт. ст." extraClass="detail__item_pressure" isFetching={isFetching} />
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = state => ({
  current: state.weather.current,
  isFetching: state.weather.isFetching
});

export default connect(mapStateToProps)(Details);