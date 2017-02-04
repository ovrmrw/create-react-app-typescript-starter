import 'reflect-metadata'
import 'rxjs'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'

import { routing } from './routing'


ReactDOM.render(
  routing,
  document.getElementById('root')
)
