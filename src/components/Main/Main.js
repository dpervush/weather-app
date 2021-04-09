import React from 'react';
import Details from '../Details/Details';
import Forecast from '../Forecast/Forecast';

import cn from './Main.module.css';

const Main = (props) => {
  return (
    <section className={cn.main}>
      <div className={cn.container}>
        <Forecast />
        <Details />
      </div>
    </section>
  );
}

export default Main;