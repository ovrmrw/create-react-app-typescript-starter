import { Container } from 'inversify'

import { IncrementActions } from './increment.actions'
import { AjaxActions } from './ajax.actions'
import { Testing } from '../symbols'
import { ReactiveStore, ReactiveStoreForAppState, AppState } from '../state'


const initialState: AppState = {
  increment: {
    counter: 100,
  },
  lastUpdated: 0,
}


jest.useFakeTimers()


describe('IncrementActions test', () => {
  let incrementActions: IncrementActions
  let ajaxActions: AjaxActions
  let store: ReactiveStore<AppState>


  beforeEach(() => {
    const container = new Container()
    container.bind(Testing).toConstantValue(true)
    container.bind(ReactiveStoreForAppState).toConstantValue(new ReactiveStore(initialState, { testing: true }))
    container.bind(IncrementActions).toSelf().inSingletonScope()
    container.bind(AjaxActions).toSelf().inSingletonScope()

    incrementActions = container.get(IncrementActions)
    ajaxActions = container.get(AjaxActions)
    store = container.get(ReactiveStoreForAppState)
  })


  it('increment', () => {
    let value: number
    store.getter()
      .subscribe(state => value = state.increment.counter)

    incrementActions.incrementCounter()
      .then(() => {
        expect(value).toBe(102)
      })
  })


  it('decrement', () => {
    let value: number
    store.getter()
      .subscribe(state => value = state.increment.counter)

    incrementActions.decrementCounter()
      .then(() => {
        expect(value).toBe(98)
      })
  })


  it('reset', () => {
    let value: number
    store.getter()
      .subscribe(state => value = state.increment.counter)

    incrementActions.incrementCounter()
      .then(() => incrementActions.incrementCounter())
      .then(() => incrementActions.resetCounter())
      .then(() => {
        expect(value).toBe(100)
      })
  })


  it('requestJpTimestamp$ is called.', () => {
    ajaxActions.requestJpTimestamp$ = jest.fn().mockImplementation(() => Promise.resolve())
    incrementActions.incrementCounter()
      .then(() => {
        expect(ajaxActions.requestJpTimestamp$).toBeCalled()
      })
  })

})
