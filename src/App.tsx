import * as React from 'react'
const logo = require('./logo.svg')
import './App.css'

import { MyReactPureComponent } from './hoc'
import { lazyInject } from './inversify.config'
import { ReactiveStore, KEY, AppState } from './state'
import { Actions } from './lib/actions'



export class App extends MyReactPureComponent<{}, AppState> {
  @lazyInject(ReactiveStore)
  store: ReactiveStore<AppState>
  @lazyInject(Actions)
  actions: Actions


  constructor(props) {
    super(props)
    this.state = { ...this.store.initialState }
  }


  componentWillMount() {
    this.disposable = this.store.getter()
      .filterByUpdatedKey(KEY.counter)
      .subscribe(state => this.setState({ ...state }))
  }


  componentWillUnmount() {
    this.disposeSubscriptions()
  }


  increment(event): Promise<void> {
    return this.actions.incrementCounter()
  }


  decrement(event): Promise<void> {
    return this.actions.decrementCounter()
  }


  reset(event): Promise<void> {
    return this.actions.resetCounter()
  }


  render() {
    const s = this.state

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div>
          <button onClick={(e) => this.increment(e)}>Increment</button>
          <button onClick={(e) => this.decrement(e)}>Decrement</button>
          <button onClick={(e) => this.reset(e)}>Reset</button>
          <h1>{s.counter}</h1>
        </div>
        <a href="https://github.com/ovrmrw/create-react-app-typescript-starter">GitHub</a>
      </div>
    )
  }

}
