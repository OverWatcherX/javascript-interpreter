import React from 'react'
import style from './style.module.css'
import logo from '../logo.png'

import githubIcon from './icons/github.svg'
import zhihuIcon from './icons/zhihu.svg'

export function Header() {
  const icons = [
    ['github', githubIcon, 'https://github.com/OverWatcherX/javascript-interpreter'],
    ['zhihu', zhihuIcon, 'https://zhuanlan.zhihu.com/javascript-interpreter']
  ]
  return <div className={style.header}>
    <div className={style.title}>
      <img className={style.title_logo} alt="logo" src={logo} />
      <div className={style.title_text}>不懂编译原理也能造 JavaScript 解释器</div>
    </div>

    <div className={style.icon_list}>
      {icons.map(([type, icon, url]) => <img
        alt={type}
        key={type}
        className={style.icon}
        src={icon}
        onClick={() => window.open(url, '_blank')}
      />)}
    </div>
  </div>
}