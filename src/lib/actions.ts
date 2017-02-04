import { injectable, inject } from 'inversify'
import { Observable } from 'rxjs'

import { ReactiveStore, KEY, AppState } from '../state'
import { container } from '../inversify.config'



@injectable()
export class Actions {
  constructor(
    @inject(ReactiveStore)
    private store: ReactiveStore<AppState>
  ) { }


  incrementCounter(): Promise<void> {
    return this.store.setter(KEY.counter, Observable.of(incrementCallback).delay(500))
  }


  decrementCounter(): Promise<void> {
    return this.store.setter(KEY.counter, Observable.of(decrementCallback).delay(500))
  }


  resetCounter(): Promise<void> {
    return this.store.setter(KEY.counter, this.store.initialState.counter)
  }

}



function incrementCallback(state: number): number {
  return state + 1
}


function decrementCallback(state: number): number {
  return state - 1
}
