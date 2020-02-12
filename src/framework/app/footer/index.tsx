import React from 'react'
import style from './style.module.css'
import { book } from '../../../book'

export function Footer() {
  return <div className={style.footer}>
    {book.name}<a href="https://github.com/bramblex/">@bramblex</a>
  </div>
}