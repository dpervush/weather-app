import React from 'react';
import { connect } from 'react-redux';
import SearchPanel from '../SearchPanel/SearchPanel';
import { toggleSearchPanel } from '../../actions';
import { getDay } from '../../functions';
import cn from './Sidebar.module.css';

const Sidebar = ({ current, currentCity, changeTheme, toggleSearchPanel, isPanelOpen }) => {
  const onChangeTheme = () => {
    changeTheme();
  };

  const onOpenPanel = e => {
    e.preventDefault();
    toggleSearchPanel(true);
  };

  return (
    <section className={cn.sidebar}>
      <SearchPanel toggleSearchPanel={toggleSearchPanel} isPanelOpen={isPanelOpen} />

      <div className={cn.bg}></div>
      <div className={cn.wrapper}>
        <div className={cn.inner}>
          <div className={cn.btnsWrapper}>
            <button className={cn.searchBtn} onClick={onOpenPanel}>
              Поиск города
            </button>
            <div className={cn.switch} onClick={onChangeTheme}>
              <input type="checkbox" />
              <span className={`${cn.slider} slider`}></span>
            </div>
          </div>

          <div className={cn.icon}>
            <img src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`} alt={`${current.weather[0].description}`} />
          </div>
          <div className={cn.temp}>{Math.floor(current.temp)}<span>°C</span></div>
          <div className={cn.description}>{current.weather[0].description}</div>
          <div className={`${cn.feel} ${cn.text}`}>Ощущается как {Math.floor(current.feels_like)}°С</div>
          <div className={cn.row}>
            <div className={cn.text}> Сегодня</div>
            <div className={`${cn.rowDate} ${cn.text}`}>{getDay()}</div>
          </div>
          <div className={`${cn.location} ${cn.text}`}>{currentCity}</div>
        </div>
      </div>
    </section >
  );
};

const mapStateToProps = state => ({
  current: state.weather.current,
  currentCity: state.cities.currentCity.namedetails['name:ru'] || state.cities.currentCity.namedetails.name,
  isPanelOpen: state.settings.isSearchPanelOpen
});

export default connect(mapStateToProps, { toggleSearchPanel })(Sidebar);