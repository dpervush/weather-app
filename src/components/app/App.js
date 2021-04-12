import React from 'react';

import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar';

import { changeCity, changeTheme } from '../../actions';
import { connect } from 'react-redux';
import cn from './App.module.css';
import Preloader from '../common/Preloader/Preloader';

function App(props) {
  React.useEffect(() => { props.changeCity('Москва') }, []);

  return (
    <div className={`${cn.app} ${props.theme}-theme`} >
      {props.isFirstInit ?
        <Preloader />
        : <>
          <Sidebar changeTheme={props.changeTheme} />
          <Main />
        </>
      }
    </div >
  );
};

const mapStateToProps = state => ({
  isFirstInit: state.weather.isFirstInit,
  theme: state.settings.theme
});

export default connect(mapStateToProps, { changeCity, changeTheme })(App);
