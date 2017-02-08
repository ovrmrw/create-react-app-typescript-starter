import { testContainer } from '../inversify.config'
import { ReactiveStore, ReactiveStoreForAppState, AppState } from '../state'
import { IncrementActions } from './increment.actions'
import { AjaxActions, MockAjaxActions } from './ajax.actions'


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
  let store: ReactiveStoreForAppState


  beforeEach(() => {
    testContainer.snapshot()
    testContainer.bind(ReactiveStoreForAppState).toConstantValue(new ReactiveStore(initialState))
    testContainer.bind(IncrementActions).toSelf()
    testContainer.bind(AjaxActions).to(MockAjaxActions)

    store = testContainer.get(ReactiveStoreForAppState)
    incrementActions = testContainer.get(IncrementActions)
    ajaxActions = incrementActions.ajaxActions
  })


  afterEach(() => {
    testContainer.restore()
  })


  it('ajaxActions instanceof MockAjaxActions', () => {
    expect(ajaxActions instanceof MockAjaxActions).toBeTruthy()
  })


  it('increment', async () => {
    jest.useRealTimers()
    await incrementActions.incrementCounter()
    const state = await store.getterAsPromise()
    expect(state.increment).toEqual({ counter: 102 })
    expect(state.lastUpdated).toBe(1)
  })


  it('decrement', async () => {
    jest.useRealTimers()
    await incrementActions.decrementCounter()
    const state = await store.getterAsPromise()
    expect(state.increment).toEqual({ counter: 98 })
    expect(state.lastUpdated).toBe(1)
  })


  it('reset', async () => {
    jest.useRealTimers()
    await incrementActions.incrementCounter()
    await incrementActions.incrementCounter()
    await incrementActions.resetCounter()
    const state = await store.getterAsPromise()
    expect(state.increment).toEqual({ counter: 100 })
    expect(state.lastUpdated).toBe(1)
  })


  it('requestJpTimestamp$ is called.', async () => {
    jest.useRealTimers()
    ajaxActions.requestJpTimestamp$ = jest.fn().mockImplementation(() => Promise.resolve())
    await incrementActions.incrementCounter()
    expect(ajaxActions.requestJpTimestamp$).toBeCalled()
  })

})
