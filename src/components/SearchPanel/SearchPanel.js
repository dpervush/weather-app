import React from 'react';
import { connect } from 'react-redux';
import Preloader from '../common/Preloader/Preloader';
import CityList from './SearchHist/SearchHist';
import { changeCity } from '../../actions';
import cn from './SearchPanel.module.css';
import SvgCloseIcon from '../svgs/SvgClose';

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
        <SvgCloseIcon />
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