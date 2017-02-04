import * as React from 'react'
import { UIRouter, UIView, UISref, UISrefActive, hashLocationPlugin } from 'ui-router-react'

import { App } from './App'


const helloState = {
  name: 'hello',
  url: '/hello',
  component: () => <h3>hello world</h3 >
}

const aboutState = {
  name: 'about',
  url: '/about',
  component: () => <h3>Its the UI- Router hello world app!</h3>
}

const appState = {
  name: 'app',
  url: '/app',
  component: App
}

const root = {
  name: 'root',
  url: '/',
  component: App,
}


export const routing = (
  <UIRouter plugins={[hashLocationPlugin]} states={[helloState, aboutState, appState, root]}>
    <div>
      <UISrefActive class="active">
        <UISref to="hello"><a> Hello </a></UISref>
      </UISrefActive>
      <UISrefActive class="active">
        <UISref to="about"><a> About </a></UISref>
      </UISrefActive>
      <UISrefActive class="active">
        <UISref to="app"><a> App </a></UISref>
      </UISrefActive>
      <UIView />
    </div>
  </UIRouter>
)
