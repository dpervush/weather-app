import React from 'react';

import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar';

import { changeCity, changeTheme } from '../../actions';
import { connect } from 'react-redux';
import cn from './App.module.css';

function App(props) {
  React.useEffect(() => { props.changeCity('Москва') }, []);

  if (!props.isFirstInit) {
    return null;
  } else {
    return (
      <div className={`${cn.app} ${props.theme}-theme`} >
        <Sidebar changeTheme={props.changeTheme} />
        <Main />
      </div >
    );
  }
}

const mapStateToProps = state => ({
  isFirstInit: state.weather.isFirstInit,
  theme: state.settings.theme
});

export default connect(mapStateToProps, { changeCity, changeTheme })(App);
