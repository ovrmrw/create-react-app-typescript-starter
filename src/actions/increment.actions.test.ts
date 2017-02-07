import { container } from '../inversify.config'
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


jest.useFakeTimers()


describe('IncrementActions test', () => {
  let incrementActions: IncrementActions
  let ajaxActions: AjaxActions
  let store: ReactiveStore<AppState>


  beforeEach(() => {
    const testContainer = container.createChild()
    testContainer.bind(Testing).toConstantValue(true)
    testContainer.bind(ReactiveStoreForAppState).toConstantValue(new ReactiveStore(initialState, { testing: true }))

    incrementActions = testContainer.get(IncrementActions)
    ajaxActions = testContainer.get(AjaxActions)
    store = testContainer.get(ReactiveStoreForAppState)
  })


  it('increment', () => {
    let value: number | undefined
    store.getter()
      .subscribe(state => value = state.increment.counter)

    incrementActions.incrementCounter()
      .then(() => {
        expect(value).toBe(102)
      })
  })


  it('decrement', () => {
    let value: number | undefined
    store.getter()
      .subscribe(state => value = state.increment.counter)

    incrementActions.decrementCounter()
      .then(() => {
        expect(value).toBe(98)
      })
  })


  it('reset', () => {
    let value: number | undefined
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
