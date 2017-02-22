import * as logger from 'redux-logger'
import { ReactiveStore, getObjectKeys, getReactiveStoreAsSingleton, Middleware } from 'ovrmrw-reactive-store'
export { ReactiveStore }


export const initialState: AppState = {
  increment: {
    counter: 0,
  },
  lastUpdated: 0,
}


export const KEY = getObjectKeys(initialState)

export const storeInstance = getReactiveStoreAsSingleton(initialState, {
  // useFreeze: true,
  // output: true,
  reduxMiddlewares: [logger()] as Middleware[], // use redux-logger to output logs to Console instead of "output" option.
})

export class ReactiveStoreForAppState extends ReactiveStore<AppState> { }



export interface AppState {
  increment: IncrementState,
  lastUpdated: number,
}

export interface IncrementState {
  counter: number,
}
