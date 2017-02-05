import 'reflect-metadata'
import 'rxjs/Rx'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'

import { routerElement } from './routing'


ReactDOM.render(
  routerElement,
  document.getElementById('root')
)
