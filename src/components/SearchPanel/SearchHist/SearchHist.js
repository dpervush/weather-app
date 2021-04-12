import React from 'react';
import cn from './SearchHist.module.css';

const CityList = ({ lastCities, changeCity }) => {
  const removeDuplicates = (arr, prop) => {
    let obj = {};
    return Object.keys(arr.reduce((prev, next) => {
      if (!obj[next[prop]]) obj[next[prop]] = next;
      return obj;
    }, obj)).map((i) => obj[i]);
  }

  const renderCities = () => {
    const uniqueCities = removeDuplicates(lastCities, 'name');
    return uniqueCities.map((city, ind) => (ind <= 4 && ind !== uniqueCities.length - 1)
      ? <li key={city.id} className={cn.lastCities_item} onClick={() => { changeCity(city.name); }}>{city.name}</li>
      : null);
  };

  return (
    <ul className={cn.lastCities}>
      {renderCities()}
    </ul>
  );
}

export default CityList;