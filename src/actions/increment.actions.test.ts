import { Container } from 'inversify'

import { ReactiveStore, ReactiveStoreForAppState, AppState } from '../state'
import { IncrementActions } from './increment.actions'
import { AjaxActions } from './ajax.actions'
import { Testing } from '../symbols'


const initialState: AppState = {
  increment: {
    counter: 100,
  },
  lastUpdated: 0,
}


// jest.useFakeTimers()


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


  it('increment', async () => {
    await incrementActions.incrementCounter()
    const state = await store.getterAsPromise()
    expect(state.increment).toEqual({ counter: 102 })
    expect(state.lastUpdated).toBe(1)
  })


  it('decrement', async () => {
    await incrementActions.decrementCounter()
    const state = await store.getterAsPromise()
    expect(state.increment).toEqual({ counter: 98 })
    expect(state.lastUpdated).toBe(1)
  })


  it('reset', async () => {
    await incrementActions.incrementCounter()
    await incrementActions.incrementCounter()
    await incrementActions.resetCounter()
    const state = await store.getterAsPromise()
    expect(state.increment).toEqual({ counter: 100 })
    expect(state.lastUpdated).toBe(1)
  })


  it('requestJpTimestamp$ is called.', async () => {
    ajaxActions.requestJpTimestamp$ = jest.fn().mockImplementation(() => Promise.resolve())
    await incrementActions.incrementCounter()
    expect(ajaxActions.requestJpTimestamp$).toBeCalled()
  })

})
