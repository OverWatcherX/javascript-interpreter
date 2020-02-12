import React from 'react'
import style from './style.module.css'
import { NavLink } from 'react-router-dom'
import { routes, Route } from '../routes'


function MenuItem({ route }: { route: Route }) {

  return <div className={style.menu_group}>
    <NavLink
      exact
      activeClassName={style.active}
      className={style.menu_item}
      to={route.path}>{route.title}
    </NavLink>

    <div className={style.sub_menu}>
      {route.children.map(subRoute => <NavLink
        key={subRoute.path}
        exact
        activeClassName={style.active}
        className={style.menu_item}
        to={subRoute.path}>{subRoute.title}
      </NavLink>)}
    </div>
  </div>
}

export function Menu() {
  return <div className={style.menu}>
    {routes.map(route => <MenuItem key={route.path} route={route} />)}
  </div>
}