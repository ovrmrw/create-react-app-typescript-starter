import { injectable, inject } from 'inversify'
import { Observable } from 'rxjs/Observable'

import { ReactiveStore, KEY, AppState, IncrementState } from '../state'



@injectable()
export class IncrementActions {
  constructor(
    @inject(ReactiveStore)
    private store: ReactiveStore<AppState>
  ) { }


  incrementCounter(): Promise<void> {
    return this.store.setter(KEY.increment, Observable.of(incrementCallback).delay(500))
  }


  decrementCounter(): Promise<void> {
    return this.store.setter(KEY.increment, Observable.of(decrementCallback).delay(500))
  }


  resetCounter(): Promise<void> {
    return this.store.setter(KEY.increment, this.store.initialState.increment)
  }

}



function incrementCallback(state: IncrementState): IncrementState {
  return { counter: state.counter + 1 }
}


function decrementCallback(state: IncrementState): IncrementState {
  return { counter: state.counter - 1 }
}
