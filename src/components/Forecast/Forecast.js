import React from 'react';
import { connect } from 'react-redux';
import cn from './Forecast.module.css';
import ForecastCard from './ForecastCard/ForecastCard';

const Forecast = (props) => {
  const containerRef = React.useRef();

  const dailyRef = React.useRef();
  const hourlyRef = React.useRef();

  const dailyContentRef = React.useRef();
  const hourlyContentRef = React.useRef();

  const dailyInnerRef = React.useRef();
  const hourlyInnerRef = React.useRef();

  const prevRef = React.useRef();
  const nextRef = React.useRef();


  let cntDaily = 0;
  let cntHourly = 0;

  const onTabClick = e => {
    if (e.target.getAttribute('data-period') === 'daily') {
      dailyRef.current.classList.add(cn.active);
      hourlyRef.current.classList.remove(cn.active);
      dailyContentRef.current.classList.add(cn.active);
      hourlyContentRef.current.classList.remove(cn.active);
    } else {
      dailyRef.current.classList.remove(cn.active);
      hourlyRef.current.classList.add(cn.active);
      dailyContentRef.current.classList.remove(cn.active);
      hourlyContentRef.current.classList.add(cn.active);
    }
    nextRef.current.classList.remove(cn.inactive);
    prevRef.current.classList.add(cn.inactive);
    cntHourly = 0;
    cntDaily = 0;
    dailyInnerRef.current.style["margin-left"] = `0px`;
    hourlyInnerRef.current.style["margin-left"] = `0px`;
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

  const onPrevClick = () => {
    if (cntDaily > 0) {
      cntDaily--;
      dailyInnerRef.current.style["margin-left"] = `-${124 * cntDaily}px`;
      nextRef.current.classList.remove(cn.inactive);
      if (cntDaily === 0) {
        prevRef.current.classList.add(cn.inactive);
      }
    }

    if (cntHourly > 0) {
      cntHourly--;
      hourlyInnerRef.current.style["margin-left"] = `-${124 * cntHourly}px`;
      nextRef.current.classList.remove(cn.inactive);
      if (cntHourly === 0) {
        prevRef.current.classList.add(cn.inactive);
      }
    }
  };

  const onNextClick = () => {
    const cardsCount = Math.ceil(parseInt(window.getComputedStyle(containerRef.current).width) / 124);

    if (dailyContentRef.current.classList.contains(cn.active)) {
      if (cntDaily < (7 - cardsCount)) {
        cntDaily++;
        dailyInnerRef.current.style["margin-left"] = `-${124 * cntDaily}px`;
        prevRef.current.classList.remove(cn.inactive);
      } if (cntDaily === (7 - cardsCount)) {
        nextRef.current.classList.add(cn.inactive);
      }
    } else {
      if (cntHourly < (12 - cardsCount)) {
        cntHourly++;
        hourlyInnerRef.current.style["margin-left"] = `-${124 * cntHourly}px`;
        prevRef.current.classList.remove(cn.inactive);
        if (cntHourly === (12 - cardsCount)) {
          nextRef.current.classList.add(cn.inactive);
        }
      }
    };
  };

  return (
    <section className={cn.forecast}>
      <div className={cn.container} ref={containerRef}>
        <div className={cn.header}>
          <h3 className={cn.title}>Прогноз</h3>
          <div className={cn.tabs}>
            <div className={`${cn.tab} ${cn.active}`} onClick={onTabClick} ref={dailyRef} data-period="daily">на неделю</div>
            <div className={cn.tab} onClick={onTabClick} ref={hourlyRef} data-period="hourly">почасовой</div>
          </div>
        </div>
        <div className={cn.sliderWrapper}>
          <div className={cn.arrows}>
            <button className={`${cn.arrowsPrev} ${cn.inactive}`} onClick={onPrevClick} ref={prevRef}>
              <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.3"
                  d="M12 14.5L2.87351 8.85026C2.24198 8.45932 2.24198 7.54068 2.87351 7.14973L12 1.5" stroke="#ACACAC"
                  strokeWidth="3" />
              </svg>
            </button>
            <button className={cn.arrowsNext} onClick={onNextClick} ref={nextRef}>
              <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.3" d="M1 1.5L10.1265 7.14974C10.758 7.54068 10.758 8.45932 10.1265 8.85027L1 14.5"
                  stroke="#ACACAC" strokeWidth="3" />
              </svg>
            </button>
          </div >
          <div className={`${cn.sliderContent} ${cn.active}`} ref={dailyContentRef}>
            <div className={cn.sliderInner} ref={dailyInnerRef}>
              {renderDailyCards()}
            </div>
          </div >
          <div className={`${cn.sliderContent}`} ref={hourlyContentRef}>
            <div className={cn.sliderInner} ref={hourlyInnerRef}>
              {renderHourlyCards()}
            </div >
          </div >
        </div >
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