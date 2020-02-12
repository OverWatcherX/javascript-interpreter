import React from 'react'
import style from './style.module.css'
import { routes } from '../routes'
import { Switch, Route } from 'react-router-dom'

export function Body() {
  const flattenRoutes: [string, React.ComponentType][] = []

  for (const route of routes) {
    flattenRoutes.unshift([route.path, route.document])
    for (const subRoute of route.children) {
      flattenRoutes.unshift([subRoute.path, subRoute.document])
    }
  }

  return <div className={style.body}>
    <Switch>
      {flattenRoutes.map(([path, Document]) =>
        <Route key={path} path={path}><Document /></Route>
      )}
    </Switch>
  </div>
}