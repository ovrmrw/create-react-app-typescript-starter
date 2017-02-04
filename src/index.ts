import 'reflect-metadata'
import 'rxjs'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'

import { routingElement } from './routing'


ReactDOM.render(
  routingElement,
  document.getElementById('root')
)
