import React from 'react';
import { connect } from 'react-redux';
import Preloader from '../common/Preloader/Preloader';
import CityList from './SearchHist/SearchHist';
import { changeCity } from '../../actions';
import cn from './SearchPanel.module.css';

const SearchPanel = (props) => {
  const [inputValue, setInputValue] = React.useState('Москва');

  const panelRef = React.useRef();

  const onInputChange = e => {
    setInputValue(e.target.value);
  };

  const onIconClose = () => {
    panelRef.current.classList.remove(cn.open);
    props.toggleSearchPanel(false);
  };

  const onSearchClick = e => {
    e.preventDefault();
    props.changeCity(inputValue);
  };

  return (
    <div className={`${cn.searchPanel} ${props.isPanelOpen && cn.open}`} ref={panelRef}>
      <div className={`${cn.closeIcon} closeIcon`} onClick={onIconClose}>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M26 2.61857L23.3814 0L13 10.3814L2.61857 0L0 2.61857L10.3814 13L0 23.3814L2.61857 26L13 15.6186L23.3814 26L26 23.3814L15.6186 13L26 2.61857Z"
            fill="#48484A" />
        </svg>
      </div>
      <div className={cn.searchInput}>
        <input value={inputValue} onChange={onInputChange}></input>
      </div>
      <button className={cn.searchBtn} onClick={onSearchClick}>Найти</button>
      {
        props.error && <div className={cn.error}>{props.error}</div>
      }
      {
        props.isFetching &&
        <div className={cn.searchPreloader}>
          <Preloader />
        </div>
      }
      <CityList lastCities={props.lastCities} changeCity={props.changeCity} />
    </div>
  );
}
const mapStateToProps = state => ({
  lastCities: state.cities.previousCities,
  error: state.cities.error,
  isFetching: state.weather.isFetching
});


export default connect(mapStateToProps, { changeCity })(SearchPanel);