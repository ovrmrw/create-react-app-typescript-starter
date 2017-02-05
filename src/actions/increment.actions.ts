import { injectable, inject } from 'inversify'
import { Observable } from 'rxjs/Observable'

import { ReactiveStore, KEY, AppState, IncrementState } from '../state'
import { AjaxActions } from './ajax.actions'



@injectable()
export class IncrementActions {
  constructor(
    @inject(ReactiveStore)
    private store: ReactiveStore<AppState>,
    private ajaxActions: AjaxActions,
  ) {
    this.ajaxActions.jpTimestamp$
      .subscribe(timestamp => this.store.setter(KEY.lastUpdated, timestamp))
  }


  incrementCounter(): Promise<void> {
    return this.store.setter(KEY.increment, (p) => ({ counter: p.counter + 1 }))
      .then(() => this.store.setter(KEY.increment, Observable.of(incrementCallback).delay(500)))
      .then(() => this.ajaxActions.requestJpTimestamp())
  }


  decrementCounter(): Promise<void> {
    return this.store.setter(KEY.increment, (p) => ({ counter: p.counter - 1 }))
      .then(() => this.store.setter(KEY.increment, Observable.of(decrementCallback).delay(500)))
      .then(() => this.ajaxActions.requestJpTimestamp())
  }


  resetCounter(): Promise<void> {
    return this.store.setter(KEY.increment, this.store.initialState.increment)
      .then(() => this.ajaxActions.requestJpTimestamp())
  }

}



function incrementCallback(state: IncrementState): IncrementState {
  return { counter: state.counter + 1 }
}


function decrementCallback(state: IncrementState): IncrementState {
  return { counter: state.counter - 1 }
}
