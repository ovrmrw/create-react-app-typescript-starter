import { rootContainer } from '../inversify.config'
import { ReactiveStore, ReactiveStoreForAppState, AppState } from '../state'
import { IncrementActions } from './increment.actions'
import { AjaxActions, MockAjaxActions } from './ajax.actions'


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
  let store: ReactiveStoreForAppState


  beforeEach(() => {
    const container = rootContainer.createChild()
    container.bind(ReactiveStoreForAppState).toConstantValue(new ReactiveStore(initialState, { testing: true }))
    container.bind(IncrementActions).toSelf()
    container.bind(AjaxActions).to(MockAjaxActions)

    store = container.get(ReactiveStoreForAppState)
    incrementActions = container.get(IncrementActions)
    ajaxActions = incrementActions.ajaxActions
  })


  it('ajaxActions instanceof MockAjaxActions', () => {
    expect(ajaxActions instanceof MockAjaxActions).toBeTruthy()
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
