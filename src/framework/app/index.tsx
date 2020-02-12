import React from 'react';
import style from './style.module.css'
import { Header } from './header'
import { Menu } from './menu';
import { Body } from './body';

import { HashRouter } from 'react-router-dom'

export function App () {
  return (
    <HashRouter>
      <div className={style.app}>
        <Header />
        <div className={style.app_body}>
          <Menu />
          <Body />
        </div>
        <div className={style.footer}></div>
      </div>
    </HashRouter>
  );
}