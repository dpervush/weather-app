import React from 'react';
import { connect } from 'react-redux';

import SvgSliderArror from '../svgs/SvgSliderArrow';
import ForecastCard from './ForecastCard/ForecastCard';

import classNames from 'classnames/bind';
import cn from './Forecast.module.css';

let cx = classNames.bind(cn);

const Forecast = (props) => {

  const [isDailyActive, setIsDailyActive] = React.useState(true);
  const [isHourlyActive, setIsHourlyActive] = React.useState(false);

  const [isPrevInctive, setIsPrevInactive] = React.useState(true);
  const [isNextInctive, setIsNextInactive] = React.useState(false);

  const [cntDaily, setCntDaily] = React.useState(0);
  const [cntHourly, setCntHourly] = React.useState(0);

  const containerRef = React.useRef();

  const onTabClick = e => {
    setIsDailyActive(!isDailyActive);
    setIsHourlyActive(!isHourlyActive);

    setIsPrevInactive(true);
    setIsNextInactive(false);

    setCntDaily(0);
    setCntHourly(0);
  };

  const renderDailyCards = () => {
    return props.daily.map((day, ind) => (ind === 0) ? null : <ForecastCard key={day.dt} weather={day.weather} dt={day.dt} temp={day.temp} ind={ind} isFetching={props.isFetching} mode="daily" />)
  };

  const renderHourlyCards = () => {
    const hourlyArray = [];

    for (let i = 0; i < 12; i++) {
      const day = props.hourly[i];
      hourlyArray.push(<ForecastCard key={day.dt} weather={day.weather} dt={day.dt} temp={day.temp} isFetching={props.isFetching} mode="hourly" />)
    }
    return hourlyArray;
  };

  const arrowInactiveCheck = (count, total) => {
    const cardsCount = Math.ceil(parseInt(window.getComputedStyle(containerRef.current).width) / 124);

    if (count === (total - cardsCount)) {
      setIsNextInactive(true);
    }
    if (count === 0) {
      setIsPrevInactive(true);
    }
  };

  React.useEffect(() => {
    arrowInactiveCheck(cntDaily, 7);
  }, [cntDaily]);

  React.useEffect(() => {
    arrowInactiveCheck(cntHourly, 12);
  }, [cntHourly]);

  const onPrevClickMove = (count, setCount) => {
    if (count > 0) {
      setCount(count - 1);
      setIsNextInactive(false);
    }
  };

  const onPrevClick = () => {
    if (isDailyActive) {
      onPrevClickMove(cntDaily, setCntDaily);
    } else {
      onPrevClickMove(cntHourly, setCntHourly);
    }
  };

  const onNextClickMove = (count, setCount, total, cardsCount) => {
    if (count < (total - cardsCount)) {
      setCount(count + 1);
      setIsPrevInactive(false);
    }
  };

  const onNextClick = () => {
    const cardsCount = Math.ceil(parseInt(window.getComputedStyle(containerRef.current).width) / 124);

    if (isDailyActive) {
      onNextClickMove(cntDaily, setCntDaily, 7, cardsCount);
    } else {
      onNextClickMove(cntHourly, setCntHourly, 12, cardsCount);
    };
  };

  return (
    <section className={cn.forecast}>
      <div className={cn.container} ref={containerRef}>
        <div className={cn.header}>
          <h3 className={cn.title}>Прогноз</h3>
          <div className={cn.tabs}>
            <div className={cx({ tab: true, active: isDailyActive })} onClick={onTabClick}>на неделю</div>
            <div className={cx({ tab: true, active: isHourlyActive })} onClick={onTabClick}>почасовой</div>
          </div>
        </div>
        <div className={cn.sliderWrapper}>
          <div className={cn.arrows}>
            <button className={cx({ arrowsPrev: true, inactive: isPrevInctive })} onClick={onPrevClick}>
              <SvgSliderArror />
            </button>
            <button className={cx({ arrowsNext: true, inactive: isNextInctive })} onClick={onNextClick}>
              <SvgSliderArror />
            </button>
          </div>
          <div className={cx({ sliderContent: true, active: isDailyActive })}>
            <div className={cn.sliderInner} style={{ marginLeft: `-${124 * cntDaily}px` }}>
              {renderDailyCards()}
            </div>
          </div>
          <div className={cx({ sliderContent: true, active: isHourlyActive })}>
            <div className={cn.sliderInner} style={{ marginLeft: `-${124 * cntHourly}px` }}>
              {renderHourlyCards()}
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}

const mapStateToProps = state => ({
  daily: state.weather.daily,
  hourly: state.weather.hourly,
  isFetching: state.weather.isFetching
});

export default connect(mapStateToProps)(Forecast);