import React from 'react';
import style from './style.module.css'
import { Header } from './header'
import { Menu } from './menu';
import { Body } from './body';

import { HashRouter } from 'react-router-dom'
import { Footer } from './footer';

import { Helmet } from 'react-helmet'
import { book } from '../../book';

export function App () {
  return (
    <HashRouter>
      <div className={style.app}>
        <Helmet>
          <title>{book.name}</title>
          <link rel="icon" href={book.icon} />
          <link rel="apple-touch-icon" href={book.logo} />
        </Helmet>
        <Header />
        <div className={style.app_body}>
          <Menu />
          <Body />
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
}