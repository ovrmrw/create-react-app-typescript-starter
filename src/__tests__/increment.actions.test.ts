import { testContainer } from '../inversify.config'
import { ReactiveStore, ReactiveStoreForAppState, AppState } from '../state'
import { IncrementActions, AjaxJpTimestampAction, MockAjaxJpTimestampAction } from '../actions'


const initialState: AppState = {
  increment: {
    counter: 100,
  },
  lastUpdated: 0,
}


jest.useFakeTimers()


describe('IncrementActions test', () => {
  let incrementActions: IncrementActions
  let ajaxJpTimestampAction: AjaxJpTimestampAction
  let store: ReactiveStoreForAppState


  beforeEach(() => {
    testContainer.snapshot()
    testContainer.bind(ReactiveStoreForAppState).toConstantValue(new ReactiveStore(initialState))
    testContainer.bind(AjaxJpTimestampAction).to(MockAjaxJpTimestampAction)

    incrementActions = testContainer.get(IncrementActions)
    store = incrementActions.store
    ajaxJpTimestampAction = incrementActions.ajaxJpTimestampAction
  })


  afterEach(() => {
    testContainer.restore()
  })


  it('ajaxJpTimestampAction instanceof MockAjaxJpTimestampAction', () => {
    expect(ajaxJpTimestampAction instanceof MockAjaxJpTimestampAction).toBeTruthy()
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
    ajaxJpTimestampAction.requestJpTimestamp$ = jest.fn().mockImplementation(() => Promise.resolve())
    await incrementActions.incrementCounter()
    expect(ajaxJpTimestampAction.requestJpTimestamp$).toBeCalled()
  })

})
