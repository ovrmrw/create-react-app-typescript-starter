import * as React from 'react'
const logo = require('./logo.svg')
import './App.css'

import { MyReactPureComponent } from './hoc'
import { lazyInject } from './inversify.config'
import { ReactiveStore, ReactiveStoreForAppState, KEY, AppState } from './state'
import { Actions } from './actions'



export class App extends MyReactPureComponent<{}, AppState> {
  @lazyInject(ReactiveStoreForAppState) store: ReactiveStore<AppState>
  @lazyInject(Actions) actions: Actions


  constructor(props) {
    super(props)
    this.state = { ...this.store.currentState }
  }


  componentWillMount() {
    this.disposable = this.store.getter()
      .filterByUpdatedKey(KEY.increment, KEY.lastUpdated)
      .subscribe(state => this.setState({ ...state }))
  }


  componentWillUnmount() {
    this.disposeSubscriptions()
  }


  increment(event): Promise<void> {
    return this.actions.increment.incrementCounter()
  }


  decrement(event): Promise<void> {
    return this.actions.increment.decrementCounter()
  }


  reset(event): Promise<void> {
    return this.actions.increment.resetCounter()
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
          <button className="increment" onClick={(e) => this.increment(e)}>Increment</button>
          <button className="decrement" onClick={(e) => this.decrement(e)}>Decrement</button>
          <button className="reset" onClick={(e) => this.reset(e)}>Reset</button>
          <h1>counter: {s.increment.counter}</h1>
          <h3>lastUpdated: {s.lastUpdated}</h3>
        </div>
        <a href="https://github.com/ovrmrw/create-react-app-typescript-starter">GitHub</a>
      </div>
    )
  }

}
